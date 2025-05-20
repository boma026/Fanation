'use client';

import { useState } from 'react';

export default function DetalhePecaPage() {
  const [ativo, setAtivo] = useState(true);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Modelo Americano</h1>
          <p className="text-sm text-gray-500">1 de abril de 2025, 08:00h • Fanation</p>
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium">Ativo</span>
          <button
            onClick={() => setAtivo(!ativo)}
            className={`w-10 h-5 rounded-full flex items-center transition ${
              ativo ? 'bg-purple-700' : 'bg-gray-300'
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                ativo ? 'translate-x-5' : 'translate-x-1'
              }`}
            />
          </button>
          <button className="border border-gray-300 rounded px-4 py-1 text-sm">Descartar</button>
          <button className="bg-black text-white px-4 py-1 rounded text-sm">Salvar</button>
        </div>
      </div>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Coluna Esquerda */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">Tipo de recorte</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Escolher</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Posição do recorte</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Escolher</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Tecido</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Escolher</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Cor do tecido</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Escolher</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium">SKU</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Ex: #123"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Chave key gerada</label>
            <input
              type="text"
              readOnly
              value="aba-frente-americano-linho-azul_marinho"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Upload de imagem */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">Mídia</label>
        <div className="flex items-center gap-4">
          <img
            src="/amarelo.png"
            alt="Imagem da peça"
            className="w-32 h-32 object-cover rounded border"
          />
          <div className="border-2 border-dashed border-gray-300 rounded w-full p-6 text-center text-sm text-gray-400">
            <p>Arraste a imagem aqui ou clique para selecionar</p>
          </div>
        </div>
      </div>
    </div>
  );
}