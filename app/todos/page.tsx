"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

async function fetchContacts(id) {
  const supabase = createClientComponentClient();
  const { data } = await supabase.from('contacts').select().eq('id', id);
  return data;
}

export default function ClientComponent() {
  const [name , setName] = useState('');

  const handleDecode = async (result) => {
    try {
      const contacts = await fetchContacts(result);
      setName(contacts[0].name);
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleError = (error) => {
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
