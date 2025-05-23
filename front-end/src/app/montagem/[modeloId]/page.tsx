'use client';

import { useEffect, useState } from 'react';

interface PecaSelecionada {
  id: string;
  chave: string;
  ordemExibicao: number;
  imagemUrl: string;
}

export default function DetalheMontagemPage() {
  const [pecas, setPecas] = useState<PecaSelecionada[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('pecasSelecionadas');
    if (data) {
      const parsed = JSON.parse(data) as PecaSelecionada[];
      const ordenadas = parsed.sort((a, b) => a.ordemExibicao - b.ordemExibicao);
      setPecas(ordenadas);
    }
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-lg font-medium mb-2">Modelo Americano</h1>
      <p className="text-sm text-gray-500 mb-4">1 de abr. de 2023, 00:03 de FANATION</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ORDEM */}
        <div>
          <h2 className="font-semibold mb-2">ORDEM</h2>
          <div className="border rounded p-2">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-1">Key</th>
                  <th className="text-left p-1">Ordem</th>
                </tr>
              </thead>
              <tbody>
                {pecas.map((peca, i) => (
                  <tr key={i}>
                    <td className="p-1">{peca.chave}</td>
                    <td className="p-1">0{peca.ordemExibicao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MONTAGEM */}
        <div>
          <h2 className="font-semibold mb-2">IMAGEM</h2>
          <div className="border rounded p-4 flex justify-center items-center h-52 relative overflow-hidden bg-white">
            {pecas.map((peca, i) => (
              <img
                key={peca.id}
                src={peca.imagemUrl}
                alt={`Camada ${peca.ordemExibicao}`}
                className="absolute max-h-48 object-contain"
                style={{ zIndex: i + 1 }}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}