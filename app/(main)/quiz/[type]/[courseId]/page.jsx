// app/(main)/quiz/[type]/[courseId]/page.jsx
import { QuizPage } from "@/components";

export async function generateMetadata({ params }) {
  const { type, courseId } = params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/getQuiz`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, courseId }),
        cache: "no-store",
      }
    );

    const data = await res.json();
    const course = data.courseDetails;

    return {
      title: `Quiz: ${course?.code} - ${course?.title} | The VU World`,
      description: `Practice ${type} quiz for ${course?.title} (${course?.code}) from Virtual University. Test your skills and boost your preparation.`,
      openGraph: {
        title: `Quiz: ${course?.code} - ${course?.title} | The VU World`,
        description: `Attempt a ${type} quiz for ${course?.title}. Practice MCQs and track your performance.`,
        url: `https://www.thevu.world/quiz/${type}/${courseId}`,
        siteName: "The VU World",
        images: [
          {
            url: "https://www.thevu.world/quiz_preview.png", // Update with your actual OG image
            width: 1200,
            height: 630,
            alt: "Quiz Portal - The VU World",
          },
        ],
        type: "website",
      },
      robots: { index: true, follow: true },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "Quiz Portal | The VU World",
      description: "Take quizzes for all Virtual University subjects.",
    };
  }
}

const getQuizDetails = async (type, courseId) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/getQuiz`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, courseId }),
        cache: "no-store",
      }
    );

    const data = await res.json();
    const actualData = data.questions;
    const courseDetails = data.courseDetails;

    return { actualData, courseDetails };
  } catch (err) {
    console.error("Server fetch error:", err);
    return { actualData: null, courseDetails: null };
  }
};

const page = async ({ params }) => {
  const { type, courseId } = await params;

  const { actualData, courseDetails } = await getQuizDetails(type, courseId);

  return (
    <QuizPage
      quiz={actualData}
      courseDetails={courseDetails}
      courseId={courseId}
    />
  );
};

export default page;
