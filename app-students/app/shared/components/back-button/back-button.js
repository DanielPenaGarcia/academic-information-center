import { router } from "../../router.js";

class BackButton extends HTMLElement {
  constructor() {
    super();
    // Crear el botón cuando se instancie el componente
    this.attachShadow({ mode: "open" }); // Para crear un Shadow DOM y encapsular el estilo
    const currentScript = new URL(import.meta.url);
    const cssPath = `${currentScript.origin}${currentScript.pathname.replace(
      /\.js$/,
      ".css"
    )}`;
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", cssPath);
    this.shadowRoot.append(link);
    this.createButton();
  }

  createButton() {
    // Crear el botón
    const button = document.createElement("button");
    button.id = "back-button"; // Añadir un ID para poder seleccionarlo con JavaScript

    // Añadir el evento click al botón
    button.addEventListener("click", this.#onClick);
    button.innerHTML = `
    <svg width="24" height="24" fill="#fff" stroke="#fff" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d='M19.5 12h-15m0 0 5.625-6M4.5 12l5.625 6' />
    </svg>`;

    // Añadir el botón al Shadow DOM
    this.shadowRoot.appendChild(button);
  }

  #onClick() {
    setTimeout(() => {
      router.back();
    }, 100);
  }
}

export default BackButton;
