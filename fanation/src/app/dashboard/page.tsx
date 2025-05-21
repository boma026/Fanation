'use client';

import { useEffect, useState } from 'react';

interface Recorte {
  id: string;
  nomeModelo: string;
  sku: string;
  tipoProduto: string;
  ordemExibicao: number;
  tipoRecorte: string;
  posicao: string;
  material: string;
  cor: string;
  imagemUrl: string;
  criadoEm: string;
}

export default function DashboardPage() {
  const [recortes, setRecortes] = useState<Recorte[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRecortes() {
      try {
        const token = localStorage.getItem('token');

        const res = await fetch('http://localhost:4000/recortes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Erro ao buscar recortes: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error('Formato de resposta inválido');
        }

        setRecortes(data);
      } catch (error) {
        console.error('Erro ao buscar recortes:', error);
        setRecortes([]); // Evita que o map quebre
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecortes();
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Peças gerais</h1>
        <button className="bg-black text-white px-4 py-2 rounded">Adicionar peça</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 border rounded">Todos ({recortes.length})</button>
        <button className="px-3 py-1 border rounded bg-black text-white">Ativos (0)</button>
        <button className="px-3 py-1 border rounded">Expirados (0)</button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="w-1/3 p-2 border rounded"
        />
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2">Nome do Modelo</th>
            <th className="text-left p-2">SKU</th>
            <th className="text-left p-2">Tipo</th>
            <th className="text-left p-2">Ordem</th>
            <th className="text-left p-2">Material</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td className="p-2" colSpan={5}>Carregando...</td></tr>
          ) : recortes.length === 0 ? (
            <tr><td className="p-2" colSpan={5}>Nenhum recorte encontrado.</td></tr>
          ) : (
            recortes.map((recorte) => (
              <tr key={recorte.id} className="border-t">
                <td className="p-2">{recorte.nomeModelo}</td>
                <td className="p-2">{recorte.sku}</td>
                <td className="p-2">{recorte.tipoProduto}</td>
                <td className="p-2">{recorte.ordemExibicao}</td>
                <td className="p-2">{recorte.material}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}