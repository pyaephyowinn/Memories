import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || "";

export async function uploadImage(file: File) {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.storage
    .from("property-images")
    .upload(`${Date.now()}-${file.name}`, file);

  if (error) {
    throw error;
  }

  const url = supabase.storage.from("property-images").getPublicUrl(data.path);
  return url.data.publicUrl;
}
