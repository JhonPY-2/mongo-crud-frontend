'use client';

import { useRouter } from "next/navigation";

export default function BotonesAccionDeporte({ id }) {
  const router = useRouter();

  async function manejarBorrar() {
    const confirmar = confirm('¿Seguro que quieres borrar el atleta?');
    if (!confirmar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/atletas/${id}`, {
        method: 'DELETE'
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo borrar el atleta');
      }

      router.push('/deportes');
      router.refresh();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex gap-4 mt-4">
      <button
        onClick={() => router.push(`/deportes/${id}/editar`)}
        className="bg-gold text-white px-6 py-2 rounded-lg font-semibold"
      >
        Editar
      </button>
      <button
        onClick={manejarBorrar}
        className="border border-secondary text-secondary px-6 py-2 rounded-lg font-semibold bg-transparent"
      >
        Borrar
      </button>
    </div>
  );
}