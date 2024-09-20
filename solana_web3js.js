import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

// Generate a new keypair
const keypair = Keypair.generate();

// Extract the public and private keys
const publicKey = keypair.publicKey.toString();
const secretKey = keypair.secretKey;

// Display the keys
console.log("Public Key:", publicKey);
console.log("Private Key (Secret Key):", secretKey)
console.log("Private Key (Secret Key):", new TextDecoder().decode(secretKey))

// Convert the message "hello world" to a Uint8Array
const message = new TextEncoder().encode("I am Karthik J, and we will do it.");
console.log("uint8Array = ", message)

const signature = nacl.sign.detached(message, secretKey);


// Verifying the message, with the signature and the public key.
const result = nacl.sign.detached.verify(
    message, // In bytes, type Uint8Array
    signature, //The signatue that was signed by the sender using their Public key.
    keypair.publicKey.toBytes(),
);

console.log(result);