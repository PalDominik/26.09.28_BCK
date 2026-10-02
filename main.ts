import { stdin, stdout } from "process";
import * as rdl from "readline";
import { Datacall, DeleteById, DeleteByName, GetDataListed, UploadNewData } from "./API_Work.ts";
import type { Datatypes_S } from "./helyettesites.ts";
import * as fs from "fs";


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
                        console.log('\x1b[33m','Valami hiba történt törléskor!\x1b[0m');
                        break;
                }

                break;
            }

            case 4:
                await ExportAsJSON();
                break;

            case 5:
                console.log('\x1b[36m','Viszlát felhasználó!\x1b[0m');
                running = false;
                break;

            default:
                console.log('\x1b[33m','Ilyen opció nincs.\x1b[0m');
                break;
        }

        console.log("\n--------\n");
    }

    m_rl.close();
}

//#region átpakolt
export async function NewData()
{


    let inputData : Datatypes_S = {
        
        Teacher_Name: "",
        Class_Hour: 0,
        Work_Day: ""
    };
    let valasz = await askQuestion("Tanár neve: ");
    if(valasz === "")
    {
        // throw new Error("Nem lehet üres nevet adni!")
        console.log('\x1b[31m','Nem lehet üres nevet adni!\n\x1b[0m')
        main()
    }
    else{
        inputData.Teacher_Name = valasz;
    }

    valasz = await askQuestion("Óraszám: ")
        if(valasz === "")
    {
        // throw new Error("Nem lehet üres óraszámot adni!")
        console.log('\x1b[31m','Nem lehet üres óraszámot adni!\n\x1b[0m')
        main()
    }
    else{
        inputData.Class_Hour = parseInt(valasz);
    }

    const datum_Lista : string[] = ["Vasárnap","Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat"]

    const datum = new Date();
    let now = datum.getDay()
    if(now !=6)
    {
        now++;
    }
    else
    {
        now = 0;
    }
    
    inputData.Work_Day = datum_Lista[now]!;

    // valasz = await askQuestion("Melyik napon dolgozik?: ")

    // if(valasz === "")
    // {
    //     throw new Error("Nem lehet üres nevet adni!")
    // }
    // else{
    //     inputData.Work_Day = valasz;
    // }
    // console.log(`Tanár: ${inputData.Teacher_Name} | ${inputData.Work_Day} | ${inputData.Class_Hour}`)
    UploadNewData(inputData)
    
    
}

export async function ExportAsJSON()
{

    let faljnev = await askQuestion("Mi legyen a fáljod neve?: ")
    if(faljnev === "")
    {
        // throw new Error("Nem lehet üres a fáljnak a neve!")
        console.log('\x1b[31m','Nem lehet üres a fáljnak a neve!\n\x1b[0m')
        main()
    }else{
        fs.writeFileSync(`${faljnev}.json`,(JSON.stringify(await Datacall())))
    }
}

//#endregion

function askQuestion(question: string): Promise<string> {
    return new Promise((resolve) => {
        m_rl.question(question, resolve);
    });
}

 main()

