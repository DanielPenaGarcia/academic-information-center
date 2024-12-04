import authGuard from "./shared/guards/auth.guard.js";
import roleGuard from "./shared/guards/role.guard.js";

export const routes = [
    //Auth routes
    {
        path: '/sign-in',
        page: 'app/layouts/auth/pages/sign-in/sign-in.html',
    },
    //Student routes
    {
        path: '/student',
        page: 'app/layouts/student/student.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/options',
        page: 'app/layouts/student/pages/options/options.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/update',
        page: 'app/layouts/student/pages/update-student/update-student.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/classes',
        page: 'app/layouts/student/pages/class-options/class-options.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/enroll',
        page: 'app/layouts/student/pages/enroll-student/enroll-student.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/review-class',
        page: 'app/layouts/student/pages/review-class/review-class.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/classes-to-review',
        page: 'app/layouts/student/pages/student-classes-review-list/student-classes-review-list.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/drop-class',
        page: 'app/layouts/student/pages/drop-class-student/drop-class-student.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    {
        path: '/student/schedule',
        page: 'app/layouts/student/pages/my-schedule/my-schedule.html',
        canActivate: [authGuard, roleGuard('STUDENT')],
    },
    //Teacher routes
    {
        path: '/teacher',
        page: 'app/layouts/teacher/teacher.html',
        canActivate: [authGuard, roleGuard('TEACHER')],
    },
    {
        path: '/teacher/options',
        page: 'app/layouts/teacher/pages/options/options.html',
        canActivate: [authGuard, roleGuard('TEACHER')],
    },
    {
        path: '/teacher/update',
        page: 'app/layouts/teacher/pages/update-teacher-user/update-teacher-user.html',
        canActivate: [authGuard, roleGuard('TEACHER')],
    },
    {
        path: '/teacher/classes',
        page: 'app/layouts/teacher/pages/my-classes/my-classes.html',
        canActivate: [authGuard, roleGuard('TEACHER')],
    },
    {
        path: '/teacher/classes/students',
        page: 'app/layouts/teacher/pages/students-in-class/students-in-class.html',
        canActivate: [authGuard, roleGuard('TEACHER')],
    },
    //Admin routes
    {
        path: '/admin',
        page: 'app/layouts/admin/admin.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/students',
        page: 'app/layouts/admin/pages/student-options/student-options.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/teachers',
        page: 'app/layouts/admin/pages/teacher-options/teacher-options.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/academic',
        page: 'app/layouts/admin/pages/academic-options/academic-options.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/classes/register-class',
        page: 'app/layouts/admin/pages/create-class/create-class.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/enrollment-period/create',
        page: 'app/layouts/admin/pages/create-enrollment-period/create-enrollment-period.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/subjects/register-subject',
        page: 'app/layouts/admin/pages/create-subject/create-subject.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/students/register',
        page: 'app/layouts/admin/pages/register-student/register-student.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/teacher/register',
        page: 'app/layouts/admin/pages/register-teacher/register-teacher.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/students/drop-class',
        page: 'app/layouts/admin/pages/drop-student-from-class/drop-student-from-class.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/students/drop-class/classes',
        page: 'app/layouts/admin/pages/student-classes/student-classes.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/teacher/asign-subject-teacher',
        page: 'app/layouts/admin/pages/asign-subject-teacher/asign-subject-teacher.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/teacher/asign-class-teacher',
        page: 'app/layouts/admin/pages/asign-class-teacher/asign-teacher-class.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/course-map/create-course-map',
        page: 'app/layouts/admin/pages/create-course-map/create-course-map.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    }
]