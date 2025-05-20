'use client';

import { useEffect, useState } from 'react';

type Recorte = {
  id: number;
  modelo: string;
  sku: string;
  tipoProduto: string;
  ordemExibicao: number;
  ativo: boolean;
};

export default function DashboardPage() {
  const [recortes, setRecortes] = useState<Recorte[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecortes() {
      try {
        const res = await fetch('http://localhost:4000/recortes'); // ajuste a URL se estiver em produção
        const data = await res.json();
        setRecortes(data);
      } catch (error) {
        console.error('Erro ao buscar recortes:', error);
      } finally {
        setLoading(false);
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
        <button className="px-3 py-1 border rounded bg-black text-white">
          Ativos ({recortes.filter(r => r.ativo).length})
        </button>
        <button className="px-3 py-1 border rounded">
          Expirados ({recortes.filter(r => !r.ativo).length})
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="w-1/3 p-2 border rounded"
        />
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left p-2">Título</th>
              <th className="text-left p-2">SKU</th>
              <th className="text-left p-2">Tipo</th>
              <th className="text-left p-2">Ordem</th>
              <th className="text-left p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {recortes.map((recorte) => (
              <tr key={recorte.id} className="border-t">
                <td className="p-2">{recorte.modelo}</td>
                <td className="p-2">{recorte.sku}</td>
                <td className="p-2">{recorte.tipoProduto}</td>
                <td className="p-2">{recorte.ordemExibicao}</td>
                <td className="p-2">
                  <span className={recorte.ativo ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {recorte.ativo ? "Ativo" : "Inativo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 text-center">
        <button className="mx-1 px-2 py-1 border rounded">1</button>
        <button className="mx-1 px-2 py-1 border rounded">2</button>
        <button className="mx-1 px-2 py-1 border rounded">3</button>
      </div>
    </main>
  );
}