pragma solidity ^0.8.0;

import "./IERC4907.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";


contract GPURental is IERC4907, ERC721, Ownable {
    using SafeMath for uint256;

    uint256 private nftId = 1;

    // USDC
    address private paymentCoin;

    // address that receives the payments
    address private devAddress;
    uint256 public minRentalTime = 1800; // seconds

    struct TemplateInfo {
        bytes32 id;
        uint256 pricePerHour;
        uint8 maxCount;
    }

    struct UserInfo
    {
        address user;   // address of user role
        uint64 expires; // unix timestamp, user expires
        bytes32 templateId;
    }

    mapping(address => uint256) public credits;
    mapping(uint256 => UserInfo) public userInfo;

    mapping(bytes32 => TemplateInfo) public templateInfo;

    event SetTemplatePrice(bytes32 id, uint256 pricePerHour);

    constructor(address _paymentCoin, address _devAddress) ERC721("GPU Rental", "GPU") {
        paymentCoin = _paymentCoin;
        devAddress = _devAddress;
    }

    function setTemplate(bytes32 id, uint256 pricePerHour, uint8 maxCount) public onlyOwner {
        TemplateInfo storage info = templateInfo[id];
        info.id = id;
        info.pricePerHour = pricePerHour;
        info.maxCount = maxCount;
        emit SetTemplatePrice(id, pricePerHour);
    }

    function rent(bytes32 templateId, uint256 amount, uint256 creditsToUse) public {
        TemplateInfo memory template = templateInfo[templateId];
        require(template.maxCount > 0, "not available to rent");
        uint256 timeRequested = amount.div(template.pricePerHour.div(3600));
        require(timeRequested > minRentalTime, "minimum rental time not met");
        IERC20 tk = IERC20(paymentCoin);
        tk.transferFrom(msg.sender, devAddress, amount.sub(creditsToUse));
        _mint(msg.sender, nftId);
        UserInfo storage info = userInfo[nftId];
        info.user = msg.sender;
        info.expires = uint64(block.timestamp + timeRequested);
        info.templateId = templateId;
        nftId++;
    }

    function verifyRental(uint256 tokenId) public view {

    }

    function extendRental(uint256 tokenId, uint256 amount) public {
        require(userOf(tokenId) == msg.sender, "caller is not owner");
        UserInfo storage user = userInfo[tokenId];
        TemplateInfo memory template = templateInfo[user.templateId];
        uint256 timeRequested = amount.div(template.pricePerHour.mul(3600));
        IERC20 tk = IERC20(paymentCoin);
        tk.transferFrom(msg.sender, devAddress, amount);
        user.expires = uint64(user.expires + timeRequested);
    }

    function pauseRental(uint256 tokenId) public {
        require(userOf(tokenId) == msg.sender, "caller is not owner");
        UserInfo storage user = userInfo[tokenId];
        uint256 creditsToGive = user.expires - block.timestamp;
        credits[user.user] = credits[user.user].add(creditsToGive);
        _burn(tokenId);
        delete userInfo[tokenId];
    }


    function setGPUUser(uint256 tokenId, address user, uint64 expires, bytes32 templateId) internal {
        UserInfo storage info = userInfo[tokenId];
        info.user = user;
        info.expires = expires;
        info.templateId = templateId;
    }

    function setUser(uint256 tokenId, address user, uint64 expires) external {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        UserInfo storage info = userInfo[tokenId];
        info.user = user;
        info.expires = expires;
        emit UpdateUser(tokenId, user, expires);
    }

    /// @notice Get the user address of an NFT
    /// @dev The zero address indicates that there is no user or the user is expired
    /// @param tokenId The NFT to get the user address for
    /// @return The user address for this NFT
    function userOf(uint256 tokenId) public view virtual returns (address){
        if (uint256(userInfo[tokenId].expires) >= block.timestamp) {
            return userInfo[tokenId].user;
        }
        else {
            return address(0);
        }
    }

    /// @notice Get the user expires of an NFT
    /// @dev The zero value indicates that there is no user
    /// @param tokenId The NFT to get the user expires for
    /// @return The user expires for this NFT
    function userExpires(uint256 tokenId) public view virtual returns (uint256){
        return userInfo[tokenId].expires;
    }

    /// @dev See {IERC165-supportsInterface}.
    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC4907).interfaceId || super.supportsInterface(interfaceId);
    }

    //  function _beforeTokenTransfer(
    //    address from,
    //    address to,
    //    uint256 tokenId
    //  ) internal virtual override {
    //    super._beforeTokenTransfer(from, to, tokenId);
    //
    //    if (from != to) {
    //      userInfo[tokenId].user = address(0);
    //      userInfo[tokenId].expires = 0;
    //      emit UpdateUser(tokenId, address(0), 0);
    //    }
    //  }
}
