import supabase from './supabase';

export async function uploadAvatar(userId, file) {
  const path = `avatars/${userId}/${file.name}`;
  return await supabase.storage.from('avatars').upload(path, file, { upsert: true });
}

export function getAvatarUrl(path) {
  return supabase.storage.from('avatars').getPublicUrl(path).data.publicUrl;
}