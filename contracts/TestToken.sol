pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
  constructor(
    string memory _name,
    string memory _symbol
  ) ERC20(_name, _symbol) {

  }

  function giveMe(uint256 amount) public {
    _mint(msg.sender, amount);
  }

  function decimals() public view virtual override returns (uint8) {
    return 6;
  }
}
