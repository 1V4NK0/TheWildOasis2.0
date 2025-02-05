import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("cabins could not be loaded");
    throw new Error(error);
  }
  return data;
}

export async function createCabin(newCabin) {
  //each image has to be unique so we use random
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //1. create a cabin

  //https://kwchrcjifrvqpdxiktpw.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }]);

  if (error) {
    console.log("cabin could not be created");
    throw new Error(error);
  }
  //2. upload image to the bucket (storage)
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. delete cabin if there was an error uploading img
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError)
    throw new Error("cabin image could not be uploaded")
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("cabin could not be deleted");
    throw new Error(error);
  }
  return data;
}
