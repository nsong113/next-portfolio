import { createClient } from "@supabase/supabase-js";

import { env } from "@/shared/config/env";

/**
 * 브라우저용 Supabase 클라이언트.
 * 추후 DB·Auth·Storage 연동 시 사용. RSC/Route Handler에서는 `@supabase/ssr` + 쿠키 기반 클라이언트를 검토하세요.
 */
export function createSupabaseBrowserClient() {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "[supabase] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY 가 비어 있습니다. .env.local 을 설정하세요.",
    );
  }

  return createClient(url, key);
}
