import { Prisma } from "@prisma/client";
import { createRecorteModel, deleteRecorteModel, editRecorteModel, findRecorteByIdModel, getRecorteModel, getRecortesModel } from "../model/recortesModel";

export const getRecortesService = async () => {
    return await getRecortesModel();
}

export const getRecorteService = async (id: string) => {
    return await getRecorteModel(id);
}

export const createRecorteService = async (data: Prisma.RecorteCreateInput) => {
    return await createRecorteModel(data);
}

export const editRecorteService = async (data: Prisma.RecorteUpdateInput) => {
      if (!data.id || typeof data.id !== "string") {
        throw new Error("ID do recorte é obrigatório para edição.");
    }
    
    return await editRecorteModel(data, data.id);
}

export const findRecorteByIdService = async (id: string) => {
    return await findRecorteByIdModel(id);
}

export const deleteRecorteService = async (id:string) => {
    return await deleteRecorteModel(id);
}