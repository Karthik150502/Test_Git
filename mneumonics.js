import { generateMnemonic, mnemonicToSeedSync } from "bip39";




const mnemonic = generateMnemonic(256)
console.log(mnemonic)
const seed = mnemonicToSeedSync(mnemonic)
console.log(seed)