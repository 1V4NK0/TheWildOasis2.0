import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log("cabins could not be loaded");
    throw new Error(error);
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  // If the image is already a URL, don't generate a new imagePath or imageName
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // Generate a new image name only if it's a file (i.e., not an image URL)
  const imageName =
    !hasImagePath && newCabin.image
      ? `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "")
      : null;

  // Construct the image path only for new images
  const imagePath = imageName
    ? `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`
    : hasImagePath
    ? newCabin.image // Use the existing image path
    : null;

  // 1. Create/edit a cabin
  let query = supabase.from("cabins");

  // No ID means creating a new cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // ID means editing the cabin
  if (id)
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log("Cabin could not be created or updated");
    throw new Error(error);
  }

  // 2. Upload the image to the bucket (only if it's a new image)
  if (!hasImagePath && newCabin.image) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there was an error uploading the image
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error("Cabin image could not be uploaded");
    }
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
