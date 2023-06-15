pragma solidity ^0.8.0;

import "./IERC4907.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol"; // TODO: Remove


contract Heroicus is IERC4907, ERC721Enumerable, Ownable {
  using SafeMath for uint256;

  struct ServerInfo {
    uint256 pricePerHour;
    uint8 cpus;
  }

  struct TemplateInfo {
    bytes32 serverId;
    uint256 pricePerHour;
  }

  struct UserInfo
  {
    address user;
    uint64 expires;
    bytes32 templateId;
    bytes32 serverId;
    uint8 region;
    uint32 diskSize;
    uint256 payment;
  }

  uint256 private nftId = 1;
  address private paymentCoin;

  address private devAddress;
  uint256 public minRentalTime = 1800; // 30 min
  uint256 public maxRentalTime = 2592000; // 30 days

  mapping(uint8 => uint32) public gLimits; // us-west-1 => 4
  mapping(uint8 => uint32) public tLimits; // us-west-1 => 4
  mapping(uint8 => uint32) public gUsage;
  mapping(uint8 => uint32) public tUsage;
  mapping(bytes32 => ServerInfo) public serverConfigs;
  mapping(uint256 => UserInfo) private _userInfo;
  mapping(bytes32 => TemplateInfo) public templateInfo;

  event Rent(uint256 tokenId);

  constructor(address _paymentCoin, address _devAddress) ERC721("GPU Rental", "GPU") {
    paymentCoin = _paymentCoin;
    devAddress = _devAddress;
  }

  function userInfo(uint256 tokenId) external view returns (UserInfo memory, bool) {
    return (_userInfo[tokenId], userOf(tokenId) == address(0));
  }

  function setTemplate(bytes32 id, bytes32 serverId, uint256 pricePerHour) external onlyOwner {
    ServerInfo memory server = serverConfigs[serverId];
    require(server.pricePerHour > 0, "server not found");
    TemplateInfo memory info = TemplateInfo(serverId, pricePerHour);
    templateInfo[id] = info;
  }

  function setServer(bytes32 id, uint256 pricePerHour, uint8 cpus) external onlyOwner {
    require(id[0] == "g" || id[0] == "t", "GPU: Only g or t servers are allowed");
    ServerInfo memory info = ServerInfo(pricePerHour, cpus);
    serverConfigs[id] = info;
  }

  function removeServer(bytes32 id) external onlyOwner {
    delete serverConfigs[id];
  }

  function setGLimit(uint8 region, uint32 cpuLimit) external onlyOwner {
    gLimits[region] = cpuLimit;
  }

  function setTLimit(uint8 region, uint32 cpuLimit) external onlyOwner {
    tLimits[region] = cpuLimit;
  }

  function setMinRentalTime(uint256 time) external onlyOwner {
    minRentalTime = time;
  }

  function setMaxRentalTime(uint256 time) external onlyOwner {
    maxRentalTime = time;
  }

  function rent(bytes32 templateId, uint8 region, uint256 amount) external {
    cleanUpOldRentals();
    TemplateInfo memory template = templateInfo[templateId];
    ServerInfo memory server = serverConfigs[template.serverId];
    require(server.pricePerHour > 0, "template not found");
    _adjustCPULimit(template.serverId, region);
    uint256 timeRequested = amount.div(template.pricePerHour.div(3600));
    require(timeRequested >= minRentalTime, "minimum rental time not met");
    require(timeRequested <= maxRentalTime, "max rental time");
    IERC20 tk = IERC20(paymentCoin);
    tk.transferFrom(msg.sender, address(this), amount);
    _mint(msg.sender, nftId);
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

  function setUser(uint256 tokenId, address user, uint64 expires) external {
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

  function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
    return interfaceId == type(IERC4907).interfaceId || super.supportsInterface(interfaceId);
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
    ServerInfo memory server = serverConfigs[serverId];
    if (serverId[0] == 'g') {
      uint32 limit = gLimits[region];
      uint32 usage = gUsage[region];
      if (server.cpus > limit - usage) {
        revert("No resources available for CPU servers");
      }
      //      require(server.cpus <= limit - usage, "No resources available for GPU servers");
      gUsage[region] = usage + server.cpus;
    } else {
      uint32 limit = tLimits[region];
      uint32 usage = tUsage[region];
      if (server.cpus > limit - usage) {
        revert("No resources available for CPU servers");
      }
      //      require(server.cpus <= limit - usage, "No resources available for CPU servers");
      tUsage[region] = usage + server.cpus;
    }
  }

  function _resetCPULimit(bytes32 serverId, uint8 region) private {
    ServerInfo memory server = serverConfigs[serverId];
    if (serverId[0] == 'g') {
      gUsage[region] -= server.cpus;
    } else {
      tUsage[region] -= server.cpus;
    }
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId,
    uint256 batchSize
  ) internal virtual override {
    super._beforeTokenTransfer(from, to, tokenId, batchSize);

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
}
