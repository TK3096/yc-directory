import Image from 'next/image'
import Link from 'next/link'
import { auth, signIn, signOut } from '@/auth'

export const Navbar: React.FC = async () => {
  const session = await auth()

  const handleSignOut = async () => {
    'use server'

    await signOut()
  }

  const handleSignIn = async () => {
    'use server'

    await signIn('github')
  }

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.png' alt='logo' width={144} height={30} />
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session && session?.user ? (
            <>
              <Link href='/startup/create'>
                <span>Create</span>
              </Link>

              <form action={handleSignOut}>
                <button type='submit' className='cursor-pointer'>
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form action={handleSignIn}>
              <button type='submit' className='cursor-pointer'>
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}
