export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] px-4">
      {/* Conteúdo principal centralizado */}
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm text-center">
          <img src="/Group.svg" alt="Fanation" className="mx-auto h-8 mb-3" />
          <h1 className="font-poppins text-2xl font-normal text-center leading-[120%] tracking-normal text-[#9A0FF1]">
            Bem-vindo ao Fanation
          </h1>
          <p className="text-base leading-[120%] text-[#212121] mt-1 tracking-normal text-center">
            Acesse a sua conta para iniciar
          </p>

          <div className="mt-6 text-left">
            <label
              htmlFor="senha"
              className="font-normal text-sm leading-none tracking-normal text-[#1C1C1C]"
            >
              Inserir senha
            </label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              className="mt-1 w-full border border-[#E5E5EA] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          <button className="w-full mt-4 bg-black text-white py-2 rounded-md hover:opacity-90">
            Acessar
          </button>
        </div>
      </main>

      {/* Rodapé fixado ao final da tela */}
      <footer className="text-center text-xs text-gray-400 py-4">
        Desenvolvido pela <span className="font-semibold">SeuBoné</span>
      </footer>
    </div>
  );
}
