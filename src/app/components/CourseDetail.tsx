import { useParams, Link } from "react-router";
import { BookOpen, Clock, PlayCircle, CheckCircle, Lock } from "lucide-react";

const mockCourseData: any = {
  "1": {
    title: "German A1 - Beginner",
    description: "Start your German journey with basic vocabulary, grammar, and everyday conversations. This comprehensive course covers essential topics for complete beginners.",
    level: "A1",
    duration: "8 weeks",
    totalLessons: 24,
    image: "https://images.unsplash.com/photo-1467541473380-93b90a53d1f3?w=800&h=400&fit=crop",
    lessons: [
      { id: "1", title: "Introduction to German Alphabet", duration: "25 min", completed: true, locked: false },
      { id: "2", title: "Basic Greetings and Introductions", duration: "30 min", completed: true, locked: false },
      { id: "3", title: "Numbers 1-100", duration: "20 min", completed: false, locked: false },
      { id: "4", title: "Days of the Week and Months", duration: "25 min", completed: false, locked: false },
      { id: "5", title: "Personal Pronouns", duration: "30 min", completed: false, locked: true },
      { id: "6", title: "Present Tense - Sein and Haben", duration: "35 min", completed: false, locked: true },
    ],
  },
  "2": {
    title: "German A2 - Elementary",
    description: "Build on your foundation with more complex grammar and expanded vocabulary.",
    level: "A2",
    duration: "10 weeks",
    totalLessons: 28,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
    lessons: [
      { id: "1", title: "Review of A1 Basics", duration: "30 min", completed: false, locked: false },
      { id: "2", title: "Past Tense Introduction", duration: "35 min", completed: false, locked: false },
      { id: "3", title: "Modal Verbs", duration: "40 min", completed: false, locked: false },
    ],
  },
};

export function CourseDetail() {
  const { courseId } = useParams();
  const course = mockCourseData[courseId || "1"];

  if (!course) {
    return (
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <p className="text-xl text-gray-600">Course not found</p>
      </div>
    );
  }

  const completedLessons = course.lessons.filter((l: any) => l.completed).length;
  const progress = (completedLessons / course.totalLessons) * 100;

  return (
    <div className="min-h-[calc(100vh-180px)] bg-gray-50">
      <div className="bg-gradient-to-r from-black via-red-900 to-black text-white py-12 px-4 border-b-4 border-yellow-500">
        <div className="max-w-7xl mx-auto">
          <div className="mb-4">
            <Link to="/courses" className="hover:underline">
              ← Back to Courses
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm mb-4 inline-block font-bold">
                Niveau {course.level}
              </span>
              <h1 className="text-4xl mb-4"><span className="text-yellow-500">{course.title}</span></h1>
              <p className="text-xl mb-6">{course.description}</p>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <div className="mb-2 flex justify-between text-sm">
                <span>Course Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="bg-white/20 rounded-full h-3 mb-4">
                <div
                  className="bg-white rounded-full h-3 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm">
                {completedLessons} of {course.totalLessons} lessons completed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl mb-8 text-gray-800">
          Kurslektionen <span className="text-red-600">| Course Lessons</span>
        </h2>

        <div className="space-y-4">
          {course.lessons.map((lesson: any, index: number) => (
            <div
              key={lesson.id}
              className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                lesson.completed ? "border-yellow-500" : lesson.locked ? "border-gray-300" : "border-red-600"
              } ${lesson.locked ? "opacity-60" : "hover:shadow-lg hover:-translate-x-2 transition-all duration-300"}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-gradient-to-br from-black to-red-900 text-yellow-500 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    {lesson.completed ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : lesson.locked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg text-gray-800 mb-1">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{lesson.duration}</span>
                      {lesson.completed && (
                        <span className="text-green-600 ml-2">✓ Completed</span>
                      )}
                      {lesson.locked && (
                        <span className="text-gray-400 ml-2">🔒 Locked</span>
                      )}
                    </div>
                  </div>
                </div>

                {!lesson.locked && (
                  <Link
                    to={`/courses/${courseId}/lessons/${lesson.id}`}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-black text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-gray-900 hover:scale-105 transition-all duration-300 font-semibold"
                  >
                    <PlayCircle className="w-5 h-5" />
                    {lesson.completed ? "Review" : "Start"}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
