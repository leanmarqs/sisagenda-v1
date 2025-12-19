import { useState } from 'react'
import { createAppointment } from './../services/appointments'
import { notify } from '../services/toast'

export default function Index() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    location: '',
    start: '',
    end: ''
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleCreateEvent() {
    const promise = createAppointment({
      calendarId:
        'be397c14adf07b8a2192073f1657b59e6036ce31612f82a83819029a122cdd37@group.calendar.google.com',
      name: form.name,
      description: form.description,
      location: form.location,
      start: form.start,
      end: form.end
    })

    notify.promise(promise, {
      loading: 'Criando evento...',
      success: 'Evento criado com sucesso',
      error: 'Erro ao criar evento'
    })
  }

  return (
    <div className="max-w-md mx-auto space-y-2 p-4">
      <input name="name" placeholder="Título" onChange={handleChange} />
      <input name="description" placeholder="Descrição" onChange={handleChange} />
      <input name="location" placeholder="Local" onChange={handleChange} />
      <input type="datetime-local" name="start" onChange={handleChange} />
      <input type="datetime-local" name="end" onChange={handleChange} />

      <button onClick={handleCreateEvent}>
        Criar Evento
      </button>
    </div>
  )
}
