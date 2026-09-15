'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const poolHabilidades = ['Velocidad', 'Fuerza', 'Defensa', 'Agilidad', 'Técnica', 'Resistencia', 'Potencia'];

export default function NuevoDeporte() {
  const router = useRouter();

  const [formulario, setFormulario] = useState({
    nombre: '',
    equipo: '',
    logros: '',
    posicion: ''
  });

  const [estadisticas, setEstadisticas] = useState(['Regate', 'Velocidad', 'Resistencia']);
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  function manejarCambio(evento) {
    setFormulario({
      ...formulario,
      [evento.target.name]: evento.target.value
    });
  }

  function agregarEstadistica() {
    const siguiente = poolHabilidades.find((h) => !estadisticas.includes(h));
    if (siguiente) {
      setEstadisticas([...estadisticas, siguiente]);
    }
  }

  function quitarEstadistica(indice) {
    setEstadisticas(estadisticas.filter((_, i) => i !== indice));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const respuesta = await fetch('http://localhost:3000/atletas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formulario.nombre,
          equipo: formulario.equipo,
          logros: formulario.logros,
          posicion: formulario.posicion,
          estadisticas
        })
      });

      if (!respuesta.ok) {
        throw new Error('No se pudo crear el atleta');
      }

      router.push('/deportes');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="min-h-screen bg-navy p-8">
      <h1 className="font-title text-3xl font-bold text-white mb-8">Nuevo Atleta</h1>

      <div className="flex flex-col md:flex-row items-start gap-8">
        <form onSubmit={manejarEnvio} className="space-y-4 w-full max-w-md">
          <div>
            <label className="block text-gray-300 mb-1">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Ej. Lionel Messi"
              required
              className="bg-white rounded-lg p-2.5 w-full text-ink placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Equipo</label>
            <input
              type="text"
              name="equipo"
              value={formulario.equipo}
              onChange={manejarCambio}
              placeholder="Ej. Inter Miami"
              required
              className="bg-white rounded-lg p-2.5 w-full text-ink placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Logros</label>
            <input
              type="text"
              name="logros"
              value={formulario.logros}
              onChange={manejarCambio}
              placeholder="Ej. 8 Balones de Oro"
              className="bg-white rounded-lg p-2.5 w-full text-ink placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Posición</label>
            <input
              type="text"
              name="posicion"
              value={formulario.posicion}
              onChange={manejarCambio}
              placeholder="Ej. Delantero"
              className="bg-white rounded-lg p-2.5 w-full text-ink placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-2">Estadísticas</label>
            <div className="flex flex-wrap items-center gap-2">
              {estadisticas.map((est, i) => (
                <span
                  key={`${est}-${i}`}
                  className="inline-flex items-center gap-1 bg-skill text-white text-sm rounded-full px-3 py-1"
                >
                  {est}
                  <button
                    type="button"
                    onClick={() => quitarEstadistica(i)}
                    className="ml-1 text-gray-400 hover:text-white text-xs"
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                type="button"
                onClick={agregarEstadistica}
                className="w-7 h-7 rounded-full bg-gold text-white flex items-center justify-center text-sm font-bold shrink-0"
              >
                +
              </button>
            </div>
          </div>

          {error && <p className="text-red-400">{error}</p>}

          <div className="flex items-center gap-6 pt-2">
            <button
              type="submit"
              disabled={enviando}
              className="bg-gold text-white font-semibold px-6 py-2 rounded-lg disabled:opacity-50"
            >
              {enviando ? 'Guardando...' : 'Guardar'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="text-secondary hover:text-gray-300 px-2 py-2"
            >
              Cancelar
            </button>
          </div>
        </form>

        <div className="hidden md:flex w-80 h-80 bg-surface-alt rounded-2xl items-center justify-center shrink-0">
          <p className="text-secondary">Subir foto</p>
        </div>
      </div>
    </main>
  );
}