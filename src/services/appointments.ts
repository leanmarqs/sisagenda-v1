const API_URL = import.meta.env.VITE_API_URL

type CreateAppointmentPayload = {
  calendarId: string
  name: string
  description: string
  location: string
  start: string
  end: string
}

export async function createAppointment(
  payload: CreateAppointmentPayload
) {
  const response = await fetch(`${API_URL}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    let message = 'Erro ao criar evento'
    try {
      const data = await response.json()
      message = data?.message ?? message
    } catch {
      // resposta sem corpo
    }
    throw new Error(message)
  }

  return response.json()
}
