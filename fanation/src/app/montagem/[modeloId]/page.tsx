export default function DetalheMontagemPage() {
  return (
    <main className="p-6">
      <h1 className="text-lg font-medium mb-2">Modelo Americano</h1>
      <p className="text-sm text-gray-500 mb-4">1 de abr. de 2023, 00:03 de FANATION</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                {[...Array(3)].map((_, i) => (
                  <tr key={i}>
                    <td className="p-1">aba-frente-americano-tinho-azul_marinho</td>
                    <td className="p-1">0{i + 1}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h2 className="font-semibold mb-2">IMAGEM</h2>
          <div className="border rounded p-4 flex justify-center items-center">
            <img src="/exemplo-montagem.png" alt="Montagem" className="max-h-52" />
          </div>
        </div>
      </div>
    </main>
  );
}