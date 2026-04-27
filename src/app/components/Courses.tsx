import { Link } from "react-router";
import { BookOpen, Clock, BarChart } from "lucide-react";

const mockCourses = [
  {
    id: "1",
    title: "German A1 - Beginner",
    description: "Start your German journey with basic vocabulary, grammar, and everyday conversations.",
    level: "A1",
    lessons: 24,
    duration: "8 weeks",
    image: "https://images.unsplash.com/photo-1467541473380-93b90a53d1f3?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "German A2 - Elementary",
    description: "Build on your foundation with more complex grammar and expanded vocabulary.",
    level: "A2",
    lessons: 28,
    duration: "10 weeks",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "German B1 - Intermediate",
    description: "Develop fluency in everyday situations and workplace communication.",
    level: "B1",
    lessons: 32,
    duration: "12 weeks",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "German B2 - Upper Intermediate",
    description: "Master complex texts and discussions on abstract topics.",
    level: "B2",
    lessons: 36,
    duration: "14 weeks",
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "German C1 - Advanced",
    description: "Achieve near-native fluency with nuanced expression and advanced grammar.",
    level: "C1",
    lessons: 40,
    duration: "16 weeks",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "German C2 - Mastery",
    description: "Perfect your German with native-level precision and cultural depth.",
    level: "C2",
    lessons: 44,
    duration: "18 weeks",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=250&fit=crop",
  },
];

export function Courses() {
  return (
    <div className="min-h-[calc(100vh-180px)] bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4 animate-float">
            <div className="flex gap-1">
              <div className="w-3 h-20 bg-black rounded"></div>
              <div className="w-3 h-20 bg-red-600 rounded"></div>
              <div className="w-3 h-20 bg-yellow-500 rounded"></div>
            </div>
          </div>
          <h1 className="text-4xl mb-2 text-gray-800">Our German Courses</h1>
          <p className="text-xl text-gray-600">
            Choose the course that matches your current level
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.id}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group border-t-4 border-red-600"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                    Niveau {course.level}
                  </span>
                </div>

                <h3 className="text-xl mb-2 text-gray-800 group-hover:text-red-600 transition">
                  {course.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
