let hasher = require("bcryptjs");

let hash = "$2a$10$Fd30LdWg/fSXslHt6Nn4pePG0GqowYMLNji1ZgMFg3HdP29gKFQRi"
const prompt = require('prompt-sync')();



async function findWord() {
    let q;
    while (q != "quit") {
        q = prompt('Enter word: ');
        let hashed = await hasher.hash(q, 10);
        if (hashed == hash) {
            console.log("Word found...." + q);
            break;
        }
    }
}


findWord();