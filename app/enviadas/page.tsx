"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { redirect } from 'next/navigation'



async function fetchContacts(id: string) {
  const supabase = createClientComponentClient();
  
  if (!id || id === '' || id === undefined) {
    throw new Error('Invalid id parameter');
  }
  try {
    console.log('id'+id) 
    const { data } = await supabase.from('contacts').select().eq('qr_code', id);
    const  send  = await supabase.from('contacts').update({ is_invited: true }).eq('qr_code', id)
    .select()
    console.log(send)
    return data;
  } catch (error) {

    throw error;
  }
}
export default function ClientComponent() {
  const [name , setName] = useState('');

  const handleDecode = async (result: any) => {
    try {
      const contacts = await fetchContacts(result);
      const name = contacts![0].name as string | null;
      const last_name = contacts![0].last_name as string | null;
      const contactName = name + ' ' + last_name;
      setName(contactName!);
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: { message: any; }) => {
    console.log(error?.message);
  };

  const handleClick = () => {
    setName('');
    redirect('/enviadas');
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
    : <>
    <p className='text-2xl p-4'>Name: {name}</p>
      <button className='bg-green-600 p-4 white font-bold text-white' onClick={handleClick}>Back</button>
    </>

  }
  </>
  );
}
