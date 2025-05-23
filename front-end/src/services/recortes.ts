export interface FormDataRecorte {
  nomeModelo: string;
  ordemExibicao: number;
  sku: string;
  tipoRecorte: string;
  tipoProduto: string;
  material: string;
  cor: string;
  imagemUrl: string;
  ativo: boolean;
}

export async function createRecorte(data: FormDataRecorte, token?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recortes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Erro ao criar recorte');
  }

  return await res.json();
}

export async function updateRecorte(id: string, data: FormDataRecorte, token?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recortes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Erro ao atualizar recorte');
  }

  return await res.json();
}
