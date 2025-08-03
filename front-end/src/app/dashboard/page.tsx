'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

//definindo o tipo de objeto Recorte
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
  const [recortes, setRecortes] = useState<Recorte[]>([]); // lista de recortes
  const [isLoading, setIsLoading] = useState(true); //estado de carregamento
  const [busca, setBusca] = useState(''); //termo de busca
  const router = useRouter(); //roteador da navegaçao

  // busca os recortes da API
  useEffect(() => {
    async function fetchRecortes() {
      try {
        // Recupera o token salvo no navegador
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
                
        setRecortes(data.recortes);
      } catch {
        setRecortes([]);
      } finally {
        // Independentemente do resultado, marca o carregamento como finalizado
        setIsLoading(false);
      }
    }

    fetchRecortes();
    console.log(recortes);
  }, []);

  // Quando o usuário clicar em uma peça para editar
  const handleRowClick = (id: string) => {
    router.push(`/dashboard/pecas/${id}`);
  };

  // Botao de exclusao
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

      // Remove o item da lista apos a exclusao no back
      setRecortes((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error('Erro ao excluir recorte:', error);
      alert('Erro ao excluir recorte.');
    }
  };

  // Filtro de busca
  const recortesFiltrados = recortes.filter((r) =>
    r.chave.toLowerCase().includes(busca.toLowerCase()) ||
    r.sku.toLowerCase().includes(busca.toLowerCase()) ||
    r.tipoRecorte.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <main className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <h1 className="text-lg sm:text-xl font-semibold">Peças Gerais</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded font-medium w-full sm:w-auto"
          onClick={() => router.push('/dashboard/pecas/nova')}
        >
          Adicionar peça
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button className="px-3 py-1 border rounded text-sm">Todos ({recortes.length})</button>
        <button className="px-3 py-1 border rounded bg-black text-white text-sm">
          Ativos ({recortes.filter(r => r.ativo).length})
        </button>
        <button className="px-3 py-1 border rounded text-sm">
          Expirados ({recortes.filter(r => !r.ativo).length})
        </button>
      </div>

      <div className="flex justify-end mb-4">
        <div className="flex w-full sm:w-auto gap-2">
          <input
            type="text"
            placeholder="Buscar"
            className="p-2 border rounded text-sm w-full sm:w-64"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-[640px] w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left font-medium text-gray-700">Imagem</th>
              <th className="p-3 text-left font-medium text-gray-700">Título</th>
              <th className="p-3 text-left font-medium text-gray-700">SKU</th>
              <th className="p-3 text-left font-medium text-gray-700">Tipo</th>
              <th className="p-3 text-left font-medium text-gray-700">Ordem</th>
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
