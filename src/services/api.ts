import { notify } from './toast'

const BASE_URL = import.meta.env.VITE_API_URL ?? ''

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

interface ApiOptions<T> {
  method?: HttpMethod
  body?: T
  headers?: HeadersInit
  silent?: boolean
}

/**
 * Generic HTTP client with centralized error handling
 */
export async function api<TResponse, TBody = unknown>(
  endpoint: string,
  options: ApiOptions<TBody> = {}
): Promise<TResponse> {
  const {
    method = 'GET',
    body,
    headers,
    silent = false
  } = options

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    let message = 'Erro inesperado na comunicação com o servidor'

    try {
      const data = await response.json()
      message = data?.message ?? message
    } catch (error) {
      console.warn(
        '[api] Failed to parse error response body',
        error
      )
    }

    if (!silent) {
      notify.error(message)
    }

    throw new Error(message)
  }

  return response.json() as Promise<TResponse>
}
