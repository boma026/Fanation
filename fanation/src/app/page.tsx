export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4">
      <div className="w-full max-w-sm text-center">
        <img src="/logo.svg" alt="Fanation" className="mx-auto h-8 mb-4" />
        <h1 className="text-xl font-semibold text-purple-700">Bem-vindo ao Fanation</h1>
        <p className="text-sm text-gray-700 mt-1">Acesse a sua conta para iniciar</p>

        <div className="mt-6 text-left">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
            Inserir senha
          </label>
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            className="mt-1 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button className="w-full mt-4 bg-black text-white py-2 rounded-md hover:opacity-90">
          Acessar
        </button>

        <footer className="text-xs text-gray-400 mt-10">
          Desenvolvido pela <span className="font-semibold">SeuBoné</span>
        </footer>
      </div>
    </div>
  );
}