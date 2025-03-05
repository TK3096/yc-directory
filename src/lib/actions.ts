/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth } from '@/auth'
import { writeClient } from '@/sanity/lib/write-client'
import slugify from 'slugify'

import { parseServerActionResponse } from '@/lib/utils'

export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth()

  if (!session) {
    return parseServerActionResponse({
      error: 'Not signed in',
      status: 'ERROR',
    })
  }

  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== 'pitch'),
  )
  const slug = slugify(title as string, { lower: true, strict: true })

  try {
    const payload = {
      title,
      description,
      category,
      image: link,
      views: 0,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: 'reference',
        _ref: session?.id,
      },
      pitch,
    }

    const result = await writeClient.create({ _type: 'startup', ...payload })

    return parseServerActionResponse({
      ...result,
      error: '',
      status: 'SUCCESS',
    })
  } catch (error) {
    console.log(error)

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: 'ERROR',
    })
  }
}
