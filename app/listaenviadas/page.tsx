"use client"

import {
    createServerActionClient,
    createServerComponentClient,
  } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';


interface Contacts {
	id: string;
    vocative: string;
	name: string;
	last_name: string;
    organization: string;
    title: string;
	is_vip: boolean;
	is_invited: boolean;
    qr_code: string;	
    invitation_date: string;
}



const Listado = () => {
    const supabase = createClientComponentClient();
    const [contacts, setContacts] = useState<Contacts[]>([]);


    	// Get all data from the contacts table where is_invited is true
	const loadContacs = async () => {
		let { data } = await supabase
			.from('contacts')
			.select('*')
            .eq('is_invited', true)
			.order('invitation_date', { ascending: false });
		setContacts(data || []);
	};

    useEffect(() => {
		loadContacs();
	}, []);

    return ( 
<div className="flex flex-col">
<p>{contacts.length}</p>
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden"></div>        
        <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                    <th scope="col" className="px-6 py-4">Invitation date</th>
                    <th scope="col" className="px-6 py-4">VIP</th>
                    <th scope="col" className="px-6 py-4">Name</th>                    
                    <th scope="col" className="px-6 py-4">Organization</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700" key={contact.qr_code}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{contact.invitation_date }</td>
                        <td className="whitespace-nowrap px-6 py-4 bg-green-700 text-white font-medium">{contact.is_vip ? 'Yes' : 'No'}</td>
                        <td className="whitespace-nowrap px-6 py-4">{contact.vocative} {contact.name} {contact.last_name}</td>
                        <td className="whitespace-nowrap px-6 py-4">{contact.organization}</td>
                        
                    </tr>
                ))}
            </tbody>
                
            
        </table>
</div>
</div>
</div>
     );
}
 
export default Listado;<p>Hi</p>