import authGuard from "./shared/guards/auth.guard.js";
import roleGuard from "./shared/guards/role.guard.js";

export const routes = [
    //Auth routes
    {
        path: '/sign-in',
        page: 'app/layouts/auth/pages/sign-in/sign-in.html',
    },
    //Student routes
    
    //Teacher routes

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
        path: 'admin/academic',
        page: 'app/layouts/admin/pages/academic-options/academic-options.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/subjects/register-subject',
        page: 'app/layouts/admin/pages/create-class/create-class.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    },
    {
        path: 'admin/enrollment-period/create',
        page: 'app/layouts/admin/pages/create-enrollment-period/create-enrollment-period.html',
        canActivate: [authGuard, roleGuard('ADMIN')],
    }
]