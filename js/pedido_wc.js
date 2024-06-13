document.addEventListener("DOMContentLoaded", function() {
    class PedidoElement extends HTMLElement {
        constructor() {
            super();
            
            if (!this.shadowRoot) {
                // Creamos el shadow DOM solo si no existe
                this.attachShadow({ mode: 'open' });
                this.platos = [];

                // Definimos la template (HTML + CSS)
                let template = document.createElement('template');
                template.innerHTML = `
                    <style>
                        @import url('./bootstrap/css/bootstrap.css');
                    </style>
                    <p class="text-success fw-bold">
                        "No se han agregado platos al pedido."
                    </p>
                `;
                
                // Añadimos el contenido de la template (clonándola) al shadow DOM
                this.shadowRoot.appendChild(template.content.cloneNode(true));
            }
        }

        connectedCallback() {
            window.addEventListener('add-plato', (event) => {
                let { idPlato, nombrePlato, precioPlato } = event.detail;

                let platoExistente = this.platos.find(plate => plate.getAttribute("data-id-plato") === idPlato);
                if (platoExistente === undefined) {
                    let platoPedido = document.createElement('plato-pedido-element');
                    platoPedido.setAttribute("data-id-plato", idPlato);
                    platoPedido.setAttribute("data-nombre-plato", nombrePlato);
                    platoPedido.setAttribute("data-precio-plato-unidad", precioPlato);
                    platoPedido.setAttribute("data-precio-plato-total", precioPlato);
                    platoPedido.setAttribute("data-cantidad-plato", 1);
                    platoPedido.setAttribute("class", "platoDePedido");

                    this.platos.push(platoPedido);
                    this.updateTemplate();
                } else {
                    this.actualizarPlatoExistente(platoExistente, 1);
                }
            });

            window.addEventListener('add-plato-del-mismo-tipo', (event) => {
                let { idPlato, cantidadPlato } = event.detail;
                let plato = this.platos.find(plate => plate.getAttribute("data-id-plato") === idPlato);

                this.actualizarPlatoExistente(plato, cantidadPlato - plato.getAttribute("data-cantidad-plato"));
            });

            window.addEventListener('restar-plato-del-mismo-tipo', (event) => {
                let { idPlato, cantidadPlato } = event.detail;
                let plato = this.platos.find(plate => plate.getAttribute("data-id-plato") === idPlato);

                this.actualizarPlatoExistente(plato, cantidadPlato - plato.getAttribute("data-cantidad-plato"));
            });
        }

        actualizarPlatoExistente(plato, incremento) {
            let cantidadActual = parseInt(plato.getAttribute("data-cantidad-plato"));
            let nuevaCantidad = cantidadActual + incremento;

            if (nuevaCantidad <= 0) {
                this.platos = this.platos.filter(p => p !== plato);
            } else {
                plato.setAttribute("data-cantidad-plato", nuevaCantidad);
                plato.setAttribute("data-precio-plato-total", parseFloat(plato.getAttribute("data-precio-plato-unidad")) * nuevaCantidad);
            }
            this.updateTemplate();
        }

        updateTemplate() {
            this.shadowRoot.innerHTML = '';
            let template = document.createElement('template');

            if (this.platos.length === 0) {
                template.innerHTML = `
                    <style>
                        @import url('./bootstrap/css/bootstrap.css');
                    </style>
                    <p class="text-success fw-bold">
                        "No se han agregado platos al pedido."
                    </p>
                `;
            } else {
                template.innerHTML = `
                    <style>
                        @import url('./bootstrap/css/bootstrap.css');
                    </style>
                    <div class="container">
                        <ul class="list-group"></ul>
                    </div>
                    <div class="container">
                        <ul class="list-group">
                            <li class="list-group-item mb-2">
                                <div class="d-flex justify-content-end">
                                    <span id="total" class="text-light"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
                `;

                let list = template.content.querySelector('ul');
                let spantotal = template.content.querySelector('#total');
                let total = 0;

                this.platos.forEach(plato => {
                    list.appendChild(plato);
                    total += Number(plato.getAttribute("data-precio-plato-total"));
                });

                spantotal.innerHTML = "Total: " + total + " €";
            }

            this.shadowRoot.appendChild(template.content.cloneNode(true));
        }
    }

    customElements.define('pedido-element', PedidoElement);
});