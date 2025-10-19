import type { SVGProps } from "react";

export function UbicatitoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M10 30C10 10 30 0 50 0C70 0 90 10 90 30L95 50C100 70 80 100 50 100C20 100 0 70 5 50L10 30Z" fill="#D44D2A"/>
      <path d="M18 35C18 20 35 15 50 15C65 15 82 20 82 35V45C82 55 75 60 65 60H35C25 60 18 55 18 45V35Z" fill="#FFFFFF"/>
      <path d="M25 80C25 70 30 60 50 60C70 60 75 70 75 80" fill="#FFFFFF"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M40 55C36.6863 55 34 52.3137 34 49C34 45.6863 36.6863 43 40 43C43.3137 43 46 45.6863 46 49C46 52.3137 43.3137 55 40 55ZM60 55C56.6863 55 54 52.3137 54 49C54 45.6863 56.6863 43 60 43C63.3137 43 66 45.6863 66 49C66 52.3137 63.3137 55 60 55Z" fill="#2E292A"/>
      <path d="M48 68C48 66.8954 48.8954 66 50 66C51.1046 66 52 66.8954 52 68C52 69.1046 51.1046 70 50 70C48.8954 70 48 69.1046 48 68Z" fill="#2E292A"/>
      <path d="M46 76C47.1046 75 48.8954 75 50 75C51.1046 75 52.8954 75 54 76" stroke="#2E292A" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 30C8 20 18 15 25 15" stroke="#2E292A" stroke-width="2" stroke-linecap="round"/>
      <path d="M92 30C92 20 82 15 75 15" stroke="#2E292A" stroke-width="2" stroke-linecap="round"/>
    </svg>
  )
}

export function FcfmIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="hsl(var(--primary-foreground))" opacity="0.5" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

export function BotIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}
