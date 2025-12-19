import { api } from './api'

export interface AppointmentPayload {
  name: string
  date: string
}

export interface AppointmentResponse {
  id: string
  name: string
  date: string
}

export function createAppointment(data: AppointmentPayload) {
  return api<AppointmentResponse, AppointmentPayload>(
    '/appointments',
    {
      method: 'POST',
      body: data
    }
  )
}
