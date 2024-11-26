import { routes } from '../routes.js';

class Router {
    constructor() {}
    
    navigate(path,query={}) {
        let pathQuery;
        if (query && Object.keys(query).length > 0) {
            const queryString = new URLSearchParams(query).toString();
            pathQuery = `?${queryString}`;
        }
        const route = routes.find(route => route.path === path);
        if (!route) {
            throw new Error(`Route not found: ${path}`);
        }
        if (!this.#evaluateGuards(route)) {
            return;
        }
        let fullPath = route.page;
        if(pathQuery){
            fullPath = `${fullPath}${pathQuery}`;
        }
        const absolutePath = new URL(fullPath, window.location.origin).href;
        window.location.href = absolutePath;
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
        const absolutePath = new URL(route.page, window.location.origin).href;
        window.location.replace(absolutePath);
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