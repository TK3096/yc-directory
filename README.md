source: https://github.com/adrianhajdin/yc_directory

create post with sanity

#### Tech Stack

- Nextjs version 15@canary
- sanity
- tailwindcss version 4
- shadcn
- next-auth version 5
- react-md-editor
- markdown-it

#### Features

- real time fetching data on homepage (ISR)
- fetch details as static and cache it, fetch number of view as SSR
- create new post with server action
- render markdown content with markdown-it
- create markdown content with react-md-editor

#### Note

- sanity use GROQ query language to query data (alternative of graphql)
- partial render in nextjs (experimental)
