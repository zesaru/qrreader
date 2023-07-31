"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export type Contacts = {
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


export const columns: ColumnDef<Contacts>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "organization",
    header: "Organization",
  },
]
