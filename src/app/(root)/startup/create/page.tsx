import React from 'react'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'

import { StartupForm } from '@/features/posts/create/StartupForm'

const Page = async () => {
  const session = await auth()

  if (!session) redirect('/')

  return (
    <>
      <section className='pink_container pattern !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  )
}

export default Page
