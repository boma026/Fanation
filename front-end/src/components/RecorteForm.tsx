'use client';

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { FormDataRecorte } from '@/services/recortes';

interface RecorteFormProps {
  onSubmit: (data: FormDataRecorte) => Promise<void>;
  initialData?: FormDataRecorte;
}

export default function RecorteForm({ onSubmit, initialData }: RecorteFormProps) {
  const [formData, setFormData] = useState<FormDataRecorte>(
    initialData ?? {
      nomeModelo: '',
      ordemExibicao: 1,
      sku: '',
      tipoRecorte: 'aba',
      tipoProduto: '',
      material: '',
      cor: '',
      imagemUrl: '',
      ativo: true,
    }
  );

  const [loadingUpload, setLoadingUpload] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ordemExibicao' ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoadingUpload(true);

      const formDataUpload = new FormData();
      formDataUpload.append('imagem', file);

      const token = localStorage.getItem('token');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
        method: 'POST',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: formDataUpload,
      });

      if (!response.ok) {
        throw new Error('Erro no upload da imagem');
      }

      const data = await response.json();

      setFormData(prev => ({
        ...prev,
        imagemUrl: data.imageUrl || data.imagemUrl || '',
      }));
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar a imagem. Veja o console para detalhes.');
    } finally {
      setLoadingUpload(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error(error);
      alert('Erro ao enviar o formulário. Veja o console para detalhes.');
    }
  };

  const chave = `${formData.tipoRecorte}-${formData.nomeModelo}-${formData.material}-${formData.cor}`
    .toLowerCase()
    .replace(/\s/g, '_');

  const displayImageUrl =
    formData.imagemUrl
      ? formData.imagemUrl.startsWith('http') || formData.imagemUrl.startsWith('data:')
        ? formData.imagemUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${formData.imagemUrl}`
      : '';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Cadastro de Peça</h2>
        <div className="flex items-center gap-2">
          <span>Ativo</span>
          <input
            type="checkbox"
            checked={formData.ativo}
            onChange={e => setFormData(prev => ({ ...prev, ativo: e.target.checked }))}
            className="toggle toggle-primary"
          />
        </div>
      </div>

      {/* Especificações e Dados do Produto */}
      <div className="grid md:grid-cols-2 gap-6">

        {/* Especificações */}
    <div className="border rounded-xl p-6 bg-white shadow space-y-4">
  <h3 className="text-lg font-semibold">Especificações</h3>
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="label">Nome do Modelo</label>
      <select
        name="nomeModelo"
        value={formData.nomeModelo}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-[5px] px-3 py-2"
        required
      >
        <option value="">Selecione</option>
        <option value="Americano">Americano</option>
        <option value="Trucker">Trucker</option>
      </select>
    </div>
    <div>
      <label className="label">Tipo de Recorte</label>
      <select
        name="tipoRecorte"
        value={formData.tipoRecorte}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-[5px] px-3 py-2"
        required
      >
        <option value="aba">Aba</option>
        <option value="frente">Frente</option>
        <option value="lateral">Lateral</option>
      </select>
    </div>
    <div>
      <label className="label">Ordem de Exibição</label>
      <select
        name="ordemExibicao"
        value={formData.ordemExibicao}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-[5px] px-3 py-2"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </div>
    <div>
      <label className="label">Tecido</label>
      <select
        name="material"
        value={formData.material}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-[5px] px-3 py-2"
        required
      >
        <option value="">Selecione</option>
        <option value="linho">Linho</option>
      </select>
    </div>
    <div>
      <label className="label">Cor do Tecido</label>
      <select
        name="cor"
        value={formData.cor}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-[5px] px-3 py-2"
        required
      >
        <option value="">Selecione</option>
        <option value="laranja">Laranja</option>
        <option value="preto">Preto</option>
        <option value="azul marinho">Azul Marinho</option>
      </select>
    </div>
  </div>
</div>

        {/* Dados do Produto + Chave */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dados do Produto</h3>
          <div>
            <label className="label">Código SKU</label>
            <input
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="SKU"
              className="w-full border border-gray-300 rounded-[5px] px-3 py-2"
              required
            />
          </div>
         <div className="mt-28">
            <label className="label text-[#1C1C1C] font-bold">Chave Key Gerada</label>
            <input
              readOnly
              value={chave}
              className="w-full border border-gray-200 text-black rounded-[5px] px-3 py-2"
            />
          </div>
        </div>
      </div>

      {/* Mídia */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Mídia</h3>
        <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
          {displayImageUrl ? (
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 border rounded overflow-hidden">
                <img
                  src={displayImageUrl}
                  alt="Imagem"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">Clique para trocar a imagem</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">Clique para enviar imagem</p>
              <p className="text-xs text-gray-500">PNG, JPG ou GIF (máx. 10MB)</p>
            </div>
          )}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/gif"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>

        {loadingUpload && <p className="text-blue-600 mt-2">Fazendo upload da imagem...</p>}
      </div>

      <button
        type="submit"
        className="btn btn-primary mt-6"
        disabled={loadingUpload}
      >
        {loadingUpload ? 'Enviando...' : 'Salvar'}
      </button>
    </form>
  );
}
