import { stdin, stdout } from "process";
import * as rdl from "readline";
import { DeleteById, DeleteByName, ExportAsJSON, GetDataListed, NewData } from "./API_Work.ts";

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
            switch (parseInt(anwser)){
                case 1:
                    GetDataListed();
                    break
                case 2:
                    NewData()
                    break
                case 3:
                    m_rl.question("Név(N) vagy ID(I) alapján akkarsz törölni?: ",(anwser) => {
                        switch(anwser)
                        {
                            case "N":
                                m_rl.question("Nevet kérek: ", (anwser)=>{
                                    DeleteByName(anwser)
                                })
                                break;
                            case "I":
                                m_rl.question("ID kérek: ", (anwser)=>{
                                    DeleteById(parseInt(anwser))

                                })
                                break;
                            default: 
                            console.log("Valami hibba történt törléskor!")
                            break
                        }
                    })
                    break;
                case 4:
                    ExportAsJSON()
                    break;
                case 5:
                    console.log("Viszlát felhasználó!")
                    running = false
                    break;
                default: 
                console.log("Ilyen opció nincs genyó!")
                break
            }
            console.log("\n--------\n");
        })

    }
}


main()

