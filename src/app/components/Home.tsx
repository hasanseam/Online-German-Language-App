import { Link } from "react-router";
import { BookOpen, Users, Award, Clock } from "lucide-react";

export function Home() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-black via-red-900 to-black text-white py-20 px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-black via-red-600 to-yellow-500"></div>
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-500 via-red-600 to-black"></div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="mb-6 flex justify-center animate-float">
            <div className="flex gap-1">
              <div className="w-3 h-20 bg-black rounded"></div>
              <div className="w-3 h-20 bg-red-600 rounded"></div>
              <div className="w-3 h-20 bg-yellow-500 rounded"></div>
            </div>
          </div>

          <h1 className="text-5xl mb-6">
            <span className="text-yellow-500">Deutsch</span> lernen online
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Meistere die deutsche Sprache mit unseren umfassenden Kursen, interaktiven Lektionen und Expertenberatung.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/courses"
              className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
            >
              Browse Courses
            </Link>
            <Link
              to="/register"
              className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 hover:scale-105 transition-all duration-300 border-2 border-yellow-500 font-semibold shadow-lg"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl text-center mb-3 text-gray-800">
            Warum <span className="text-red-600">Deutsch</span><span className="text-yellow-600">Lernen</span>?
          </h2>
          <p className="text-center text-gray-600 mb-12">Why Choose DeutschLernen?</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-black hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-black to-gray-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                <BookOpen className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl mb-3 text-gray-800">Structured Courses</h3>
              <p className="text-gray-600">
                From A1 to C2, follow a clear learning path designed by language experts.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-red-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-red-600 to-red-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl mb-3 text-gray-800">Expert Teachers</h3>
              <p className="text-gray-600">
                Learn from native speakers and certified German language instructors.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-yellow-500 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-xl mb-3 text-gray-800">Certificates</h3>
              <p className="text-gray-600">
                Earn recognized certificates upon completing each course level.
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-lg border-t-4 border-gray-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="bg-gradient-to-br from-gray-800 to-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
              <h3 className="text-xl mb-3 text-gray-800">Learn Anytime</h3>
              <p className="text-gray-600">
                Study at your own pace with 24/7 access to all course materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-red-600 via-black to-yellow-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl mb-6 text-white">Bereit, Ihre deutsche Reise zu beginnen?</h2>
          <p className="text-xl mb-8 text-yellow-100">
            Schließen Sie sich Tausenden von Studenten an, die online Deutsch lernen
          </p>
          <Link
            to="/register"
            className="inline-block bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 hover:scale-105 transition-all duration-300 font-bold shadow-lg"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
