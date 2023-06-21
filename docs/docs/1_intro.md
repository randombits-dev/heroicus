---
slug: /
---

# Intro

Hērōicus is a cloud server rental platform that integrates with the Fantom blockchain and uses NFTs.

## How it works

A user calls the rent() function of the contract, passing in the region, server type, and amount of USDC they wish to spend. An NFT is minted like the following:

<img src="/img/nft.png" width="500"/>


Hērōicus uses these NFTs to control access to the servers.

It uses ERC-4907, an NFT rental extension, where the NFT has an expiration date. After the NFT expires, the user no longer owns it.

## Problems it solves

**Expensive Graphics Cards.**
Running stable diffusion requires high-end graphics cards. Unless you use your GPU consistently, it is cheaper to rent a GPU server in the cloud.

**Anonymous and Safe Payments.**
There are other sites that let you rent stable diffusion servers, but they require credit cards. Hērōicus lets you pay with USDC.

**Automatic expiration of servers.**
If you rent a stable diffusion server on a different platform, you have to remember to shut it down when your finished, otherwise it keeps using your credits. Hērōicus has automatic expiration that terminates your server for you.

## Getting Started

After connecting your wallet on the Fantom network, you will see your current server rentals and the available servers to rent.

See [Renting a Server](renting)




