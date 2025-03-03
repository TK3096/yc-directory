import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { STARTUPS_QUERY } from '@/sanity/lib/queries'
// import { client } from '@/sanity/lib/client'

import { SearchForm } from '@/features/posts/search/SearchForm'
import { StartupCard, type StartupTypeCard } from '@/features/posts/StartupCard'

interface Props {
  searchParams: Promise<{ query?: string }>
}

export default async function Home(props: Props) {
  const { searchParams } = props

  const query = (await searchParams).query

  // const posts = await client.fetch(STARTUPS_QUERY)
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY })

  return (
    <>
      <section className='pink_container pattern'>
        <h1 className='heading'>
          Pitch Your Startup, <br />
          Connect With Entrepreneurs
        </h1>

        <p className='sub-heading !max-w-3xl'>
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
          Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className='section_container'>
        <p className='text-30-semibold'>
          {query ? `Search results for "${query}"` : 'All Startups'}
        </p>

        <ul className='mt-7 card_grid'>
          {posts?.length > 0 ? (
            (posts as StartupTypeCard[]).map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  )
}
