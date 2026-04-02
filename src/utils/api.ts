export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
}

export interface ContactResponse {
  success?: boolean
  message?: string
  error?: string
  debug?: string
}

const API_BASE_URL = import.meta.env.DEV ? 'http://localhost:4307' : ''

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const result = (await response.json()) as ContactResponse

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit contact form')
    }

    return result
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
    throw new Error(errorMessage)
  }
}

export async function checkServerHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`)
    return response.ok
  } catch {
    return false
  }
}

