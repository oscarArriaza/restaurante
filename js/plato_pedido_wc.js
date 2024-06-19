document.addEventListener("DOMContentLoaded", function() {
    class PlatoPedidoElement extends HTMLElement {
        constructor() {
            super();

            if (!this.shadowRoot) {
                // Creamos el shadow DOM solo si no existe
                this.attachShadow({ mode: 'open' });

                // Recuperamos los atributos
                this.idPlato = this.getAttribute("data-id-plato") || "Id del plato desconocido.";
                this.nombrePlato = this.getAttribute("data-nombre-plato") || "Nombre del plato desconocido.";
                this.precioPlatoTotal = this.getAttribute("data-precio-plato-total") || 'Precio del plato total desconocido.';
                this.cantidad = this.getAttribute("data-cantidad-plato") || 'Cantidad del plato desconocida.';

                // Definimos la template (HTML + CSS)
                let template = document.createElement('template');
                template.innerHTML = `
                    <style>
                        @import url('./bootstrap/css/bootstrap.css');
                    </style>
                    <li class="list-group-item mb-2">
                        <div class="d-flex justify-content-between">
                            <span>${this.nombrePlato}</span>
                            <button type="button" class="btn btn-sm btn-danger botonQuitar">-</button>
                            <span class="cantidad">${this.cantidad}</span>
                            <button type="button" class="btn btn-sm btn-success botonAniadir">+</button>
                            <span class="precio">${this.precioPlatoTotal} €</span>
                        </div>
                    </li>
                `;

                // Añadimos el contenido de la template (clonándola) al shadow DOM
                this.shadowRoot.appendChild(template.content.cloneNode(true));

                // Añadir el event listener para el botón
                this.shadowRoot.querySelector('.botonAniadir').addEventListener('click', () => {
                    this.cambiarCantidad(1);
                });

                this.shadowRoot.querySelector('.botonQuitar').addEventListener('click', () => {
                    this.cambiarCantidad(-1);
                });
            }
        }

        cambiarCantidad(incremento) {
            let nuevaCantidad = parseInt(this.cantidad) + incremento;

            if (nuevaCantidad > 0) {
                this.dispatchEvent(new CustomEvent('add-plato-del-mismo-tipo', {
                    detail: {
                        idPlato: this.idPlato,
                        cantidadPlato: nuevaCantidad
                    },
                    bubbles: true,
                    composed: true
                }));
            } else {
                this.dispatchEvent(new CustomEvent('restar-plato-del-mismo-tipo', {
                    detail: {
                        idPlato: this.idPlato,
                        cantidadPlato: nuevaCantidad
                    },
                    bubbles: true,
                    composed: true
                }));
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'data-cantidad-plato') {
                this.cantidad = newValue;
                this.shadowRoot.querySelector('.cantidad').textContent = newValue;
            }
            if (name === 'data-precio-plato-total') {
                this.precioPlatoTotal = newValue;
                this.shadowRoot.querySelector('.precio').textContent = newValue + " €";
            }
        }

        static get observedAttributes() {
            return ['data-cantidad-plato', 'data-precio-plato-total'];
        }
    }

    customElements.define('plato-pedido-element', PlatoPedidoElement);
});