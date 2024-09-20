import { Keypair, Connection, SystemProgram, Transaction, sendAndConfirmTransaction, clusterApiUrl } from '@solana/web3.js'
import fs from "fs";
import bs58 from "bs58";

// Connect to Solana devnet
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Generate a new keypair for the data account
const dataAccount = Keypair.generate();



const payer = Keypair.fromSecretKey(new Uint8Array([201, 46, 114, 32, 123, 4, 180, 148, 65, 151, 70, 0, 250, 29, 4, 29, 226, 251, 151, 231, 109, 199,
    128, 202, 168, 39, 87, 121, 100, 76, 29, 251, 149,
    168, 118, 229, 111, 120, 220, 56, 79, 243, 81, 164,
    100, 122, 192, 227, 195, 171, 177, 52, 100, 158, 35,
    105, 211, 137, 56, 18, 119, 62, 64, 211])); // This will be the account paying for the transaction


// "52HtR6uB2wNdMW3wy3kAS6XvaiHcKrTBEX9Egb1WMmbrV52qJRC3dNMSMKncx2MrhLdP1cuPpzUS3VAURFpdcNB4"
// "B5CjnrjaPPp9dkM2LKhBREvqKeiT9ggAG3NtTtKYm4tA"

async function createAccount() {
    // Create a transaction to create and fund the account
    const tx = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer.publicKey,
            newAccountPubkey: dataAccount.publicKey,
            lamports: await connection.getMinimumBalanceForRentExemption(1000), // Amount to fund the account
            space: 1000, // Space in bytes to allocate for data
            programId: SystemProgram.programId,
        })
    );

    // Send the transaction to the network
    const txId = await sendAndConfirmTransaction(connection, tx, [payer, dataAccount]);

    console.log(`Created account with transaction ID: ${txId}`);

}

createAccount();
