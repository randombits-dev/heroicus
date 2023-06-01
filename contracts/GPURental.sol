pragma solidity ^0.8.0;

import "./IERC4907.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "hardhat/console.sol";


contract GPURental is IERC4907, ERC721Enumerable, Ownable {
  using SafeMath for uint256;

  uint256 private nftId = 1;

  // USDC
  address private paymentCoin;

  // address that receives the payments
  address private devAddress;
  uint256 public minRentalTime = 1800; // seconds
  uint256 public maxRentalTime = 2592000; // seconds
  uint256 public pricePerGBPerMonth = 1 * 10 ^ 18;
  //  uint8 public maxRentalCount;

  struct ServerInfo {
    uint256 pricePerHour;
    uint8 cpus;
  }

  mapping(uint8 => uint32) private _gLimits; // us-west-1 => 4
  mapping(uint8 => uint32) private _tLimits; // us-west-1 => 4
  mapping(uint8 => uint32) private _gUsage;
  mapping(uint8 => uint32) private _tUsage;
  mapping(bytes32 => ServerInfo) public serverConfigs;


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
  }

  //  mapping(bytes32 => uint256) public templatePrices;
  //  mapping(address => uint256) public credits;
  mapping(uint256 => UserInfo) private _userInfo;
  //  mapping(address => uint256[]) public listOfRentals;

  mapping(bytes32 => TemplateInfo) public templateInfo;
  //  bytes32[] public templateList;

  event SetTemplate(bytes32 id, uint256 pricePerHour, uint8 cpus);
  event Rent(uint256 tokenId);

  constructor(address _paymentCoin, address _devAddress) ERC721("GPU Rental", "GPU") {
    paymentCoin = _paymentCoin;
    devAddress = _devAddress;
  }

  function userInfo(uint256 tokenId) public view returns (UserInfo memory, bool) {
    return (_userInfo[tokenId], userOf(tokenId) == address(0));
  }

  function setTemplate(bytes32 id, bytes32 serverId, uint256 pricePerHour) public onlyOwner {
    ServerInfo memory server = serverConfigs[serverId];
    require(server.pricePerHour > 0, "server not found");
    TemplateInfo memory info = TemplateInfo(serverId, pricePerHour);
    templateInfo[id] = info;
    //    emit SetTemplate(id, pricePerHour, serverType);
  }

  function setServer(bytes32 id, uint256 pricePerHour, uint8 cpus) public onlyOwner {
    ServerInfo memory info = ServerInfo(pricePerHour, cpus);
    serverConfigs[id] = info;
    //    emit SetTemplate(id, pricePerHour, serverType, cpus);
  }

  function removeServer(bytes32 id) public onlyOwner {
    delete serverConfigs[id];
  }

  function setGLimit(uint8 region, uint32 cpuLimit) public onlyOwner {
    _gLimits[region] = cpuLimit;
  }

  function setTLimit(uint8 region, uint32 cpuLimit) public onlyOwner {
    _tLimits[region] = cpuLimit;
  }

  function setDiskPrice(uint256 _pricePerGBPerMonth) public onlyOwner {
    pricePerGBPerMonth = _pricePerGBPerMonth;
  }

  function rent(bytes32 templateId, uint8 region, uint256 amount) public {
    _cleanUpOldRentals();
    TemplateInfo memory template = templateInfo[templateId];
    ServerInfo memory server = serverConfigs[template.serverId];
    require(server.pricePerHour > 0, "template not found");
    _adjustCPULimit(template.serverId, region);
    uint256 timeRequested = amount.div(template.pricePerHour.div(3600));
    require(timeRequested >= minRentalTime, "minimum rental time not met");
    IERC20 tk = IERC20(paymentCoin);
    tk.transferFrom(msg.sender, address(this), amount);
    _mint(msg.sender, nftId);
    emit Rent(nftId);
    UserInfo storage info = _userInfo[nftId];
    info.user = msg.sender;
    info.expires = uint64(block.timestamp + timeRequested);
    info.templateId = templateId;
    info.region = region;
    nftId++;
  }

  function rentCustom(bytes32 serverId, uint8 region, uint32 diskSize, uint256 amount) public {
    _cleanUpOldRentals();
    ServerInfo memory server = serverConfigs[serverId];
    require(server.pricePerHour > 0, "template not found");
    _adjustCPULimit(serverId, region);
    uint256 timeRequested = amount.div(server.pricePerHour.div(3600) + diskSize * pricePerGBPerMonth.div(2592000));
    require(timeRequested >= minRentalTime, "minimum rental time not met");
    require(timeRequested <= maxRentalTime, "max rental time");
    IERC20 tk = IERC20(paymentCoin);
    tk.transferFrom(msg.sender, address(this), amount);
    _mint(msg.sender, nftId);
    emit Rent(nftId);
    UserInfo storage info = _userInfo[nftId];
    info.user = msg.sender;
    info.expires = uint64(block.timestamp + timeRequested);
    info.region = region;
    info.diskSize = diskSize;
    nftId++;
  }


  function extendRental(uint256 tokenId, uint256 amount) public {
    require(userOf(tokenId) == msg.sender, "caller is not owner");
    UserInfo storage user = _userInfo[tokenId];
    TemplateInfo memory template = templateInfo[user.templateId];
    //    ServerInfo memory server = _serverConfigs[template.serverId];
    uint256 timeRequested = amount.div(template.pricePerHour.mul(3600));
    require(user.expires + timeRequested < block.timestamp + maxRentalTime, "cannot rent longer than 30 days");

    IERC20 tk = IERC20(paymentCoin);
    tk.transferFrom(msg.sender, address(this), amount);
    user.expires = uint64(user.expires + timeRequested);
  }

  function stopRental(uint256 tokenId) public {
    require(userOf(tokenId) == msg.sender, "caller is not owner");
    UserInfo storage user = _userInfo[tokenId];
    TemplateInfo memory template = templateInfo[user.templateId];
    //    ServerInfo memory server = _serverConfigs[template.serverId];
    uint256 secondsLeft = uint256(user.expires - block.timestamp).sub(60);
    if (secondsLeft > 0) {
      uint256 creditsToGive = secondsLeft.div(3600).mul(template.pricePerHour);
      IERC20 tk = IERC20(paymentCoin);
      tk.transfer(msg.sender, creditsToGive);
    }
    _burn(tokenId);
  }

  function setGPUUser(uint256 tokenId, address user, uint64 expires, bytes32 templateId) internal {
    UserInfo storage info = _userInfo[tokenId];
    info.user = user;
    info.expires = expires;
    info.templateId = templateId;
  }

  function setUser(uint256 tokenId, address user, uint64 expires) external {
    require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
    UserInfo storage info = _userInfo[tokenId];
    info.user = user;
    info.expires = expires;
    emit UpdateUser(tokenId, user, expires);
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

  function _cleanUpOldRentals() private {
    uint256 len = totalSupply();
    for (uint256 i; i < len; i++) {
      uint256 tokenId = tokenByIndex(i);
      if (uint256(_userInfo[tokenId].expires) >= block.timestamp) {
        _burn(tokenId);
      }
    }
  }

  function _adjustCPULimit(bytes32 serverId, uint8 region) private {
    ServerInfo memory server = serverConfigs[serverId];
    if (serverId[0] == 'g') {
      uint32 limit = _gLimits[region];
      uint32 usage = _gUsage[region];
      require(server.cpus <= limit - usage, "No resources available for GPU servers");
      _gUsage[region] += server.cpus;
    } else {
      uint32 limit = _tLimits[region];
      uint32 usage = _tUsage[region];
      console.log("cpu limit");
      console.log(limit);
      require(server.cpus <= limit - usage, "No resources available for CPU servers");
      _tUsage[region] += server.cpus;
    }
  }

  function _resetCPULimit(bytes32 serverId, uint8 region) private {
    ServerInfo memory server = serverConfigs[serverId];
    if (serverId[0] == 'g') {
      _gUsage[region] -= server.cpus;
    } else {
      _tUsage[region] -= server.cpus;
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
      // nothing
    } else if (to == address(0)) {
      UserInfo memory user = _userInfo[tokenId];
      TemplateInfo memory template = templateInfo[user.templateId];
      _resetCPULimit(template.serverId, user.region);
      delete _userInfo[tokenId];
    }
  }
}
