

import { Network, Alchemy } from 'alchemy-sdk';

const settings = {
  apiKey: "iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0",
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get all NFTs owned by the provided address or ENS domain
const nfts = alchemy.nft.getNftsForOwner("vitalik.eth");