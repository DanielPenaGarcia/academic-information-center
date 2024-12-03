export class ToastComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const currentScript = new URL(import.meta.url);
        const cssPath = `${currentScript.origin}${currentScript.pathname.replace(/\.js$/, '.css')}`;

        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', cssPath);

        const container = document.createElement('div');
        container.setAttribute('class', 'toast');

        this.shadowRoot.append(link, container);

        this.toast = container;
    }

    showToast(message, type = '', duration = 3000) {
        this.toast.textContent = message;
        this.toast.className = `toast ${type} show`;

        setTimeout(() => {
            this.toast.classList.remove('show');
        }, duration);
    }
}

customElements.define('toast-component', ToastComponent);
