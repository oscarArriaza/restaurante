document.addEventListener
(
  "DOMContentLoaded",
  function()
  {
    let etiquetaBody=document.getElementsByTagName("body")[0];
    principal();
    function principal()
    {
      let contenedorPrimeros=document.getElementById("contenedorPrimeros");
      let contenedorSegundos=document.getElementById("contenedorSegundos");
      let contenedorPostres=document.getElementById("contenedorPostres");
      let contenedorBebidas=document.getElementById("contenedorBebidas");
      let contenedorPedido=document.getElementById("contenedorPedido");

      let primeros=
      [
        {idPlato:1,nombrePlato:"Ensalada César",imagenPlatoSrc:"ensalada_cesar.png",precioPlato:"9.50",alergenosPlato:"Alérgenos: Gluten, Lácteos, Pescado (anchoas en la salsa)"},
        {idPlato:2,nombrePlato:"Sopa de Tomate y Albahaca",imagenPlatoSrc:"sopa_de_tomate_y_albahaca.png",precioPlato:"6.50",alergenosPlato:"Alérgenos: Ninguno"},
        {idPlato:3,nombrePlato:"Carpaccio de Res",imagenPlatoSrc:"carpaccio_de_res.png",precioPlato:"12.00",alergenosPlato:"Alérgenos: Lácteos, Mostaza"},
        {idPlato:4,nombrePlato:"Tortilla Española",imagenPlatoSrc:"tortilla_española.png",precioPlato:"7.00",alergenosPlato:"Alérgenos: Huevos"}
      ];

      let segundos=
      [
        {idPlato:5,nombrePlato:"Solomillo de Ternera",imagenPlatoSrc:"solomillo_de_ternera.png",precioPlato:"18.50",alergenosPlato:"Alérgenos: Lácteos (en la salsa de pimienta)"},
        {idPlato:6,nombrePlato:"Paella de Mariscos",imagenPlatoSrc:"paella_de_mariscos.png",precioPlato:"16.00",alergenosPlato:"Alérgenos: Crustáceos, Moluscos, Pescado"},
        {idPlato:7,nombrePlato:"Salmón a la Parrilla",imagenPlatoSrc:"salmon_a_la_parrilla.png",precioPlato:"15.00",alergenosPlato:"Alérgenos: Pescado, Lácteos (en la salsa de eneldo)"},
        {idPlato:8,nombrePlato:"Raviolis de Espinaca y Ricotta",imagenPlatoSrc:"raviolis_de_espinaca_y_Ricotta.png",precioPlato:"13,50",alergenosPlato:"Alérgenos: Gluten, Lácteos, Huevos"}
      ];

      let postres=
      [
        {idPlato:9,nombrePlato:"Tarta de Queso",imagenPlatoSrc:"tarta_de_queso.png",precioPlato:"5.50",alergenosPlato:"Alérgenos: Gluten, Lácteos, Huevos"},
        {idPlato:10,nombrePlato:"Tiramisú",imagenPlatoSrc:"tiramisu.png",precioPlato:"6.00",alergenosPlato:"Alérgenos: Gluten, Lácteos, Huevos"},
        {idPlato:11,nombrePlato:"Helado Artesanal",imagenPlatoSrc:"helado_artesanal.png",precioPlato:"4.00",alergenosPlato:"Alérgenos: Lácteos"},
        {idPlato:12,nombrePlato:"Flan de Vainilla",imagenPlatoSrc:"flan_de_vainilla.png",precioPlato:"4.50",alergenosPlato:"Alérgenos: Lácteos, Huevos"}
      ];

      let bebidas=
      [
        {idPlato:13,nombrePlato:"Cerveza",imagenPlatoSrc:"cerveza.png",precioPlato:"2.50",alergenosPlato:"Alérgenos: Ninguno"},
        {idPlato:14,nombrePlato:"Refresco",imagenPlatoSrc:"refrescos.png",precioPlato:"2.00",alergenosPlato:"Alérgenos: Ninguno"},
        {idPlato:15,nombrePlato:"Agua",imagenPlatoSrc:"agua.png",precioPlato:"1.50",alergenosPlato:"Alérgenos: Ninguno"},
        {idPlato:16,nombrePlato:"Café",imagenPlatoSrc:"cafe.png",precioPlato:"1.50",alergenosPlato:"Alérgenos: Ninguno"}
      ];

      for (let primero of primeros)
      {
        let platoElement=document.createElement('plato-element');
        platoElement.setAttribute("data-id-plato",primero.idPlato);
        platoElement.setAttribute("data-nombre-plato",primero.nombrePlato);
        platoElement.setAttribute("data-imagen-plato-src",primero.imagenPlatoSrc);
        platoElement.setAttribute("data-precio-plato",primero.precioPlato);
        platoElement.setAttribute("data-alergenos-plato",primero.alergenosPlato);
        platoElement.setAttribute("class","col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4")

        contenedorPrimeros.appendChild(platoElement)
      }

      for (let segundo of segundos)
      {
        let platoElement=document.createElement('plato-element');
        platoElement.setAttribute("data-id-plato",segundo.idPlato);
        platoElement.setAttribute("data-nombre-plato",segundo.nombrePlato);
        platoElement.setAttribute("data-imagen-plato-src",segundo.imagenPlatoSrc);
        platoElement.setAttribute("data-precio-plato",segundo.precioPlato);
        platoElement.setAttribute("data-alergenos-plato",segundo.alergenosPlato);
        platoElement.setAttribute("class","col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4")

        contenedorSegundos.appendChild(platoElement)
      }

      for (let postre of postres)
      {
        let platoElement=document.createElement('plato-element');
        platoElement.setAttribute("data-id-plato",postre.idPlato);
        platoElement.setAttribute("data-nombre-plato",postre.nombrePlato);
        platoElement.setAttribute("data-imagen-plato-src",postre.imagenPlatoSrc);
        platoElement.setAttribute("data-precio-plato",postre.precioPlato);
        platoElement.setAttribute("data-alergenos-plato",postre.alergenosPlato);
        platoElement.setAttribute("class","col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4")

        contenedorPostres.appendChild(platoElement)
      }

      for (let bebida of bebidas)
      {
        let platoElement=document.createElement('plato-element');
        platoElement.setAttribute("data-id-plato",bebida.idPlato);
        platoElement.setAttribute("data-nombre-plato",bebida.nombrePlato);
        platoElement.setAttribute("data-imagen-plato-src",bebida.imagenPlatoSrc);
        platoElement.setAttribute("data-precio-plato",bebida.precioPlato);
        platoElement.setAttribute("data-alergenos-plato",bebida.alergenosPlato);
        platoElement.setAttribute("class","col-sm-12 col-md-6 col-lg-4 col-xl-3 mb-4")

        contenedorBebidas.appendChild(platoElement)
      }

      let pedidoElement=document.createElement("pedido-element");
      contenedorPedido.appendChild(pedidoElement);
      
    }
  }
);