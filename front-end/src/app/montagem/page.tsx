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

export default function MontagemPage() {
  const [recortes, setRecortes] = useState<Recorte[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selecionados, setSelecionados] = useState<string[]>([]);
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

        if (!res.ok) throw new Error(`Erro ao buscar recortes: ${res.status}`);
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error('Formato de resposta inválido');
        console.log('Recortes:', data);
        setRecortes(data);
      } catch {
        setRecortes([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRecortes();
  }, []);

  function toggleSelecionado(id: string) {
    setSelecionados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleGerarImagem() {
    const selecionadosRecortes = recortes.filter((r) => selecionados.includes(r.id));

    if (selecionadosRecortes.length !== 3) {
      alert('Selecione exatamente 3 peças.');
      return;
    }

    const ordens = selecionadosRecortes.map((r) => r.ordemExibicao);
    const ordensUnicas = new Set(ordens);

    if (ordensUnicas.size !== 3) {
      alert('As 3 peças devem ter ordens de exibição diferentes.');
      return;
    }

    // Salvar no localStorage antes de redirecionar
    const pecasSelecionadas = selecionadosRecortes.map((r) => ({
      id: r.id,
      chave: r.chave,
      ordemExibicao: r.ordemExibicao,
      imagemUrl: r.imagemUrl,
    }));
    localStorage.setItem('pecasSelecionadas', JSON.stringify(pecasSelecionadas));

    const modeloid = selecionadosRecortes[0].nomeModelo;
    router.push(`/montagem/${modeloid}`);
  }

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Peças gerais</h1>
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
          Ativos ({recortes.filter((r) => r.ativo).length})
        </button>
        <button className="px-3 py-1 border rounded">
          Expirados ({recortes.filter((r) => !r.ativo).length})
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="w-1/3 p-2 border rounded"
        />
        <button className="bg-black text-white px-3 py-2 rounded">🔍</button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Selecionar</th>
            <th className="p-2 text-left">Imagem</th>
            <th className="p-2 text-left">Key</th>
            <th className="p-2 text-left">Modelo</th>
            <th className="p-2 text-left">Ordem de exibição</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td className="p-2" colSpan={6}>Carregando...</td>
            </tr>
          ) : recortes.length === 0 ? (
            <tr>
              <td className="p-2" colSpan={6}>Nenhum recorte encontrado.</td>
            </tr>
          ) : (
            recortes.map((recorte) => (
              <tr key={recorte.id} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selecionados.includes(recorte.id)}
                    onChange={() => toggleSelecionado(recorte.id)}
                  />
                </td>
                <td className="p-2">
                  {recorte.imagemUrl ? (
                    <img
                      src={recorte.imagemUrl}
                      alt={recorte.chave}
                      className="w-16 h-16 object-contain rounded border"
                    />
                  ) : (
                    <span className="text-gray-400">Sem imagem</span>
                  )}
                </td>
                <td className="p-2">{recorte.chave}</td>
                <td className="p-2">{recorte.nomeModelo}</td>
                <td className="p-2">
                  {recorte.ordemExibicao.toString().padStart(2, '0')}
                </td>
                <td className="p-2">
                  {recorte.ativo ? (
                    <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Ativo</span>
                  ) : (
                    <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">Inativo</span>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleGerarImagem}
        >
          GERAR IMAGEM
        </button>
      </div>
    </main>
  );
}
