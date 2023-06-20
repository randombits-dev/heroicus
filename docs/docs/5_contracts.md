# Contracts

Heroicus contract:

## Methods

### rent

```solidity
function rent(
  string memory tokenURI, // the ipfs location of the metadata (this is simply a title, description, and image for the NFT)
  bytes32 templateId, // the server template to rent
  uint8 region, // the region of the server
  uint256 amount // the amount of USDC you wish to spend, the expiration is calculated from this amount
) external
```
