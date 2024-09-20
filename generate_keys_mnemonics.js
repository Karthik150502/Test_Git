import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";


// const mnemonic = generateMnemonic();
// const mnemonic = "occur submit hole area hurt mosquito mystery ritual brown garlic track empower" //Phantom Seed
// const mnemonic = "ceiling industry forest outside renew dignity expect milk broken retire sad lyrics"
const mnemonic = "cute witness acquire skirt robot mushroom gentle love tent total plunge boss"



const seed = mnemonicToSeedSync(mnemonic);
const NO_OF_KEY_PAIRS = 1; //The number of wallets, for which the public keys has to be found

for (let i = 0; i < NO_OF_KEY_PAIRS; i++) {
    const path = `m/44'/501'/${i}'/0'`; //This is the derivation path;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    console.log(secret)
    console.log(Keypair.fromSecretKey(secret).publicKey.toBase58());
}   