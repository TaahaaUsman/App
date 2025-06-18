import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "The VU World",
  description:
    "An all-in-one learning platform for Virtual University students to access study materials, practice MCQs, and use modern learning techniques to achieve over 90% CGPA. Prepare for CS101, MTH202, and all major VU subjects with AI-powered tools and personalized support.",
  keywords: [
    "virtual university",
    "vu learning",
    "vu support platform",
    "vu mcqs",
    "vu past papers",
    "vu materials",
    "high CGPA",
    "learn vu subjects",
    "vu LMS",
    "vu handouts",
    "vu short notes",
    "vu short questions",
    "vu long questions",
    "vu mind maps",
    "midterm preparation",
    "finalterm preparation",
    " vu MIDTERM preparatin",
    "vu FINALTERM prepration",
  ],
  metadataBase: new URL("https://www.thevu.world"),
  openGraph: {
    title: "The VU World",
    description: "All-in-one VU learning platform with MCQs and resources.",
    url: "https://www.thevu.world",
    siteName: "The VU World",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "The VU World Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The VU World",
    description: "VU learning made easy. Practice MCQs and prepare smartly.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.thevu.world",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}

