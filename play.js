import fs from "fs";



async function readFile(path, encoding) {
    return new Promise((res, rej) => {
        try {
            let cont = fs.readFileSync(path, encoding);
            res(cont)
        } catch (e) {
            rej(e)
        }
    })
}

let res = await readFile("./demo.txt", "utf-8")
console.log(res)