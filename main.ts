import { stdin, stdout } from "process";
import * as rdl from "readline";
import { DeleteById, DeleteByName, ExportAsJSON, GetDataListed, NewData } from "./API_Work.ts";

let running : boolean = true;
const m_rl = rdl.createInterface({
    input: stdin,
    output: stdout
})

async function main() {
    while (running) {
        console.log("Üdvözlöm felhasználó!");
        console.log("Válassz a menüpontok közül!");
        console.log(
            "1. | felhasználók listázása.\n" +
            "2. | új felhasználó hozzáadása.\n" +
            "3. | felhasználó törlése.\n" +
            "4. | lista exportálása.\n" +
            "5. | kilépés.\n"
        );

        const answer = await askQuestion("Kérem a válaszát: ");

        switch (parseInt(answer)) {
            case 1:
                await GetDataListed();
                break;

            case 2:
                await NewData();
                break;

            case 3: {
                const deleteType = await askQuestion(
                    "Név(N) vagy ID(I) alapján akarsz törölni?: "
                );

                switch (deleteType.toUpperCase()) {
                    case "N": {
                        const name = await askQuestion("Nevet kérek: ");
                        DeleteByName(name);
                        break;
                    }

                    case "I": {
                        const id = await askQuestion("ID kérek: ");
                        DeleteById(parseInt(id));
                        break;
                    }

                    default:
                        console.log("Valami hiba történt törléskor!");
                        break;
                }

                break;
            }

            case 4:
                await ExportAsJSON();
                break;

            case 5:
                console.log("Viszlát felhasználó!");
                running = false;
                break;

            default:
                console.log("Ilyen opció nincs.");
                break;
        }

        console.log("\n--------\n");
    }

    m_rl.close();
}


//#region

// async function main()
// {
//     while(running)
//     {
//         console.log("Üdvözlöm felhasználó!\nVálasz a menüpontok közzül!")
//         console.log("1. | felhasználok listázása.\n2. | új felhasználó hozzáadása.\n3. | felhasználo törlése .\n4. | lista exportálása.\n5. | kilépés.\n")
//         m_rl.question("Kérem a válaszát: ", async (anwser) => {
//             switch (parseInt(anwser)){
//                 case 1:
//                     GetDataListed();
//                     break
//                 case 2:
//                     NewData()
//                     break
//                 case 3:
//                     m_rl.question("Név(N) vagy ID(I) alapján akkarsz törölni?: ",(anwser) => {
//                         switch(anwser)
//                         {
//                             case "N":
//                                 m_rl.question("Nevet kérek: ", (anwser)=>{
//                                     DeleteByName(anwser)
//                                 })
//                                 break;
//                             case "I":
//                                 m_rl.question("ID kérek: ", (anwser)=>{
//                                     DeleteById(parseInt(anwser))

//                                 })
//                                 break;
//                             default: 
//                             console.log("Valami hibba történt törléskor!")
//                             break
//                         }
//                     })
//                     break;
//                 case 4:
//                     ExportAsJSON()
//                     break;
//                 case 5:
//                     console.log("Viszlát felhasználó!")
//                     running = false
//                     break;
//                 default: 
//                 console.log("Ilyen opció nincs genyó!")
//                 break
//             }
//             console.log("\n--------\n");
//         })

//     }
// }

//#endregion

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        m_rl.question(question, resolve);
    });
}

 main()

