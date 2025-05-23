'use client'; 

import { useState } from 'react'; 

export default function Home() {

  // Armazenar a senha digitada
  const [senha, setSenha] = useState('');

  // Armazenar mensagens de erro
  const [erro, setErro] = useState('');

  // Função que será chamada ao clickar em acessar
  const handleLogin = async () => {
    setErro(''); 
    try {

      // Envia uma requisição POST para o back de autenticação
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Envia a senha como JSON no corpo da requisição
        body: JSON.stringify({ senha }),
      });

      const data = await res.json(); // Converte a resposta em JSON

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token); // Salva o token no localStorage
        window.location.href = '/dashboard'; // Redireciona o usuário para o dashboard
      } 
      else {
        setErro(data.error || 'Falha no login');
      }
    } catch (err) {
      console.error(err); 
      setErro('Erro ao conectar com o servidor'); 
    }
  };

  return (
    <div className="flex flex-col min-h-screen px-4">
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-sm text-center">

          {/* Logo com svg e mensagem de boas-vindas */}
          <img src="/Group.svg" alt="Fanation" className="mx-auto h-8 mb-3" />
          <h1 className="font-poppins text-2xl font-semibold text-[#9A0FF1]">
            Bem-vindo ao Fanation
          </h1>
          <p className="text-base text-[#212121] mt-1">
            Acesse a sua conta para iniciar
          </p>

          {/* Campo da senha */}
          <div className="mt-6 text-left">
            <label htmlFor="senha" className="text-sm text-[#1C1C1C]">
              Inserir senha
            </label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)} // Atualiza o estado da senha
              placeholder="Digite sua senha"
              className="mt-1 w-full border border-[#E5E5EA] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {/* Exibição de erro caso tenha */}
          {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}

          {/* Botão para acessar */}
          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-black text-white py-2 rounded-md hover:opacity-90"
          >
            Acessar
          </button>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="text-center text-xs text-gray-400 py-4">
        Desenvolvido pela <span className="font-semibold">SeuBoné</span>
      </footer>
    </div>
  );
}
