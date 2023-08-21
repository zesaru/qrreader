import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import LogoutButton from '../components/LogoutButton'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>


            {user ? (
              <div className="flex items-center gap-4">
                Hey, {user.email}!
                <LogoutButton />
              </div>
            ) : (
              <Link 
                href="/login"
                className="py-2 px-4 rounded-md no-underline hover:bg-btn-background-hover bg-slate-800 text-white"
              >
                Login
              </Link>
            )}
    </main>
  )
}
