import { routes } from '../routes.js';

class Router {
    constructor() {}
    
    navigate(path) {
        const route = routes.find(route => route.path === path);
        if (!route) {
            throw new Error(`Route not found: ${path}`);
        }
        if (!this.#evaluateGuards(route)) {
            return;
        }
        window.location.pathname = route.page;
    }

    replace(path) {
        const route = routes.find(route => route.path === path);
        if (!route) {
            throw new Error(`Route not found: ${path}`);
        }
        route.canActivate.forEach(guard => {
            if (!guard()) {
                return;
            }
        });
        window.location.replace(route.page);
    }

    back() {
        window.history.back();
    }

    #evaluateGuards = (route) => {
        if (!route.canActivate || route.canActivate.length === 0) {
            return true;
        }
        return route.canActivate.every(guard => guard());
    };
}

export const router = new Router();