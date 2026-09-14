import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

/**
 * GET /auth/callback
 * Supabase OAuth callback handler (PKCE flow)
 * Called after Facebook / Google redirects back to the app.
 */
export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // next param lets you redirect the user back to where they were
  const next = searchParams.get("next") ?? "/";

  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (!error) {
        // Redirect to the page they came from (or home)
        return NextResponse.redirect(`${origin}${next}`);
      }

      console.error("OAuth code exchange error:", error.message);
    } catch (err) {
      console.error("OAuth callback error:", err);
    }
  }

  // Fallback: redirect home with error flag
  return NextResponse.redirect(`${origin}/?auth_error=true`);
}
