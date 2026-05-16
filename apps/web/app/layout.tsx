import type { Metadata, Viewport } from "next";
import { getSiteUrl } from "./site-url";
import "./globals.css";

const themeScript = `
(() => {
  try {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const stored = window.localStorage.getItem("vdc-theme");
    const systemTheme = media.matches ? "dark" : "light";
    document.documentElement.dataset.theme = stored === "dark" || stored === "light" ? stored : systemTheme;
  } catch {
    document.documentElement.dataset.theme = "light";
  }
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Virginia Dental Care | Dentist in Arlington, VA",
    template: "%s | Virginia Dental Care"
  },
  description:
    "Virginia Dental Care in Arlington, VA offers general dentistry, cosmetic dentistry, periodontics, dental implants, oral surgery, root canals, Invisalign, and emergency dental care.",
  keywords: [
    "dentist in Arlington VA",
    "Virginia Dental Care",
    "Arlington dentist",
    "periodontist Arlington VA",
    "dental implants Arlington VA",
    "emergency dentist Arlington VA",
    "cosmetic dentist Arlington VA"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Virginia Dental Care | Dentist in Arlington, VA",
    description:
      "General, cosmetic, periodontal, implant, and emergency dental care at 915 N Quincy St in Arlington, VA.",
    url: "/",
    siteName: "Virginia Dental Care",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/dr-omer-akmal.jpg",
        width: 430,
        height: 600,
        alt: "Dr. Omer Akmal at Virginia Dental Care"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Virginia Dental Care | Dentist in Arlington, VA",
    description:
      "General, cosmetic, periodontal, implant, and emergency dental care in Arlington, VA."
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  appleWebApp: {
    capable: true,
    title: "VA Dental Care",
    statusBarStyle: "black-translucent"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#050505"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
