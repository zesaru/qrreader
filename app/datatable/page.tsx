"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { Contacts, columns } from "./columns"
import { DataTable } from "./data-table"




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

    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={contacts} />
    </div>


</div>
     );
}
 
export default Listado;