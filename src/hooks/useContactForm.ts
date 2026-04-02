import { useState } from 'react'
import type { ContactFormData } from '../utils/api'
import { submitContactForm } from '../utils/api'

export interface ContactFormState {
  isLoading: boolean
  error: string | null
  success: boolean
  message: string | null
}

export function useContactForm() {
  const [formState, setFormState] = useState<ContactFormState>({
    isLoading: false,
    error: null,
    success: false,
    message: null,
  })

  const resetForm = () => {
    setFormState({
      isLoading: false,
      error: null,
      success: false,
      message: null,
    })
  }

  const submitForm = async (data: ContactFormData) => {
    setFormState({ isLoading: true, error: null, success: false, message: null })

    try {
      const response = await submitContactForm(data)

      if (response.success) {
        setFormState({
          isLoading: false,
          error: null,
          success: true,
          message: response.message || 'Message sent successfully!',
        })

        // Auto reset after 5 seconds
        setTimeout(() => {
          resetForm()
        }, 5000)
      } else {
        throw new Error(response.error || 'Failed to send message')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      setFormState({
        isLoading: false,
        error: errorMessage,
        success: false,
        message: null,
      })
    }
  }

  return {
    ...formState,
    submitForm,
    resetForm,
  }
}


