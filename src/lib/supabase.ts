import { createClient,PostgrestError } from '@supabase/supabase-js';
import type {settingsData} from "../components/Panel/Settings/settingTypes.ts"
import type { Fic, FicUpdate } from "../components/Fic/ficTypes.ts";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export type tables = "fics" | "settings"
export type item = settingsData | Fic
export const supabase = createClient(supabaseUrl, supabaseKey);


//get all fics
export async function getFicsSB(userId:string) {
  const { data: fics, error }= await supabase.from('fics').select().eq("user_id", userId).order('ao3id', { ascending: true })
  return { fics, error }
}
//get a fic
export async function getAFicSB(id:string){
  return await supabase
  .from("fics")
  .select().eq("id",id)
}
//add a fic
export async function addFicSB (fic:Fic){
  return await supabase
  .from("fics")
  .insert(fic)
}
//update a fic
export async function updateFicSB ( update:FicUpdate){
  return await supabase
  .from("fics")
  .update(update.update).eq("id",update.fic.id)
}
//delete a fic
export async function deleteFicSB (id:string){
  return await supabase
  .from("fics")
  .delete().eq("id",id)
}


//get settings
export async function getSettingsSB(userId:string){
  const { data: settings, error } = await supabase
  .from("settings")
  .select().eq("userId",userId)
  return {settings,error}
}


//update settings
export async function updateSettingsSB(settings:settingsData){
  const {  error } = await supabase
  .from("settings")
  .update(settings).eq("userId",settings.userId)
  return error
}

//create settings
export async function addSettings(settings:settingsData){
  const {  error } = await supabase
  .from("settings")
  .insert(settings)
  return error
}

//delete settings
export async function deleteSettings(userId:string){
  const {  error } = await supabase
  .from("settings")
  .delete().eq("userId", userId)
  return error
}