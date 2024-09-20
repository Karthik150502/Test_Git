


import * as bip39 from "bip39"
import * as crypto from "crypto"
import * as elliptic from "elliptic"

function generateKeyPairFromMnemonic(mnemonic) {
  // Derive a seed from the mnemonic phrase
  const seed = bip39.mnemonicToSeedSync(mnemonic);

  // Create an elliptic curve key pair
  const ec = new elliptic.ec('secp256k1');
  const keyPair = ec.genKeyPair({
    entropy: seed.slice(0, 32), // Take the first 32 bytes of the seed for entropy
  });

  return {
    privateKey: keyPair.getPrivate('hex'),
    publicKey: keyPair.getPublic('hex'),
  };
}

// Example usage
const mnemonic = 'bulb side gas smart already bread pause copper finish light stomach stove';
const keyPair = generateKeyPairFromMnemonic(mnemonic);
console.log('Private Key:', keyPair.privateKey);
console.log('Public Key:', keyPair.publicKey);
