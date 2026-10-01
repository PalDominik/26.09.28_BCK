import type {Datatypes, Datatypes_S} from "./Types.ts"
import * as fs from "fs"

const API_URL = "https://retoolapi.dev/bEvwsN/data";


export async function Datacall() {
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



export async function UploadNewData(teacher : Datatypes_S)
{
    await fetch(API_URL, {
        method: "POST",
        headers : { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(teacher),
    })
}

//#endregion

//#region

export async function DeleteById(Id : number)
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

export async function DeleteByName(name : string)
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

