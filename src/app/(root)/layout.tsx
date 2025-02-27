import { Navbar } from '@/components/navigator/Navbar'

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className='font-work-sans'>
      <Navbar />
      {children}
    </main>
  )
}

export default RootLayout
