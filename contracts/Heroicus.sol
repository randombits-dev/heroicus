// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC4907.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Heroicus is IERC4907, ERC721URIStorage, ERC721Enumerable, Ownable {
  using SafeMath for uint256;

  struct TemplateInfo {
    bytes32 serverId;
    uint256 pricePerHour;
  }

  struct UserInfo {
    address user;
    uint64 expires;
    bytes32 templateId;
    uint8 region;
    uint256 payment;
  }

  struct Resource {
    uint32 g;
    uint32 t;
  }

  uint256 private nftId = 1;
  address private paymentCoin;
  address private devAddress;

  uint256 public minRentalTime = 1800; // 30 min
  uint256 public maxRentalTime = 2592000; // 30 days

  mapping(uint8 => Resource) public limits;
  mapping(uint8 => Resource) public usage;
  mapping(bytes32 => uint8) public serverConfigs;
  mapping(uint256 => UserInfo) private _userInfo;
  mapping(bytes32 => TemplateInfo) public templateInfo;

  event Rent(uint256 tokenId);

  constructor(address _paymentCoin) ERC721("Heroicus", "Heroicus") {
    paymentCoin = _paymentCoin;
    devAddress = msg.sender;
  }

  function userInfo(uint256 tokenId) external view returns (UserInfo memory, bool) {
    return (_userInfo[tokenId], userOf(tokenId) == address(0));
  }

  function setTemplate(bytes32 id, bytes32 serverId, uint256 pricePerHour) external onlyOwner {
    require(serverConfigs[serverId] > 0, "server not found");
    templateInfo[id] = TemplateInfo(serverId, pricePerHour);
  }

  function setServer(bytes32 id, uint8 cpus) external onlyOwner {
    require(id[0] == "g" || id[0] == "t", "GPU: Only g or t servers are allowed");
    serverConfigs[id] = cpus;
  }

  function removeTemplate(bytes32 id) external onlyOwner {
    delete templateInfo[id];
  }

  function setLimits(uint8 region, uint32 t, uint32 g) external onlyOwner {
    limits[region] = Resource(g, t);
  }

  function setMinRentalTime(uint256 time) external onlyOwner {
    minRentalTime = time;
  }

  function setMaxRentalTime(uint256 time) external onlyOwner {
    maxRentalTime = time;
  }

  function rent(string memory metadata, bytes32 templateId, uint8 region, uint256 amount) external {
    cleanUpOldRentals();
    TemplateInfo memory template = templateInfo[templateId];
    require(template.pricePerHour > 0, "template not found");
    _adjustCPULimit(template.serverId, region);
    uint256 timeRequested = amount.div(template.pricePerHour.div(3600));
    require(timeRequested >= minRentalTime, "minimum rental time not met");
    require(timeRequested <= maxRentalTime, "max rental time");
    IERC20 tk = IERC20(paymentCoin);
    tk.transferFrom(msg.sender, address(this), amount);
    _mint(msg.sender, nftId);
    _setTokenURI(nftId, metadata);
    emit Rent(nftId);
    UserInfo storage info = _userInfo[nftId];
    info.user = msg.sender;
    info.expires = uint64(block.timestamp + timeRequested);
    info.templateId = templateId;
    info.region = region;
    info.payment = amount;
    nftId++;
  }


  function extendRental(uint256 tokenId, uint256 amount) external {
    require(userOf(tokenId) == msg.sender, "caller is not owner");
    UserInfo storage user = _userInfo[tokenId];
    TemplateInfo memory template = templateInfo[user.templateId];
    uint256 timeRequested = amount.div(template.pricePerHour.div(3600));
    require(user.expires + timeRequested < block.timestamp + maxRentalTime, "max rental time");

    IERC20 tk = IERC20(paymentCoin);
    tk.transferFrom(msg.sender, address(this), amount);
    user.expires = uint64(user.expires + timeRequested);
    user.payment += amount;
  }

  function stopRental(uint256 tokenId) external {
    require(userOf(tokenId) == msg.sender, "caller is not owner");
    UserInfo storage user = _userInfo[tokenId];
    TemplateInfo memory template = templateInfo[user.templateId];
    uint256 secondsLeft = uint256(user.expires - block.timestamp).sub(60);
    if (secondsLeft > 0) {
      uint256 creditsToGive = secondsLeft.mul(template.pricePerHour).div(3600);
      IERC20 tk = IERC20(paymentCoin);
      tk.transfer(msg.sender, creditsToGive);
      user.payment -= creditsToGive;
    }
    _burn(tokenId);
  }

  function provideRefund(uint256 tokenId) external onlyOwner {
    UserInfo storage user = _userInfo[tokenId];
    IERC20 tk = IERC20(paymentCoin);
    tk.transfer(user.user, user.payment);
    user.payment = 0;
    _burn(tokenId);
  }

  function setUser(uint256, address, uint64) external pure override {
    revert("cannot change user");
  }

  function userOf(uint256 tokenId) public view virtual returns (address){
    if (uint256(_userInfo[tokenId].expires) >= block.timestamp) {
      return _userInfo[tokenId].user;
    }
    else {
      return address(0);
    }
  }

  function userExpires(uint256 tokenId) public view virtual returns (uint256){
    return _userInfo[tokenId].expires;
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721Enumerable, ERC721URIStorage) returns (bool) {
    return interfaceId == type(IERC4907).interfaceId || ERC721Enumerable.supportsInterface(interfaceId) || ERC721URIStorage.supportsInterface(interfaceId);
  }

  function cleanUpOldRentals() public {
    for (uint256 i = totalSupply(); i > 0; i--) {
      uint256 tokenId = tokenByIndex(i - 1);
      if (uint256(_userInfo[tokenId].expires) < block.timestamp) {
        _burn(tokenId);
      }
    }
  }

  function _adjustCPULimit(bytes32 serverId, uint8 region) private {
    Resource memory l = limits[region];
    Resource storage u = usage[region];
    if (serverId[0] == 'g') {
      require(serverConfigs[serverId] <= l.g - u.g, "No resources available for CPU servers");
      u.g += serverConfigs[serverId];
    } else {
      require(serverConfigs[serverId] <= l.t - u.t, "No resources available for CPU servers");
      u.t += serverConfigs[serverId];
    }
  }

  function _resetCPULimit(bytes32 serverId, uint8 region) private {
    Resource storage u = usage[region];
    if (serverId[0] == 'g') {
      u.g -= serverConfigs[serverId];
    } else {
      u.t -= serverConfigs[serverId];
    }
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal virtual override(ERC721Enumerable, ERC721) {
    ERC721Enumerable._beforeTokenTransfer(from, to, tokenId, batchSize);

    if (from == address(0)) {
      // nothing on create
    } else if (to == address(0)) {
      UserInfo memory user = _userInfo[tokenId];
      TemplateInfo memory template = templateInfo[user.templateId];
      _resetCPULimit(template.serverId, user.region);
      IERC20 tk = IERC20(paymentCoin);
      tk.transfer(devAddress, user.payment);
      delete _userInfo[tokenId];
    } else {
      UserInfo storage user = _userInfo[tokenId];
      user.user = to;
    }
  }

  function renounceOwnership() public view override onlyOwner {
    revert("renounceOwnership not allowed");
  }

  function changeDevAddress(address _devAddress) external onlyOwner {
    devAddress = _devAddress;
  }

  function _burn(uint256 tokenId) internal virtual override(ERC721URIStorage, ERC721) {
    ERC721URIStorage._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view virtual override(ERC721URIStorage, ERC721) returns (string memory) {
    return ERC721URIStorage.tokenURI(tokenId);
  }
}
