import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class GuestbookService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
  }

  // This is what guestbook.controller.ts is looking for:
  async getPosts() {
    const { data, error } = await this.supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  // This is the second method the controller needs:
  async createPost(payload: { name: string; message: string }) {
    const { data, error } = await this.supabase
      .from('guestbook')
      .insert([payload])
      .select();
    
    if (error) throw error;
    return data;
  }
}