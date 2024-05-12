// Función de inicialización del mapa
function initMap() {
  // Crear mapa
  var map = new google.maps.Map(document.getElementById('mapContainer'), {
    center: {lat: 0, lng: 0}, // Coordenadas iniciales del mapa
    zoom: 12 
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);

      var marker = new google.maps.Marker({
        position: pos,
        map: map
      });
    });
  }
}


function initMap() {
  var addressCoords = [40.572662, -4.013435]; // Coordenadas actualizadas
  var map = L.map('map').setView(addressCoords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(map);
  L.marker(addressCoords).addTo(map)
    .bindPopup('Carr. de Guadarrama, 85, 28260 Galapagar, Madrid')
    .openPopup();
}
initMap();

function enviarFormulario() {
  var nombre = document.getElementById("nombre").value;
  var email = document.getElementById("email").value;
  var mensaje = document.getElementById("mensaje").value;

  var correoDestino = 'diegogmarti@gmail.com';
  var asunto = 'Datos del formulario';

  var mailtoLink = 'mailto:' + correoDestino +
    '?subject=' + encodeURIComponent(asunto) +
    '&body=' + encodeURIComponent('Nombre: ' + nombre + '\nEmail: ' + email + '\nMensaje: ' + mensaje);

  window.location.href = mailtoLink;
}
var accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  item.addEventListener('click', function() {
    this.classList.toggle('active');
    var content = this.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});