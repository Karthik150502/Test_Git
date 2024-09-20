import { Keypair } from "@solana/web3.js";
import bs58 from 'bs58'
import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";


function getKeyPair(privateKey) {
    const secret = bs58.decode(privateKey)
    let publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58()


    return {
        public: publicKey,
        private: privateKey
    }
}



let res = getKeyPair("2FJUn2BWnfwn6n4iU7MrG4xW6LyxFakfHeTFN3yGjCQR9wUmKxvQz5zryks3sEkUZwo4TdLZSVBWRATpv9YLTBwW")
console.log(res)