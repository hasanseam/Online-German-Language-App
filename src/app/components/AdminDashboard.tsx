import { useState } from "react";
import { PlusCircle, BookOpen, Edit, Trash2, Eye } from "lucide-react";

interface Course {
  id: string;
  title: string;
  level: string;
  lessons: number;
  status: "draft" | "published";
}

export function AdminDashboard() {
  const [courses, setCourses] = useState<Course[]>([
    { id: "1", title: "German A1 - Beginner", level: "A1", lessons: 24, status: "published" },
    { id: "2", title: "German A2 - Elementary", level: "A2", lessons: 28, status: "published" },
    { id: "3", title: "German B1 - Intermediate", level: "B1", lessons: 32, status: "draft" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    level: "A1",
    lessons: 0,
    description: "",
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();

    const course: Course = {
      id: String(courses.length + 1),
      title: newCourse.title,
      level: newCourse.level,
      lessons: newCourse.lessons,
      status: "draft",
    };

    setCourses([...courses, course]);
    setShowModal(false);
    setNewCourse({ title: "", level: "A1", lessons: 0, description: "" });
  };

  const toggleStatus = (id: string) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? { ...course, status: course.status === "draft" ? "published" : "draft" }
          : course
      )
    );
  };

  const deleteCourse = (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  return (
    <div className="min-h-[calc(100vh-180px)] bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex gap-1">
                <div className="w-2 h-12 bg-black rounded"></div>
                <div className="w-2 h-12 bg-red-600 rounded"></div>
                <div className="w-2 h-12 bg-yellow-500 rounded"></div>
              </div>
              <h1 className="text-4xl text-gray-800">Admin Dashboard</h1>
            </div>
            <p className="text-gray-600">Kurse und Lektionen verwalten</p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-black text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-gray-900 hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Course
          </button>
        </div>

        <div className="grid gap-6 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Total Courses</h3>
                <BookOpen className="w-8 h-8 text-black" />
              </div>
              <p className="text-3xl text-gray-800">{courses.length}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-yellow-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Published</h3>
                <Eye className="w-8 h-8 text-yellow-600" />
              </div>
              <p className="text-3xl text-gray-800">
                {courses.filter((c) => c.status === "published").length}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border-t-4 border-red-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600">Drafts</h3>
                <Edit className="w-8 h-8 text-red-600" />
              </div>
              <p className="text-3xl text-gray-800">
                {courses.filter((c) => c.status === "draft").length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-black via-red-900 to-black text-yellow-500 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">Kurstitel</th>
                  <th className="px-6 py-3 text-left text-sm">Niveau</th>
                  <th className="px-6 py-3 text-left text-sm">Lektionen</th>
                  <th className="px-6 py-3 text-left text-sm">Status</th>
                  <th className="px-6 py-3 text-left text-sm">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {courses.map((course) => (
                  <tr key={course.id} className="hover:bg-yellow-50 transition-all duration-200">
                    <td className="px-6 py-4 text-gray-800">{course.title}</td>
                    <td className="px-6 py-4">
                      <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {course.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{course.lessons}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          course.status === "published"
                            ? "bg-yellow-100 text-yellow-900"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {course.status === "published" ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleStatus(course.id)}
                          className={`px-3 py-1 rounded text-sm font-semibold hover:scale-110 transition-all duration-300 ${
                            course.status === "draft"
                              ? "bg-yellow-500 text-black hover:bg-yellow-600"
                              : "bg-red-600 text-white hover:bg-red-700"
                          }`}
                        >
                          {course.status === "draft" ? "Publish" : "Unpublish"}
                        </button>
                        <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded hover:scale-110 transition-all duration-300">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCourse(course.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded hover:scale-110 transition-all duration-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 border-t-4 border-yellow-500">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                <div className="w-2 h-12 bg-black rounded"></div>
                <div className="w-2 h-12 bg-red-600 rounded"></div>
                <div className="w-2 h-12 bg-yellow-500 rounded"></div>
              </div>
              <h2 className="text-2xl text-gray-800">Neuen Kurs erstellen</h2>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-6">
              <div>
                <label className="block text-sm mb-2 text-gray-700 font-semibold">Kurstitel / Course Title</label>
                <input
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  placeholder="z.B., Deutsch A1 - Anfänger"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700 font-semibold">Niveau / Level</label>
                <select
                  value={newCourse.level}
                  onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                >
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                  <option value="C1">C1</option>
                  <option value="C2">C2</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700 font-semibold">Anzahl der Lektionen / Number of Lessons</label>
                <input
                  type="number"
                  value={newCourse.lessons}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, lessons: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  placeholder="24"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2 text-gray-700 font-semibold">Beschreibung / Description</label>
                <textarea
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                  rows={4}
                  placeholder="Kursbeschreibung..."
                  required
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 hover:scale-105 transition-all duration-300 font-bold shadow-lg"
                >
                  Create Course
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 hover:scale-105 transition-all duration-300 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
