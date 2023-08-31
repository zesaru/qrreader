
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs'
import {cookies} from 'next/headers'
import { redirect } from "next/navigation";
import { type Database } from '../../types/database'
import SearchBox from '@/components/ui/searchbox';


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
        <SearchBox />
    </>
  );
}
