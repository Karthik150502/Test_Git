import crypto from 'crypto-js';



var ciphertext = crypto.AES.encrypt('+917483935582 ', 'secret key 123').toString();
console.log(ciphertext)
var bytes = crypto.AES.decrypt(ciphertext, 'secret key 123');
var originalText = bytes.toString(crypto.enc.Utf8);
console.log(originalText)
