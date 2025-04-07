import { configs } from "../configs";
import CourseLayout from "../layouts/CourseLayout";
import OnlyHeader from "../layouts/OnlyHeader";
import About from "../pages/About";
import ChangePassword from "../pages/ChangePassword";
import Courses from "../pages/Courses";
import Dashboard from "../pages/Dashboard";
import EditCourse from "../pages/EditCourse";
import Lecture from "../pages/Lecture";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import ViewCourse from "../pages/ViewCourse";

export const publicRoutes = [
    { path: configs.routes.dashboard, component: Dashboard, },
    { path: configs.routes.login, component: Login, layout: null },
    { path: configs.routes.about, component: About, },
    { path: configs.routes.changePassword, component: ChangePassword, },
    { path: configs.routes.profile, component: Profile, },
    { path: configs.routes.courses, component: Courses, },
    { path: configs.routes.editCourse, component: EditCourse, },
    { path: configs.routes.viewCourse, component: ViewCourse, layout: null},
    { path: configs.routes.LectureCourse, component: Lecture, layout: CourseLayout},
];