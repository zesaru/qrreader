"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';


interface Contacts {
	id: string;
    vocative: string;
	name: string;
	last_name: string;
    organization: string;
	is_vip: boolean;
	is_invited: boolean;
    qr_code: string;	
    
}



const Listado = () => {
    const supabase = createClientComponentClient();
    const [contacts, setContacts] = useState<Contacts[]>([]);


    	// Get all data from the contacts table where is_invited is true
	const loadContacs = async () => {
		let { data } = await supabase
			.from('contacts')
			.select('*')
            .eq('is_invited', true);
			//.order('inserted_at', { ascending: false });
		setContacts(data || []);
	};

    useEffect(() => {
		loadContacs();
	}, []);

    return ( 
        <table>
            <thead>
                <tr>
                    <th>Vocative</th>
                    <th>Name</th>
                    <th>Last Name</th>
                    <th>QR Code</th>
                </tr>
            </thead>
            <tbody>
                {contacts.map((contact) => (
                    <tr key={contact.qr_code}>
                        <td>{contact.vocative}</td>
                        <td>{contact.name}</td>
                        <td>{contact.last_name}</td>
                        <td>{contact.qr_code}</td>
                    </tr>
                ))}
            </tbody>
                
            
        </table>

     );
}
 
export default Listado;<p>Hi</p>