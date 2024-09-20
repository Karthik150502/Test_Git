import bs58 from "bs58";
import { Keypair, clusterApiUrl, Connection } from "@solana/web3.js";
import axios from "axios"
import sendWhatsAppMessage from "./sendWhatsappTwilio.js";

function generateTheKeypair() {


    let keys = Keypair.generate()

    let privateKey = bs58.encode(keys.secretKey)
    let publicKey = keys.publicKey.toBase58()
    console.log("Private Key = ", privateKey)
    console.log("Public Key = ", publicKey)

    return [publicKey, privateKey]
}


async function func() {

    let rpc_mainnet = "https://solana-mainnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"

    // let SOL_CONNECTION = new Connection(new clusterApiUrl("mainnet-beta"), "confirmed")
    // let SOL_CONNECTION = new Connection("https://solana-mainnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0", "confirmed")

    let [pubKey, privKey] = generateTheKeypair()

    let res = await axios.post(clusterApiUrl("mainnet-beta"), {
        jsonrpc: "2.0",
        id: 1,
        method: "getAccountInfo",
        params: [pubKey]
    })
    return {
        pubKey, privKey, value: res.data.result.value
    }

}




async function main() {
    let inter;
    let mainRes;
    let apiCalls = 0;
    inter = setInterval(async () => {
        let res = await func();
        apiCalls++
        console.log(`${apiCalls}th API Call.`)
        console.log(res)

        if (res.value) {
            mainRes = res
            await sendWhatsAppMessage(JSON.stringify(mainRes))
            console.log("Main Result = ", mainRes)
            clearInterval(inter)
        }
    }, 2000)
}


main()