import React from 'react'
import { client } from '@/sanity/lib/client'

import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'

import { type StartupTypeCard, StartupCard } from '@/features/posts/StartupCard'

interface Props {
  id: string
}

export const UserStartups: React.FC<Props> = async (props: Props) => {
  const { id } = props

  const list = (await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {
    id,
  })) as StartupTypeCard[]

  return (
    <>
      {list.length > 0 ? (
        list.map((startup: StartupTypeCard) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <p className='no-result'>No posts yet</p>
      )}
    </>
  )
}
