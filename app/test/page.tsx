'use server'

import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import QrClient from '../../components/ui/qrclient';
import { redirect } from "next/navigation";
import { type Database } from '../../types/database'

export default async function ClientComponent() {
    const supabase = createServerComponentClient<Database>({cookies})

    const {
        data: { user },
      } = await supabase.auth.getUser()
    
      if (!user) {
        // This route can only be accessed by authenticated users.
        // Unauthenticated users will be redirected to the `/login` route.
        redirect('/login')
      }

  return (
    <>
        <QrClient />
    </>
  );
}
