'use server'

import { cookies } from 'next/headers'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'

export const updataContact = async (qr_code : string) => {
    
  const supabase = createServerActionClient({ cookies })

  await supabase.from('contacts').update({ is_entered: true, entered_at:(((new Date()).toISOString())) }).eq('qr_code', qr_code)

}