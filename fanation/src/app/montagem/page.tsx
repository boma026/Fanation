export default function MontagemPage() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Peças gerais</h1>
        <button className="bg-black text-white px-4 py-2 rounded">Adicionar peça</button>
      </div>

      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 border rounded">Todos (000)</button>
        <button className="px-3 py-1 border rounded bg-black text-white">Ativos (0)</button>
        <button className="px-3 py-1 border rounded">Expirados (0)</button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Buscar"
          className="w-1/3 p-2 border rounded"
        />
        <button className="bg-black text-white px-3 py-2 rounded">
          🔍
        </button>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Selecionar</th>
            <th className="p-2 text-left">Key</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Ordem de exibição</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">
                <input type="checkbox" />
              </td>
              <td className="p-2">Aba-frente-americano-tinho-azul_marinho</td>
              <td className="p-2">Americano</td>
              <td className="p-2">05</td>
              <td className="p-2">
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full">Ativo</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button className="bg-black text-white px-4 py-2 rounded">GERAR IMAGEM</button>
      </div>
    </main>
  );
}