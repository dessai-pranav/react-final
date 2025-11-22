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


export async function createEditCabin(newCabin,id){
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName =`${Math.random()}-${newCabin.image.name}`.replaceAll("/","")
    const imagePath = hasImagePath? newCabin : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    //1.cabin create
    //https://wcedrsnpfqbrpycdxzjy.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

    let query = supabase.from('cabins');
if(!id)
   query
        .insert([
            {...newCabin,image: imagePath},
        ])
    if(id)

       query.update( {...newCabin,image: imagePath},)
            .eq('id', id)
            .select()


    const {data,error} = await query.select()
         .single()
    if(error){
        console.error(error);
        throw new Error("Cabin Couldnt Be Created");
    }

    //2.uploadd image
    const {  error: storageError } = await supabase.storage
        .from('cabin-images')
        .upload(imageName, newCabin.image)

    //3. Delete the cabin if there was an error uplaoding corresponding image
    if(storageError){
        await supabase
            .from('cabins')
            .delete()
            .eq('id', data.id)
        console.error(storageError);
        throw new Error("Cabin image could not be uploaded ");
    }
    return data;
}

export  async function deleteCabin(id){

    const { data,error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id)
    if(error){
        console.error(error);
        throw new Error("cabins couldnt be deleted");
    }
    return data;

}

