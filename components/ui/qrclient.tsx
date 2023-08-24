"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QrScanner } from '@yudiel/react-qr-scanner';
import { useState } from 'react';
import { redirect } from 'next/navigation'
import { Contact } from '../../types/contacts';

async function fetchContacts(id: string) {
  const supabase = createClientComponentClient();
  
  if (!id || id === '' || id === undefined) {
    throw new Error('Invalid id parameter');
  }
  try {
    const data  = await supabase.from('contacts').select().eq('qr_code', id);
    console.log(data);
    return data ;
  } catch (error) {

    throw error;
  }
}
export default function ClientComponent<Contact>() {
  const [contact , setContact] = useState([]);

  const handleDecode = async (result: string) => {
    try {
      const contact = await fetchContacts(result);
      //const name = contacts![0].name as string | null;
      //const last_name = contacts![0].last_name as string | null;
      //const is_vip = contacts![0].is_vip as string | null;
      //const contactName = name + ' ' + last_name;
      //setContact(contacts![0]);
      console.log('------------------------------')
      console.log(contact)
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: { message: any; }) => {
    console.log(error?.message);
  };

  const handleClick = () => {
    setContact([]);
    redirect('/todos');
  };

  return (
  <>
    <div className='w-full lg:w-1/2'>
    <h1 className='text-4xl text-center'>Scan QR Code</h1>
    <QrScanner
      onDecode={handleDecode}
      onError={handleError}
    />
    </div>
   
   {contact === undefined  && <> Poker Face</>}
   
   <div>
    <p className='text-2xl p-4'>Name: </p>
      <button className='bg-green-600 p-4 white font-bold text-white' onClick={handleClick}>Back</button>
   </div>
    
    <div>
      <p className='text-2xl p-4'>No contact found</p>
    </div>
    

  </>
  );
}
