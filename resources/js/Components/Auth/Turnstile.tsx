import { Turnstile } from "@marsidev/react-turnstile";
import { usePage } from "@inertiajs/react";

interface TurnstileComponentProps {
  onVerify: (token: string) => void;
  siteKey?: string;
}

export default function TurnstileComponent({ onVerify, siteKey }: TurnstileComponentProps) {
  const { turnstile_site_key } = usePage<{ turnstile_site_key?: string }>().props;
  const resolvedSiteKey =
    siteKey ?? turnstile_site_key ?? (import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined);

  if (!resolvedSiteKey) {
    console.error(
      "Turnstile site key is not defined. Please set one of: `siteKey` prop, Inertia shared `turnstile_site_key` (config('turnstile.turnstile_site_key')), or `VITE_TURNSTILE_SITE_KEY`.",
    );
    return null;
  }

  return <Turnstile siteKey={resolvedSiteKey} onSuccess={(token) => onVerify(token)} />;
}
