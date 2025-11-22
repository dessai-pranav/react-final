import supabase, {supabaseUrl} from "./supabase.js";

export async function getCabins(){
    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if(error){
        console.error(error);
        throw new Error("cabins couldnt be loaded");
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    console.log("createEditCabin called with:", {newCabin, id});

    const hasImagePath = typeof newCabin.image === 'string' && newCabin.image?.startsWith?.(supabaseUrl);

    console.log("Has image path?", hasImagePath);
    console.log("Image type:", typeof newCabin.image);
    console.log("Image value:", newCabin.image);

    // Generate unique image name only if uploading new file
    const imageName = hasImagePath
        ? null
        : `${Math.random()}-${newCabin.image?.name || 'image'}`.replaceAll("/", "");

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    console.log("Image path to save:", imagePath);

    // 1. Create/edit cabin
    let query = supabase.from("cabins");

    // A) CREATE
    if (!id) {
        query = query.insert([{
            name: newCabin.name,
            maxCapacity: newCabin.maxCapacity,
            regularPrice: newCabin.regularPrice,
            discount: newCabin.discount,
            description: newCabin.description,
            image: imagePath
        }]);
    }

    // B) EDIT
    if (id) {
        query = query.update({
            name: newCabin.name,
            maxCapacity: newCabin.maxCapacity,
            regularPrice: newCabin.regularPrice,
            discount: newCabin.discount,
            description: newCabin.description,
            image: imagePath
        }).eq("id", id);
    }

    const { data, error } = await query.select().single();

    if (error) {
        console.error("Database error:", error);
        throw new Error("Cabin could not be created");
    }

    console.log("Cabin saved to database:", data);

    // 2. Upload image (skip if already exists)
    if (hasImagePath) {
        console.log("Image already exists, skipping upload");
        return data;
    }

    console.log("Uploading image to storage...");
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // 3. Delete the cabin IF there was an error uploading image
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.error("Storage error:", storageError);
        throw new Error("Cabin image could not be uploaded and the cabin was not created");
    }

    console.log("Image uploaded successfully");
    return data;
}

export async function deleteCabin(id){
    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if(error){
        console.error(error);
        throw new Error("cabins couldnt be deleted");
    }
    return data;
}