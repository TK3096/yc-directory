import { SearchForm } from '@/components/search/SearchForm'

type Props = {
  searchParams: Promise<{ query?: string }>
}

export default async function Home(props: Props) {
  const { searchParams } = props

  const query = (await searchParams).query

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
    </>
  )
}
