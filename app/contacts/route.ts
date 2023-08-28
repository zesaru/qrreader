import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const { id } = await request.json();

  console.log(id);
   const supabase = createRouteHandlerClient({ cookies });
   const data  = await supabase.from("contacts").update({ is_entered: true }).eq('id', id)
   .select()
   console.log(data);
  return NextResponse.json(data);
}