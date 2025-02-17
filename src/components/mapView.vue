<template>
  <div id="map" :style="{ height: mapHeight, width: '100%', borderRadius: '10px' }"></div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const isMobile = ref(window.innerWidth <= 768);

// Computa a altura do mapa conforme  dispositivo
const mapHeight = computed(() => (isMobile.value ? "745px" : "580px"));

// Atualiza o valor de isMobile ao redimensionar a janela
window.addEventListener("resize", () => {
  isMobile.value = window.innerWidth <= 768;
});

onMounted(async () => {
  await nextTick(); // Aguarda a renderização da DOM

  const mapContainer = document.getElementById("map");
  if (!mapContainer) {
    console.error("Elemento #map não encontrado!");
    return;
  }

  // Inicializa o mapa (centralizado inicialmente em Rondônia)
  const map = L.map("map").setView([-10.9111, -62.3104], 7);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Adiciona o marker da localização atual do usuário (se permitido)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const userMarker = L.marker([lat, lng]).addTo(map);
        userMarker.bindPopup("Você está aqui!").openPopup();
        // Opcional: centraliza o mapa na posição do usuário com zoom maior
        map.setView([lat, lng], 12);
      },
      (error) => {
        console.error("Erro ao obter localização: ", error);
      }
    );
  } else {
    console.error("Geolocalização não é suportada por este navegador.");
  }

  // Busca por todas as lojas de ração no estado de São Paulo usando Overpass API
  fetch(
    `https://overpass-api.de/api/interpreter?data=[out:json];area[name="São Paulo"]->.searchArea;node[shop=pet](area.searchArea);out;`
  )
    .then((response) => response.json())
    .then((data) => {
      data.elements.forEach((place) => {
        let popupContent = `<strong>${place.tags.name || "Loja de Ração"}</strong><br>`;
        if (place.tags.address)
          popupContent += `Endereço: ${place.tags.address}<br>`;
        if (place.tags.phone)
          popupContent += `Telefone: ${place.tags.phone}<br>`;
        if (place.tags.website)
          popupContent += `<a href='${place.tags.website}' target='_blank'>Site</a><br>`;
        if (place.tags.rating)
          popupContent += `Avaliação: ${place.tags.rating}/5 ⭐<br>`;

        L.marker([place.lat, place.lon])
          .addTo(map)
          .bindPopup(popupContent);
      });
    })
    .catch((error) =>
      console.error("Erro ao buscar locais de ração:", error)
    );
});
</script>
