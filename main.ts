import { stdin, stdout } from "process";
import * as rdl from "readline";

let running : boolean = true;
const m_rl = rdl.createInterface({
    input: stdin,
    output: stdout
})


function main()
{
    while(running)
    {
        console.log("Üdvözlöm felhasználó!\nVálasz a menüpontok közzül!")
        console.log("1. | felhasználok listázása.\n2. | új felhasználó hozzáadása.\n3. | felhasználo törlése .\n4. | lista exportálása.\n5. | kilépés.\n")
        m_rl.question("Kérem a válaszát: ", (anwser) => {
            
        })

    }
}


main()

