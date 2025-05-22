'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import RecorteForm from '@/components/RecorteForm';
import { FormDataRecorte } from '@/services/recortes';

export default function EditarPecaPage() {
  const router = useRouter();
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [recorte, setRecorte] = useState<FormDataRecorte | null>(null);

  useEffect(() => {
    async function fetchRecorte() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recortes/${id}`);
        const data = await response.json();
        setRecorte(data);
      } catch (error) {
        console.error('Erro ao buscar recorte:', error);
      }
    }

    if (id) {
      fetchRecorte();
    }
  }, [id]);

  const handleSubmit = async (data: FormDataRecorte) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/recortes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }, 
        body: JSON.stringify(data),
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Erro ao atualizar recorte:', error);
    }
  };

  if (!recorte) return <p className="p-4">Carregando...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Editar Peça</h1>
      <RecorteForm initialData={recorte} onSubmit={handleSubmit} />
    </div>
  );
}
