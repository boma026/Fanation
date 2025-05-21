'use client';

import { useState } from 'react';

export default function Home() {
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    setErro('');
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senha }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard'; // Redireciona após login
      } else {
        setErro(data.error || 'Falha no login');
      }
    } catch (err) {
      console.error(err);
      setErro('Erro ao conectar com o servidor');
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] px-4">
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
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="mt-1 w-full border border-[#E5E5EA] rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>

          {erro && <p className="text-red-500 text-sm mt-2">{erro}</p>}

          <button
            onClick={handleLogin}
            className="w-full mt-4 bg-black text-white py-2 rounded-md hover:opacity-90"
          >
            Acessar
          </button>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-400 py-4">
        Desenvolvido pela <span className="font-semibold">SeuBoné</span>
      </footer>
    </div>
  );
}