"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

interface Contacts {
  id: string;
  created_at: Date;
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
  const tableRef = useRef(null);

  // Get all data from the contacts table where is_invited is true
  const loadContacs = async () => {
    let { data } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });
    setContacts(data || []);
  };

  useEffect(() => {
    loadContacs();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden"></div>
          <div>
            <DownloadTableExcel
              filename="users table"
              sheet="users"
              currentTableRef={tableRef.current}
            >
              <button> Export excel </button>
            </DownloadTableExcel>
            <table
              className="min-w-full text-left text-sm font-light"
              ref={tableRef}
            >
              <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-600">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    VIP
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Organization
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-4">
                    QR
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Invited
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Invitation date
                  </th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr
                    className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                    key={contact.qr_code}
                  >
                    <td className="whitespace-nowrap px-6 py-4 bg-green-700 text-white font-medium">
                      {contact.is_vip ? "Yes" : "No"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {contact.vocative} {contact.name} {contact.last_name}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {contact.title}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {contact.organization}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {contact.qr_code}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {contact.is_invited ? "true" : "false"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {contact.invitation_date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listado;
<p>Hi</p>;
