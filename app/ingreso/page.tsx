'use server'

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'
import ContactsTables from '../../components/ui/contacts-table';
import { type Database } from '../../types/database'

export default async function Index() {
    const supabase = createServerComponentClient<Database>({cookies})
    const {data:contacts } = await supabase.from('contacts').select('*').eq('is_entered', true).order('is_vip', { ascending: false })
  
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
            <ContactsTables contacts={contacts}/>
        </main>
    ) 
}
