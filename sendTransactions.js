

import { Connection, Keypair, LAMPORTS_PER_SOL, SystemProgram, TransactionInstruction, TransactionMessage, VersionedTransaction, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import bs58 from "bs58";
const rpc_mainnet = "https://solana-mainnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"
const rpc_devnet = "https://solana-devnet.g.alchemy.com/v2/iYBZ6yhrdNJhg96PO9oMUO9TcWGhuUU0"





const connection = new Connection(
    rpc_devnet,
    'confirmed',
);

async function transact(fromObj, toPublicKey) {
    // Step 1 - Get Latest Blockhash
    const blockhashResponse = await connection.getLatestBlockhashAndContext('finalized');


    console.log("blockhashResponse = ", blockhashResponse)

    const lastValidHeight = blockhashResponse.value.lastValidBlockHeight;

    const INSTRUCTIONS = SystemProgram.transfer({
        fromPubkey: fromObj.publicKey,
        toPubkey: bs58.decode(toPublicKey),
        lamports: 0.01 * LAMPORTS_PER_SOL,
    });

    console.log("==========================")
    const messageV0 = new TransactionMessage({
        payerKey: fromObj.publicKey,
        recentBlockhash: blockhashResponse.value.blockhash,
        instructions: [INSTRUCTIONS]
    }).compileToV0Message();




    const transaction = new VersionedTransaction(messageV0);
    transaction.sign([from]);


    const txId = await connection.sendTransaction(transaction)

    console.log('txId', txId);
    return [txId, lastValidHeight]
}


let secretKey = "2FJUn2BWnfwn6n4iU7MrG4xW6LyxFakfHeTFN3yGjCQR9wUmKxvQz5zryks3sEkUZwo4TdLZSVBWRATpv9YLTBwW"


const from = Keypair.fromSecretKey(bs58.decode(secretKey));
const to = "B5CjnrjaPPp9dkM2LKhBREvqKeiT9ggAG3NtTtKYm4tA";




let txId;
let lastValidHeight;
async function main() {
    try {
        let res = await transact(from, to);
        [txId, lastValidHeight] = res;
    } catch (error) {
        console.log("Error from main = ", error)
    } finally {
    }
}
await main();


async function isBlockhashExpired(connection, lastValidBlockHeight) {
    let currentBlockHeight = (await connection.getBlockHeight('finalized'));
    console.log('                           ');
    console.log('Current Block height:             ', currentBlockHeight);
    console.log('Last Valid Block height - 150:     ', lastValidBlockHeight - 150);
    console.log('--------------------------------------------');
    console.log('Difference:                      ', currentBlockHeight - (lastValidBlockHeight - 150)); // If Difference is positive, blockhash has expired.
    console.log('                           ');

    return (currentBlockHeight > lastValidBlockHeight - 150);
}


const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}






// Step 4 - Check transaction status and blockhash status until the transaction succeeds or blockhash expires
let hashExpired = false;
let txSuccess = false;
let START_TIME = new Date();



while (!hashExpired && !txSuccess) {


    const { value: statuses } = await connection.getSignatureStatuses([txId]);

    if (!statuses || statuses.length === 0) {
        throw new Error('Failed to get signature status');
    }

    const status = statuses[0];

    if (status.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(status.err)}`);
    }

    // Break loop if transaction has succeeded
    if (status && ((status.confirmationStatus === 'confirmed' || status.confirmationStatus === 'finalized'))) {
        txSuccess = true;
        const endTime = new Date();
        const elapsed = (endTime.getTime() - START_TIME.getTime()) / 1000;
        console.log(`Transaction Success. Elapsed time: ${elapsed} seconds.`);
        console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
        break;
    }

    hashExpired = await isBlockhashExpired(connection, lastValidHeight);

    // Break loop if blockhash has expired
    if (hashExpired) {
        const endTime = new Date();
        const elapsed = (endTime.getTime() - START_TIME.getTime()) / 1000;
        console.log(`Blockhash has expired. Elapsed time: ${elapsed} seconds.`);
        // (add your own logic to Fetch a new blockhash and resend the transaction or throw an error)
        break;
    }

    // Check again after 2.5 sec
    await sleep(2500);
}