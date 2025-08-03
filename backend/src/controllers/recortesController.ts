import { RequestHandler } from "express";
import { createRecorteService, deleteRecorteService, editRecorteService, findRecorteByIdService, getRecorteService, getRecortesService } from "../service/recortesServices";
import { createKey } from "../utils/createKey";
import { Recortes } from "../types/Recortes";
import { extrairPublicId } from "../utils/extrairPublicId";

const cloudinary = require('../config/cloudinary');

// GET todos recortes
export const getRecortesController:RequestHandler = async (req,res) => {
    try {
      const recortes = await getRecortesService();
      res.status(200).json({status: true, recortes});
  } catch {
      res.status(500).json({ error: 'Erro ao buscar recortes' });
  }
}

export const getRecorteController:RequestHandler = async (req, res ) => {
  
  if(!req.params.id) {
    return res.status(400).json({error: "dados faltantes"});
  } 
  
  try {
    const recorte = await getRecorteService(req.params.id);
    res.status(200).json({status: true, recorte});
  } catch {
    res.status(500).json({ error: 'Erro ao buscar recorte' });
  }
}

export const postRecortesController:RequestHandler = async (req,res) => {
  
  const data:Recortes = req.body;
  const chave = createKey(data.tipoRecorte, data.nomeModelo, data.material, data.cor);
  data.chave = chave;
  console.log(data);

  if(!data.ativo || !data.chave || !data.cor || !data.imagemUrl || !data.material || !data.nomeModelo || !data.ordemExibicao || !data.sku || !data.tipoRecorte) {
    return res.status(400).json({error: "Dados faltantes na requisiçao"})
  }
  
  try {
    const novoRecorte = await createRecorteService(data);
    res.status(201).json(novoRecorte);
  }
   catch {
    res.status(500).json({ error: 'Erro ao criar recorte' });
  }
}

export const editRecortesController:RequestHandler = async (req,res) => {
  
  const data:Recortes = req.body;
  data.id = req.params.id;

  if(!data.id || !data.ativo || !data.chave || !data.cor || !data.imagemUrl || !data.material || !data.nomeModelo || !data.ordemExibicao || !data.posicao || !data.sku || !data.tipoProduto || !data.tipoRecorte) {
    return res.status(400).json({error: "Dados faltantes na requisiçao"})
  }
  
  const chave = createKey(data.tipoRecorte, data.nomeModelo, data.material, data.cor);
  data.chave = chave;

  try {
    const recorteAtualizado = await editRecorteService(data);
    res.status(201).json({recorteAtualizado});
  }
   catch {
    res.status(500).json({ error: 'Erro ao criar recorte' });
  }
}

export const deleteRecortesController:RequestHandler = async (req,res) => {
  
  const { id } = req.params;

  try {

    const recorte = await findRecorteByIdService(id);
    if(!recorte){
      return res.status(500).json({error: "Recorte nao encontrado"})
    }
    
    const publicId = extrairPublicId(recorte.imagemUrl as string);
    
    if (!publicId) {
      return res.status(500).json({error: "id da imagem nao encontrado"})
    }

    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });

    await deleteRecorteService(id);      

    res.status(200).json({ message: 'Recorte e imagem excluídos com sucesso' });
    
  } catch {
    res.status(500).json({ error: 'Erro ao excluir recorte' });
  }
}

