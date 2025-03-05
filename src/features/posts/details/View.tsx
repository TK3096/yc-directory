import React from 'react'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { after } from 'next/server'

import { Ping } from '@/features/posts/details/Ping'
import { writeClient } from '@/sanity/lib/write-client'

interface Props {
  id: string
}

export const View: React.FC<Props> = async (props: Props) => {
  const { id } = props

  const result = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id })

  const views = result?.views ?? 0

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: views + 1 })
        .commit(),
  )

  return (
    <div className='view-container'>
      <div className='absolute -top-2 -right-2'>
        <Ping />
      </div>

      <p className='view-text'>
        <span className='font-black'>Views: {views}</span>
      </p>
    </div>
  )
}
