"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { type Contact } from "../../types/contacts";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ContactsTable({
  contacts,
}: {
  contacts: Contact[] | null;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    const channel = supabase
      .channel("realtime contacts")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contacts",
        },
        () => {
          router.refresh();

          return () => {
            supabase.removeChannel(channel);
          };
        }
      )
      .subscribe();
  }, [supabase, router]);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-around	text-normal text-gray-700 uppercase px-2">
          <div className="px-1 text-base">VIP <span className="font-semibold">{contacts?.filter((contact) => contact.is_vip).length}</span></div>
          <div className="px-1 text-base">NO VIP <span className="font-semibold">{contacts?.filter((contact) => !contact.is_vip).length}</span></div>
          <div className="px-1 text-base">TOTAL <span className="font-semibold">{contacts?.length}</span></div>

        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts?.map((contact) => {
              return (
                <tr
                  key={contact.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-1 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <div className="pl-1">
                      <div className="flex items-center">
                        <div className="font-normal text-sm h-2.5 w-2.5 rounded-full bg-green-500"></div>
                        <div className="text-sm flex my-1 ">
                          {contact.vocative} {contact.name?.split(" ", 1)} {contact.last_name?.split(" ", 1)}
                        </div>
                        <div className="text-sm text-red-700">{contact.is_vip && "VIP"}</div>
                      </div>
                      <div className="font-normal text-gray-500 ">
                        {contact.organization}
                      </div>
                    </div>
                  </th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
