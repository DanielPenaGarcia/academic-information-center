import { router } from '../../../../shared/router.js';
import authService from '../../../../shared/services/auth.service.js';

class Header extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const currentScript = new URL(import.meta.url);
        const cssPath = `${currentScript.origin}${currentScript.pathname.replace(/\.js$/, '.css')}`;
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', cssPath);
        this.shadowRoot.append(link);
    }

    connectedCallback() {
        this.header();
        this.nav();
        this.navList();
        this.buttons();
    }

    header() {
        const header = document.createElement("header");
        header.classList.add("header");
        this.shadowRoot.appendChild(header);
    }

    nav() {
        const nav = document.createElement("nav");
        nav.classList.add("nav");
        this.shadowRoot.querySelector(".header").appendChild(nav);
    }

    navList() {
        const navList = document.createElement("ul");
        navList.classList.add("nav-list");
        this.shadowRoot.querySelector(".nav").appendChild(navList);
    }

    buttons() {
        const buttons = [
            {
                label: 'Clases',
                action: () => router.navigate('/teacher/classes')
            },
            {
                label: 'Horario',
                action: () => router.navigate('/teacher/schedule')
            },
            {
                label: 'Opciones',
                action: () => router.navigate('/teacher/options')
            },
            {
                label: 'Cerrar sesión',
                action: () => this.logout()
            }
        ]
        buttons.forEach((button) => {
            const navItem = document.createElement("li");
            navItem.classList.add("nav-item");
            const navButton = document.createElement("button");
            navButton.classList.add("nav-button");
            navButton.innerHTML = button.label;
            navButton.addEventListener('click', () => {
                button.action();
            });
            navItem.appendChild(navButton); // Añadir el botón al ítem
            this.shadowRoot.querySelector(".nav-list").appendChild(navItem); // Añadir el ítem a la lista
        });
    }

    logout() {
        authService.logout();
        router.navigate('/sign-in');
    }
}

export default Header;
