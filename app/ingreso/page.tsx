import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import Contact from '../../components/ui/contact';

export default async function Index() {
    const supabase = createServerComponentClient({cookies})
    const {data:contacts } = await supabase.from('contacts').select('id, name, last_name')

    const {
        data: { user },
      } = await supabase.auth.getUser()
    
      if (!user) {
        // This route can only be accessed by authenticated users.
        // Unauthenticated users will be redirected to the `/login` route.
        redirect('/login')
      }

    return (


        <main className='flex min-h-screen flex-col items-center justify-between p-2'>
            <Contact />
            {/* <pre>
                {
                  JSON.stringify(contacts, null, 4)
                }
            </pre> */}
            
        </main>
    ) 
}
