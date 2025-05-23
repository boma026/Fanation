'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Recorte {
  id: string;
  chave: string;
  nomeModelo: string;
  sku: string;
  tipoRecorte: string;
  ordemExibicao: number;
  tipoProduto: string;
  posicao: string;
  material: string;
  cor: string;
  imagemUrl: string;
  ativo: boolean;
  criadoEm: string;
}

export default function DashboardPage() {
  const [recortes, setRecortes] = useState<Recorte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const router = useRouter();

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
      } catch {
        setRecortes([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecortes();
  }, []);

  const handleRowClick = (id: string) => {
    router.push(`/dashboard/pecas/${id}`);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este recorte?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:4000/recortes/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Erro ao excluir recorte');
      }

      setRecortes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Erro ao excluir recorte:', error);
      alert('Erro ao excluir recorte.');
    }
  };

  const recortesFiltrados = recortes.filter((r) =>
    r.chave.toLowerCase().includes(busca.toLowerCase()) ||
    r.sku.toLowerCase().includes(busca.toLowerCase()) ||
    r.tipoRecorte.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Peças Gerais</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded font-medium"
          onClick={() => router.push('/dashboard/pecas/nova')}
        >
          Adicionar peça
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 border rounded text-sm">Todos ({recortes.length})</button>
        <button className="px-3 py-1 border rounded bg-black text-white text-sm">
          Ativos ({recortes.filter(r => r.ativo).length})
        </button>
        <button className="px-3 py-1 border rounded text-sm">
          Expirados ({recortes.filter(r => !r.ativo).length})
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Buscar"
            className="p-2 border rounded text-sm w-64"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button className="bg-black text-white px-3 py-2 rounded text-sm">🔍</button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium text-gray-700">Imagem</th>
              <th className="p-3 text-left font-medium text-gray-700">Título</th>
              <th className="p-3 text-left font-medium text-gray-700">SKU</th>
              <th className="p-3 text-left font-medium text-gray-700">Tipo</th>
              <th className="p-3 text-left font-medium text-gray-700">Ordem de exibição</th>
              <th className="p-3 text-left font-medium text-gray-700">Status</th>
              <th className="p-3 text-left font-medium text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td className="p-3" colSpan={7}>Carregando...</td>
              </tr>
            ) : recortesFiltrados.length === 0 ? (
              <tr>
                <td className="p-3" colSpan={7}>Nenhum recorte encontrado.</td>
              </tr>
            ) : (
              recortesFiltrados.map((recorte) => (
                <tr key={recorte.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="p-3">
                    {recorte.imagemUrl ? (
                      <img
                        src={recorte.imagemUrl}
                        alt={recorte.chave}
                        className="w-16 h-16 object-contain rounded border border-gray-200"
                      />
                    ) : (
                      <span className="text-gray-400">Sem imagem</span>
                    )}
                  </td>
                  <td className="p-3 cursor-pointer" onClick={() => handleRowClick(recorte.id)}>
                    {recorte.chave}
                  </td>
                  <td className="p-3 cursor-pointer" onClick={() => handleRowClick(recorte.id)}>
                    {recorte.sku}
                  </td>
                  <td className="p-3 cursor-pointer" onClick={() => handleRowClick(recorte.id)}>
                    {recorte.tipoRecorte}
                  </td>
                  <td className="p-3 cursor-pointer" onClick={() => handleRowClick(recorte.id)}>
                    {recorte.ordemExibicao}
                  </td>
                  <td className="p-3">
                    {recorte.ativo ? (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Ativo</span>
                    ) : (
                      <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Inativo</span>
                    )}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDelete(recorte.id)}
                      className="text-red-500 hover:underline text-xs"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
