import { type Contact } from '../../types/contacts';

export default function ContactsTable( {contacts} : {contacts: Contact[] | null }) {

  return (
    <>


        
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
        {
          contacts?.map(contact => {
            return (
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th
              scope="row"
              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
            >
              <div className="pl-1">
                <div className="text-base font-semibold">{contact.vocative} {contact.name?.split(' ',1)} {contact.last_name?.split(' ',1)}</div>
                <div className="font-normal text-gray-500">
                  {contact.organization}
                </div>
              </div>
            </th>
            <td className="px-6 py-4">React Developer</td>
            <td className="px-6 py-4">
              <div className="flex items-center">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2" />{" "}
                Online
              </div>
            </td>
          </tr>
          )
          
          }
          )}
        </tbody>
      </table>
    </div>

      
    </>
  );
}
