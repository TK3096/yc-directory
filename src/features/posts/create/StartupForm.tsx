/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useActionState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { toast } from 'sonner'
import { z } from 'zod'
import { useRouter } from 'next/navigation'

import { Send } from 'lucide-react'

import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import { schema } from '@/lib/validation'
import { createPitch } from '@/lib/actions'

export const StartupForm: React.FC = () => {
  const router = useRouter()

  const [pitch, setPitch] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        category: formData.get('category') as string,
        link: formData.get('link') as string,
        pitch,
      }

      await schema.parseAsync(formValues)

      const result = await createPitch(prevState, formData, pitch)

      if (result.status === 'SUCCESS') {
        toast.success('Your startup pitch has been created successfully')

        router.push(`/startup/${result._id}`)
      }

      return result
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors

        setErrors(fieldErrors as unknown as Record<string, string>)

        toast.error('Please check your input and try again')

        return { ...prevState, status: 'ERROR', error: 'Validation Error' }
      }

      toast.error('An unexpected error has occurred')

      return {
        ...prevState,
        status: 'ERROR',
        error: 'An unexpected error has occurred',
      }
    }
  }

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: '',
    status: 'INITIAL',
  })

  return (
    <form action={formAction} className='startup-form'>
      <div>
        <label htmlFor='title' className='startup-form_label'>
          Title
        </label>
        <Input
          id='title'
          name='title'
          className='startup-form_input'
          required
          placeholder='Startup Title'
        />

        {errors.title && <p className='startup-form_error'>{errors.title}</p>}
      </div>

      <div>
        <label htmlFor='description' className='startup-form_label'>
          Description
        </label>
        <Textarea
          id='description'
          name='description'
          className='startup-form_textarea'
          required
          placeholder='Startup Description'
        />

        {errors.description && (
          <p className='startup-form_error'>{errors.description}</p>
        )}
      </div>

      <div>
        <label htmlFor='category' className='startup-form_label'>
          Category
        </label>
        <Input
          id='category'
          name='category'
          className='startup-form_input'
          required
          placeholder='Startup Category (Tech, Health, etc.)'
        />

        {errors.category && (
          <p className='startup-form_error'>{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor='link' className='startup-form_label'>
          Image URL
        </label>
        <Input
          id='link'
          name='link'
          className='startup-form_input'
          required
          placeholder='Startup Image URL'
        />

        {errors.link && <p className='startup-form_error'>{errors.link}</p>}
      </div>

      <div data-color-mode='light'>
        <label htmlFor='pitch' className='startup-form_label'>
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id='pitch'
          preview='edit'
          height={300}
          style={{ borderRadius: 20, overflow: 'hidden' }}
          textareaProps={{
            placeholder: 'Describe your idea',
          }}
          previewOptions={{
            disallowedElements: ['style'],
          }}
        />

        {errors.pitch && <p className='startup-form_error'>{errors.pitch}</p>}
      </div>

      <Button
        type='submit'
        disabled={isPending}
        className='startup-form_btn text-white cursor-pointer'
      >
        {isPending ? 'Submitting...' : 'Submit Your Pitch'}
        <Send className='size-6 ml-2' />
      </Button>
    </form>
  )
}
