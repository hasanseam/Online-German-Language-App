import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle } from "lucide-react";
import VideoPlayer from "./VideoPlayer";

const mockLessonContent: any = {
  "1": {
    "1": {
      title: "Introduction to German Alphabet",
      content: `
        <h2>Welcome to your first German lesson!</h2>
        <p>The German alphabet has 26 letters, just like English, plus 4 additional special characters:</p>
        <ul>
          <li><strong>ä</strong> - called "a-umlaut"</li>
          <li><strong>ö</strong> - called "o-umlaut"</li>
          <li><strong>ü</strong> - called "u-umlaut"</li>
          <li><strong>ß</strong> - called "eszett" or "sharp s"</li>
        </ul>
        <h3>Pronunciation Tips</h3>
        <p>German pronunciation is quite regular once you learn the rules. Here are some key points:</p>
        <ul>
          <li><strong>W</strong> is pronounced like English "V"</li>
          <li><strong>V</strong> is pronounced like English "F"</li>
          <li><strong>J</strong> is pronounced like English "Y"</li>
          <li><strong>Z</strong> is pronounced like "TS"</li>
        </ul>
        <h3>Practice Words</h3>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Wasser</strong> (VAH-ser) - water</p>
          <p><strong>Vogel</strong> (FOH-gel) - bird</p>
          <p><strong>Jahr</strong> (yahr) - year</p>
          <p><strong>Zeit</strong> (tsait) - time</p>
        </div>
      `,
    },
    "2": {
      title: "Basic Greetings and Introductions",
      content: `
        <h2>Greetings in German</h2>
        <p>Learning to greet people is your first step to communicating in German!</p>
        <h3>Common Greetings</h3>
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Guten Morgen</strong> - Good morning</p>
          <p><strong>Guten Tag</strong> - Good day (formal)</p>
          <p><strong>Guten Abend</strong> - Good evening</p>
          <p><strong>Hallo</strong> - Hello (informal)</p>
          <p><strong>Tschüss</strong> - Goodbye (informal)</p>
          <p><strong>Auf Wiedersehen</strong> - Goodbye (formal)</p>
        </div>
        <h3>Introducing Yourself</h3>
        <ul>
          <li><strong>Ich heiße...</strong> - My name is...</li>
          <li><strong>Ich bin...</strong> - I am...</li>
          <li><strong>Wie heißen Sie?</strong> - What is your name? (formal)</li>
          <li><strong>Wie heißt du?</strong> - What is your name? (informal)</li>
        </ul>
        <h3>Example Conversation</h3>
        <div style="background: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Person A:</strong> Guten Tag! Ich heiße Anna. Wie heißen Sie?</p>
          <p><strong>Person B:</strong> Guten Tag! Ich heiße Thomas. Freut mich!</p>
          <p><strong>Person A:</strong> Freut mich auch!</p>
        </div>
      `,
    },
  },
};

export function LessonView() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = mockLessonContent[courseId || "1"]?.[lessonId || "1"];

  if (!lesson) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <p className="text-xl text-gray-600">Lesson not found</p>
      </div>
    );
  }

  const handleComplete = () => {
    alert("Lesson marked as complete!");
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-gray-50">
      <div className="bg-gradient-to-r from-black via-red-900 to-black text-white py-6 px-4 border-b-4 border-yellow-500">
        <div className="max-w-4xl mx-auto">
          <Link
            to={`/courses/${courseId}`}
            className="flex items-center gap-2 hover:text-yellow-400 transition mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
          <h1 className="text-3xl"><span className="text-yellow-500">{lesson.title}</span></h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-12 px-4">
        {courseId === "1" && lessonId === "1" && (
          <div className="mb-8">
            <VideoPlayer
              courseId={1}
              lessonId={1}
              onEnded={() => console.log("Video finished")}
            />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-t-4 border-red-600">
          <div
            className="lesson-content prose max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
            style={{
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <Link
            to={`/courses/${courseId}`}
            className="flex items-center gap-2 text-red-600 hover:underline font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Course Overview
          </Link>

          <button
            onClick={handleComplete}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transition-all duration-300 font-bold shadow-lg"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Complete
          </button>
        </div>
      </div>
    </div>
  );
}
