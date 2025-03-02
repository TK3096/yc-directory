import { SearchForm } from '@/features/posts/search/SearchForm'
import { StartupCard, type StartupTypeCard } from '@/features/posts/StartupCard'

interface Props {
  searchParams: Promise<{ query?: string }>
}

export default async function Home(props: Props) {
  const { searchParams } = props

  const query = (await searchParams).query

  const posts = [
    {
      createdAt: '2021-09-01T00:00:00.000Z',
      views: 22,
      author: {
        id: 1,
        name: 'Author',
        image:
          'https://images.unsplash.com/photo-1727466943994-911d391dddb1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      id: 1,
      description: 'This is a description',
      image:
        'https://images.unsplash.com/photo-1727466943994-911d391dddb1?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'Technology',
      title: 'Startup Name',
    },
  ]

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
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post.id} post={post} />
            ))
          ) : (
            <p className='no-results'>No startups found</p>
          )}
        </ul>
      </section>
    </>
  )
}
