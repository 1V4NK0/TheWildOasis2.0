import supabase from "./supabase";

export async function addNewGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest }])
    .select()
    .single();

  if (error) {
    console.log("New guest could not be created");
    throw new Error(error);
  }
  return data;
}
