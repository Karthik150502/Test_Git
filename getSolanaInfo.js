import axios from 'axios'
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";




export async function getSolBalance(publicKey) {
    const rpc_mainnet = "https://solana-mainnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"
    const rpc_devnet = "https://solana-devnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"

    let connection = new Connection(rpc_devnet, 'confirmed')

    console.log(clusterApiUrl('devnet'))

    let res;
    connection.getAccountInfo(new PublicKey(publicKey)).then((data) => {
        console.log(data)
    })





    // let res = await axios.post(rpc_devnet, {
    //     jsonrpc: "2.0",
    //     id: 1,
    //     method: "getAccountInfo",
    //     params: [publicKey]
    // })


    // return {
    //     publicKey,
    //     slot: res.data.result.context.slot,
    //     value: res.data.result.value,
    //     id: res.data.id,
    //     jsonrpc: res.data.jsonrpc
    // }

}


// getSolBalance("7vLEZP5JHhKVg3HEGSWcFNaxAKg7L633uMT7ePqmn98V")
// getSolBalance("Bv79sefRQ7BTThEScKtMZxsLBJQV8j5kCKcW7qKKmsSK")
getSolBalance("B5CjnrjaPPp9dkM2LKhBREvqKeiT9ggAG3NtTtKYm4tA")