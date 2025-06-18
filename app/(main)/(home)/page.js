import { headers } from "next/headers";
import { HomePage } from "@/components";

export const metadata = {
  title: "Dashboard | The VU World",
  description:
    "Your personalized VU dashboard. View and manage bookmarked Virtual University courses including CS101, MTH202, and more. Start preparing with quizzes, MCQs, and learning resources.",
  keywords: [
    "virtual university dashboard",
    "vu bookmarked courses",
    "vu learning platform",
    "vu midterm preparation",
    "vu finalterm preparation",
    "vu study materials",
    "vu mcqs",
    "vu course dashboard",
    "the vu world",
    "vu learning app",
    "online mcqs",
    "personalized learning vu",
    "vu course bookmark",
  ],
  openGraph: {
    title: "Your VU Dashboard | The VU World",
    description:
      "Access your bookmarked courses on The VU World. Prepare for Virtual University exams with quizzes, MCQs, and smart tools.",
    url: "https://www.thevu.world",
    siteName: "The VU World",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "The VU World - VU Learning Platform",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your VU Dashboard | The VU World",
    description:
      "Access bookmarked courses, view learning content, and prepare smartly with The VU World.",
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

export default async function Page({ user }) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") || "";

  // ⏱️ Call both APIs at the same time
  const [resCourses] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/getBookmarked`, {
      cache: "no-store",
      headers: { Cookie: cookie },
    }),
  ]);
  const courses = resCourses.ok ? await resCourses.json() : [];

  return <HomePage bookmarkedCourses={courses?.data || []} />;
}
