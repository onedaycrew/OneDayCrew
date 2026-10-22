import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vqihxhrhmnzxsdhesufb.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxaWh4aHJobW56eHNkaGVzdWZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2NjUyMTEsImV4cCI6MjEwODI0MTIxMX0.7ayNASyVHZVGgk2MJRrAZnJLAic_zm1CCypXZ50-gvE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Saves a lead to Supabase leads table.
 * Does NOT call .select() so it adheres to strict insert-only Row-Level Security.
 */
export async function saveLead({ name, phone, service = 'General' }) {
  try {
    const payload = {
      name: name.trim(),
      phone: phone.trim()
    };
    if (service) {
      payload.service = service.trim();
    }

    const { error, status } = await supabase
      .from('leads')
      .insert([payload]);

    if (error) {
      console.error('Supabase error saving lead:', error.message);
      return { success: false, error: error.message };
    }

    console.log('Lead saved successfully to Supabase. HTTP Status:', status);
    return { success: true };
  } catch (err) {
    console.error('Supabase connection exception:', err);
    return { success: false, error: err.message };
  }
}
