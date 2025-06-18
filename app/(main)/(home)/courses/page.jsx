import { CourseList } from "@/components";
import { headers } from "next/headers";

const getCourseList = async () => {
  const headersList = await headers(); 
  const cookie = headersList.get("cookie") || "";

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`, {
      headers: { Cookie: cookie },
      next: {
        revalidate: 86400, // cache for 1 day (60 * 60 * 24 seconds)
      },
    });

    const json = await res.json();
    return json?.data || [];
  } catch (err) {
    console.error("Server fetch error:", err);
    return [];
  }
};

export const metadata = {
  title: "All VU Courses | Browse & Bookmark | The VU World",
  description:
    "Browse all Virtual University courses including CS101, MTH202, ENG101, and more. Search, bookmark, and prepare for exams with smart tools from The VU World.",
  keywords: [
    "virtual university courses",
    "vu subjects list",
    "vu mcqs",
    "vu handouts",
    "vu short questions",
    "vu final term preparation",
    "vu mid term preparation",
    "midterm mcqs",
    "bookmark vu courses",
    "vu learning",
    "the vu world",
  ],
  openGraph: {
    title: "All VU Courses | The VU World",
    description:
      "Search and explore all VU subjects. Bookmark your favorite courses to study later. Powered by The VU World platform.",
    url: "https://www.thevu.world/courses",
    siteName: "The VU World",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "The VU World - Browse VU Courses",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All VU Courses | Browse & Bookmark",
    description:
      "Explore all Virtual University courses, prepare with MCQs, and bookmark your favorites at The VU World.",
    images: ["/preview.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.thevu.world/courses",
  },
};


const Page = async () => {
  const courses = await getCourseList();
  return <CourseList courses={courses} />;
};

export default Page;
