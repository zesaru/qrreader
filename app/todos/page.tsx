"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

async function fetchContacts(id: any) {
  const supabase = createClientComponentClient();
  const { data } = await supabase.from('contacts').select().eq('id', id);
  return data;
}

export default function ClientComponent() {
  const [name , setName] = useState('');

  const handleDecode = async (result: any) => {
    try {
      const contacts = await fetchContacts(result);
      const contactName = contacts[0]?.name as string | null;
      setName(contactName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: { message: any; }) => {
    console.log(error?.message);
  };

  return (
  <>
    <div className='w-1/2'>
    <QrScanner
      onDecode={handleDecode}
      onError={handleError}
    />
    </div>
    <p className='text-2xl'>Name: {name}</p>
  </>
  );
}
