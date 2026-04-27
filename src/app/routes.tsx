import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Courses } from "./components/Courses";
import { CourseDetail } from "./components/CourseDetail";
import { LessonView } from "./components/LessonView";
import { AdminDashboard } from "./components/AdminDashboard";
import { NotFound } from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "courses", Component: Courses },
      { path: "courses/:courseId", Component: CourseDetail },
      { path: "courses/:courseId/lessons/:lessonId", Component: LessonView },
      { path: "admin", Component: AdminDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
