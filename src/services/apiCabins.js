import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("cabins could not be loaded");
    throw new Error(error);
  }
  return data;
}

export async function deleteCabin(id) {
  const { data,error } = await supabase
    .from("cabins")
    .delete()
    .eq("id", id);

    if (error) {
      console.log("cabin could not be deleted");
      throw new Error(error);
    }
    return data;
}
