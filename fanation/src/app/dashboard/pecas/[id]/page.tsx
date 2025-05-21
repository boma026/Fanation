'use client';

import { useState, useRef } from 'react';

export default function DetalhePecaPage() {
  const [ativo, setAtivo] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('/amarelo.png');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setImage(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('imagem', image);

    const res = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setPreviewUrl(data.imageUrl);
    setUploading(false);
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Modelo Americano</h1>
          <p className="text-sm text-gray-500">1 de abr. de 2023, 00:00 de FANATION</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Ativo</span>
            <button
              onClick={() => setAtivo(!ativo)}
              className={`w-10 h-5 rounded-full flex items-center transition ${
                ativo ? 'bg-purple-700' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                  ativo ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <button className="px-4 py-2 border rounded text-sm">Descartar</button>
          <button className="px-4 py-2 bg-black text-white rounded text-sm">Salvar</button>
        </div>
      </div>

      {/* Formulário */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Coluna Esquerda */}
        <div className="flex flex-col gap-4 border p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-1">Nome do Modelo</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Modelo Americano</option>
              <option>Trucker</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Tipo de recorte</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Aba</option>
              <option>Copa</option>
              <option>Fechador</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Posição da imagem</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Frente</option>
              <option>Lateral</option>
              <option>Atrás</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ordem de exibição</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tecidos</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Linho</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Cor do tecido</label>
              <select className="w-full border border-gray-300 rounded px-3 py-2">
                <option>Azul Marinho</option>
                <option>Laranja</option>
                <option>Preto</option>
              </select>
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="flex flex-col gap-4 border p-4 rounded">
          <div>
            <label className="block text-sm font-medium mb-1">SKU</label>
            <input
              type="text"
              placeholder="Ex: #123"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Chave key gerada</label>
            <input
              type="text"
              readOnly
              value="aba-frente-americano-linho-azul_marinho"
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* Imagem */}
      <div className="mt-6 border p-4 rounded">
        <label className="block text-sm font-medium mb-2">Mídia</label>
        <div className="flex items-center gap-4">
          <img
            src={previewUrl}
            alt="Imagem da peça"
            className="w-32 h-32 object-cover rounded border"
          />
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-gray-300 rounded w-full p-6 text-center text-sm text-gray-400 hover:border-purple-500 transition"
          >
            <p>Carregar arquivo</p>
            <p className="text-xs">Escolha um arquivo ou arraste e solte aqui</p>
            {uploading && <p className="text-xs text-purple-600 mt-1">Enviando...</p>}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {image && (
          <button
            onClick={handleUpload}
            className="mt-4 px-4 py-2 bg-purple-700 text-white rounded text-sm"
            disabled={uploading}
          >
            Enviar Imagem
          </button>
        )}
      </div>
    </div>
  );
}
