/**
 * Public env vars (NEXT_PUBLIC_*). Supabase 등 클라이언트에서 사용.
 * 서버 전용 시 별도 모듈로 분리하세요.
 */
export const env = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
} as const;
