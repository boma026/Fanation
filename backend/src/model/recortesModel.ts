import { Prisma } from "@prisma/client";
import { prisma } from "../libs/prisma";


export const getRecortesModel = async () => {
    try{
        return await prisma.recorte.findMany();
    }catch(e) {
        console.error(e);
        throw new Error("Erro ao buscar recortes no banco");
    }
}

export const getRecorteModel = async (id: string) => {
    try{
        return await  prisma.recorte.findUnique({
            where: { id }
        })
    }
        catch(e) {
            console.error(e);
            throw new Error("Erro ao buscar recortes no banco");
        }
    }

export const createRecorteModel = async (data: Prisma.RecorteCreateInput) => {
    try {
        return await prisma.recorte.create({
        data,
    });
    }catch(e) {
        console.error(e);
        throw new Error("Erro ao criar recorte");
    }
}

export const editRecorteModel = async (data: Prisma.RecorteUpdateInput, id: string) => {
    try {
        return await prisma.recorte.update({
        where: {id},
        data,
    });
    }catch(e) {
        console.error(e);
        throw new Error("Erro em atualizar recorte");
    }
}

export const findRecorteByIdModel = async (id: string) => {
    try {
        return await prisma.recorte.findUnique({
            where: { id }
        })
    }catch(e){
        throw new Error("Não foi possivel encontrar ");
    }
}

export const deleteRecorteModel = async (id:string) => {
    try {
        return await prisma.recorte.delete({
            where: { id }
        })
    }
    catch(e) {
        throw new Error("Não foi possivel encontrar o recorte")
    }
}