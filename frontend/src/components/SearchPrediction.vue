<template>
    <div class="search-prediction">
      <h2>Buscar Predicciones por Raza</h2>
      <form @submit.prevent="buscarPredicciones">
        <div>
          <label for="raza">Raza del gato:</label>
          <input type="text" v-model="razaBusqueda" required />
        </div>
        <button type="submit">Buscar</button>
      </form>
  
      <div v-if="prediccionesEncontradas.length">
        <h3>Resultados de la búsqueda:</h3>
        <div v-for="(prediccion, index) in prediccionesEncontradas" :key="index" class="resultado">
          <!-- <p><strong>Nombre:</strong> {{ prediccion.nombrePersona }}</p> -->
          <p><strong>Raza:</strong> {{ prediccion.raza }}</p>
          <p><strong>¿Adoptará?:</strong> {{ prediccion.prediccionAdopcion }}</p>
          <p><strong>Probabilidad (sí):</strong> {{ Math.round(prediccion.probabilidadAdopcionSi) }}%</p>
          <p><strong>Probabilidad (no):</strong> {{ Math.round(prediccion.probabilidadAdopcionNo) }}%</p>
          <hr />
        </div>
      </div>
  
      <div v-if="errorBusqueda" class="error-message">
        <p>{{ errorBusqueda }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        razaBusqueda: "",
        prediccionesEncontradas: [],
        errorBusqueda: null
      };
    },
    methods: {
      Math,
      async buscarPredicciones() {
        try {
          const response = await axios.get(`http://localhost:5000/api/predictions/${this.razaBusqueda}`);
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.prediccionesEncontradas = response.data;
            this.errorBusqueda = null;
          } else {
            this.prediccionesEncontradas = [];
            this.errorBusqueda = "No se encontraron predicciones para esa raza.";
          }
        } catch (error) {
          this.prediccionesEncontradas = [];
          this.errorBusqueda = "Error al buscar predicciones.";
          console.error("Error buscando predicciones:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .search-prediction {
    max-width: 700px;
    margin: auto;
    padding: 20px;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  input,
  button {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .resultado {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
    margin-top: 20px;
  }
  </style>
  