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

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Peças Gerais</h1>
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={() => router.push('/dashboard/pecas/nova')}
        >
          Adicionar peça
        </button>
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
          {isLoading ? (
            <tr>
              <td className="p-2" colSpan={5}>Carregando...</td>
            </tr>
          ) : recortes.length === 0 ? (
            <tr>
              <td className="p-2" colSpan={5}>Nenhum recorte encontrado.</td>
            </tr>
          ) : (
            recortes.map((recorte) => (
              <tr
                key={recorte.id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => handleRowClick(recorte.id)}  // 👈 Aqui faz o redirecionamento
              >
                <td className="p-2">{recorte.chave}</td>
                <td className="p-2">{recorte.sku}</td>
                <td className="p-2">{recorte.tipoRecorte}</td>
                <td className="p-2">{recorte.ordemExibicao}</td>
                <td className="p-2">
                  {recorte.ativo ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                      Ativo
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                      Inativo
                    </span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}
