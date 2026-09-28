import type {Datatypes, Datatypes_S} from "./Types.ts"
import * as RDL from "readline"
import * as fs from "fs"
import { cwd, stdin, stdout } from "process";
import { error } from "console";
const API_URL = "https://retoolapi.dev/bEvwsN/data";


async function Datacall() {
    const response  =  await fetch(API_URL);
    if(!response.ok)
    {
        throw new Error("Gond van a lekérdezésel!")
    }
    let list = await response.json() as Datatypes[]
    return list;
}

export async function GetDataListed()
{
    let teacherList : Datatypes[] = await Datacall();
    for(const teach of teacherList)
    {
        console.log(`${teach.id}. Tanár:\nNév: ${teach.Teacher_Name}, Óraszám: ${teach.Class_Hour}, Munkanap: ${teach.Work_Day}`)
    }

}

//#region

export function NewData()
{
    const rl = RDL.createInterface({
        input: stdin,
        output: stdout
    })

    let inputData : Datatypes_S = {
        
        Teacher_Name: "",
        Class_Hour: 0,
        Work_Day: ""
    };
    rl.question("Tanárnév: ", (anwser) => {
        if(anwser === "")
        {
            throw new Error("Nem lehet üres a név!")
            
        }else{
            inputData.Teacher_Name = anwser;
        }
    })

    rl.question("Óraszám: ", (anwser) => {
        const forditas = parseInt(anwser)
        if(forditas < 0 || forditas > 7)
        {
            throw new Error("Az óraszám csak 1 és 7 közzöt lehet!")
            
        }else{
            inputData.Class_Hour = forditas
        }
    })

    rl.question("Munkanap: ", (anwser) => {
    if(anwser === "")
    {
        throw new Error("Nem lehet üres a munkanap!")
        
    }else{
        inputData.Work_Day = anwser
    }
    })

    UploadNewData(inputData)
    
    
}

async function UploadNewData(teacher : Datatypes_S)
{
    await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(teacher),
    })
}

//#endregion

//#region

async function DeleteById(Id : number)
{
    let s_list = await Datacall()
    for(const data of s_list)
    {
        if(data.id === Id)
        {
            DeletedFromAPI(Id)
        }
    }

}

async function DeleteByName(name : string)
{
    let s_list = await Datacall()
    for(const data of s_list)
    {
        if(data.Teacher_Name === name)
        {

            DeletedFromAPI(data.id)
        }
    }

}

async function DeletedFromAPI(Id : number)
{
        await fetch(API_URL + "/" + Id,{
        method: "DELETE"
    })
}

//#endregion

export async function ExportAsJSON()
{
    const rl = RDL.createInterface({
        input: stdin,
        output: stdout
    })
    rl.question("Hogyan akkarod elnevezni a fájlod? ", async (anwser) => {
        if(anwser === "")
        {
            throw new Error("Nem lehet semmi a fálj neve!")
        }
        else{

            let e_data : Datatypes[] = await Datacall();
            fs.writeFileSync(anwser,e_data.toString(), "utf-8")
            console.log("Exportálva!")
        }
    })
}