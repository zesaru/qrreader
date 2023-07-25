"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';

async function fetchContacts(id: string) {
  const supabase = createClientComponentClient();
  
  if (!id || id === '' || id === undefined) {
    throw new Error('Invalid id parameter');
  }
  try {
    console.log('id'+id) 
    const { data } = await supabase.from('contacts').select().eq('qr_code', id);
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default function ClientComponent() {
  const [name , setName] = useState('');

  const handleDecode = async (result: any) => {
    try {
      const contacts = await fetchContacts(result);
      const contactName = contacts![0].name as string | null;
      setName(contactName!);
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: { message: any; }) => {
    console.log(error?.message);
  };

  return (
  <>
    { name === '' ? 
    <div className='w-full lg:w-1/2'>
    <h1 className='text-4xl text-center'>Scan QR Code</h1>
    <QrScanner
      onDecode={handleDecode}
      onError={handleError}
    />
    </div>
    : <p className='text-2xl'>Name: {name}</p>
  }
  </>
  );
}
