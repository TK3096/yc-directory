import React from 'react'
import Form from 'next/form'
import { Search } from 'lucide-react'

import { SearchFormReset } from '@/features/posts/search/SearchFormReset'

interface Props {
  query?: string
}

export const SearchForm: React.FC<Props> = (props: Props) => {
  const { query } = props

  return (
    <Form action='/' scroll={false} className='search-form'>
      <input
        name='query'
        defaultValue={query}
        className='search-input'
        placeholder='Search Startups'
      />

      <div className='flex gap-2'>
        {query && <SearchFormReset />}

        <button type='submit' className='search-btn text-white'>
          <Search className='size-5' />
        </button>
      </div>
    </Form>
  )
}
