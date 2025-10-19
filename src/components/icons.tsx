import type { SVGProps } from "react";

export function UbicatitoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_20_2)">
        <path
          d="M448 256C448 360.416 360.416 448 256 448C151.584 448 64 360.416 64 256C64 151.584 151.584 64 256 64C360.416 64 448 151.584 448 256Z"
          fill="#F2F2F2"
        />
        <path
          d="M448 256C448 151.584 360.416 64 256 64L256 448C360.416 448 448 360.416 448 256Z"
          fill="#E84F39"
        />
        <path
          d="M384 128L320 192"
          stroke="#26345A"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M128 128L192 192"
          stroke="#26345A"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M256 384C294.224 384 325.12 353.104 325.12 314.88C325.12 299.712 319.456 285.824 310.048 275.456C310.048 275.456 310.048 275.456 310.016 275.424C305.792 269.888 299.84 265.44 292.992 262.496C286.08 259.52 278.4 257.6 270.4 256.96C270.4 256.96 270.4 256.96 270.368 256.96C265.664 256.448 260.864 256.192 256 256.192C251.136 256.192 246.336 256.448 241.632 256.96C241.6 256.96 241.6 256.96 241.6 256.96C233.6 257.6 225.92 259.52 219.008 262.496C212.16 265.44 206.208 269.888 201.984 275.424C201.952 275.456 201.952 275.456 201.952 275.456C192.544 285.824 186.88 299.712 186.88 314.88C186.88 353.104 217.776 384 256 384Z"
          stroke="#26345A"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M373.28 256C373.28 320.016 320.016 373.28 256 373.28C191.968 373.28 138.72 320.016 138.72 256C138.72 191.968 191.968 138.72 256 138.72"
          stroke="#26345A"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M344.128 244.48C344.128 272.688 321.056 295.76 292.848 295.76C264.64 295.76 241.568 272.688 241.568 244.48C241.568 216.272 264.64 193.2 292.848 193.2C321.056 193.2 344.128 216.272 344.128 244.48Z"
          fill="#F2F2F2"
        />
        <path
          d="M270.4 244.48C270.4 252.688 263.888 259.2 255.68 259.2C247.472 259.2 240.96 252.688 240.96 244.48C240.96 236.272 247.472 229.76 255.68 229.76C263.888 229.76 270.4 236.272 270.4 244.48Z"
          fill="#26345A"
        />
        <path
          d="M214.432 244.48C214.432 272.688 191.36 295.76 163.152 295.76C134.944 295.76 111.872 272.688 111.872 244.48C111.872 216.272 134.944 193.2 163.152 193.2C191.36 193.2 214.432 216.272 214.432 244.48Z"
          fill="#F2F2F2"
        />
        <path
          d="M181.44 244.48C181.44 252.688 174.928 259.2 166.72 259.2C158.512 259.2 152 252.688 152 244.48C152 236.272 158.512 229.76 166.72 229.76C174.928 229.76 181.44 236.272 181.44 244.48Z"
          fill="#26345A"
        />
        <path
          d="M405.28 256C405.28 340.016 340.016 405.28 256 405.28C171.968 405.28 106.72 340.016 106.72 256"
          stroke="#26345A"
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_20_2">
          <rect width="512" height="512" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
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
