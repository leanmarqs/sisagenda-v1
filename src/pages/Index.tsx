import { notify } from './../services/toast'
import { createAppointment } from './../services/appointments'

export default function Index() {
  async function handleCreate() {
    const promise = createAppointment({
      name: 'Consulta João',
      date: '2025-01-10'
    })

    notify.promise(promise, {
      loading: 'Salvando agendamento...',
      success: 'Agendamento criado com sucesso',
      error: 'Erro ao criar agendamento'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleCreate}
        className="px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Criar Agendamento
      </button>
    </div>
  )
}
