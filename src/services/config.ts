let nextSupabaseUrl: string | undefined = undefined;
let nextSupabaseAnonKey: string | undefined = undefined;
let nextUseMock: string | undefined = undefined;

try {
  nextSupabaseUrl = process.env.NEXT_PUBLIC_VITE_SUPABASE_URL;
} catch (e) {}

try {
  nextSupabaseAnonKey = process.env.NEXT_PUBLIC_VITE_SUPABASE_ANON_KEY;
} catch (e) {}

try {
  nextUseMock = process.env.NEXT_PUBLIC_VITE_USE_MOCK;
} catch (e) {}

const viteSupabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const viteSupabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;
const viteUseMock = (import.meta as any).env?.VITE_USE_MOCK;

export const config = {
  supabaseUrl: nextSupabaseUrl || viteSupabaseUrl || '',
  supabaseAnonKey: nextSupabaseAnonKey || viteSupabaseAnonKey || '',
  useMock: (nextUseMock || viteUseMock) === 'true',
};
