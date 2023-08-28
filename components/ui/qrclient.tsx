"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { redirect } from "next/navigation";
import { Contact } from "../../types/contacts";
import Link from "next/link";
import {updataContact } from "@/app/actions/update-contacts-action";

async function fetchContacts(id: string) {
  const supabase = createClientComponentClient();

  if (!id || id === "" || id === undefined) {
    throw new Error("Invalid id parameter");
  }
  try {
    const { data } = await supabase.from("contacts").select().eq("qr_code", id);
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
export default function ClientComponent() {
  const supabase = createClientComponentClient();

  const [contact, setContact] = useState({} as Contact[]);
  const [toglee, setToglee] = useState(true);

  const handleDecode = async (result: string) => {
    try {
      const contacts = await fetchContacts(result);
      setContact(contacts as Contact[]);
      setToglee(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleError = (error: { message: any }) => {
    console.log(error?.message);
  };
  const handleClick = () => {
    setContact({} as Contact[]);
    setToglee(true);
    redirect("/test");
  };

  const markAsEntered = async () => {
     await updataContact(contact[0].qr_code)
     setContact({} as Contact[]);
     setToglee(true);
     //redirect("/test");
  };
  
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>
      <div></div>
      {toglee && (
        <>
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl text-center">Scan QR Code</h1>
            <QrScanner onDecode={handleDecode} onError={handleError} />
          </div>
          <div>
            <p className="text-2xl p-4"> </p>
            <button
              className="bg-green-600 p-4 white font-bold text-white"
              onClick={handleClick}
            >
              Back
            </button>
          </div>
        </>
      )}

      {contact.length === 0 && (
        <>
          <div>
            <p className="text-2xl p-4">Invitado no encontrado</p>
          </div>
          <div>
            <p className="text-2xl p-4"> </p>
            <button
              className="bg-green-600 p-4 white font-bold text-white"
              onClick={handleClick}
            >
              Back
            </button>
          </div>
        </>
      )}
      {contact.length > 0 && !contact[0].is_entered && (
        <div>
          <p className="text-xl">
            {contact[0].vocative} {contact[0].name} {contact[0].last_name}
          </p>
          {contact[0].is_vip && (
            <span className="text-xl bg-green-600 text-white text-center p-1">
              VIP
            </span>
          )}
          <p className="text-xl"> {contact[0].organization}</p>
          <p className="text-xl"> {contact[0].title}</p>
          <p className="text-xl"> {contact[0].is_entered}</p>
          <p className="text-xl"> {contact[0].entered_num}</p>
          <div className="text-center">
            <button
              className="bg-green-600 p-4 white font-bold text-white"
              onClick={ markAsEntered }
            >
              Ingresar invitado
            </button>
          </div>
        </div>
      )}
      {contact.length > 0 && contact[0].is_entered && (
        <>
          {" "}
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-xl"> Alerta!</span> El invitado{" "}
            {contact[0].vocative} {contact[0].name} {contact[0].last_name} ya
            ingres
          </div>
          <div className="text-center">
            <p className="text-2xl p-4"> </p>
            <button
              className="bg-green-600 p-4 white font-bold text-white"
              onClick={handleClick}
            >
              Regresar a escanear otro codigo
            </button>
          </div>
        </>
      )}
    </div>
  );
}
