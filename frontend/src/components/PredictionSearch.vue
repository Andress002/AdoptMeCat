<template>
  <div class="container">
    <h2 class="title">Buscar predicciones </h2>

    <div class="layout-container">
      <!-- Resultados (ahora a la izquierda) -->
      <div class="results-container">
        <div v-if="cargando" class="loading">
          <div class="spinner"></div>
          <p class="loading-text">Buscando predicciones...</p>
        </div>

        <div v-else-if="predicciones.length" class="results">
          <h3 class="results-title">Resultados ({{ predicciones.length }})</h3>

          <div class="table-container">
            <table class="results-table">
              <thead>
                <tr>
                  <th>Edad</th>
                  <th>Raza</th>
                  <th>Sexo</th>
                  <th>Vacunado</th>
                  <th>Resultado</th>
                  <th>Prob. Sí</th>
                  <th>Prob. No</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(p, index) in predicciones" :key="index" class="result-row">
                  <td>{{ p.edadPersona }} años</td>
                  <td>{{ p.raza }}</td>
                  <td>{{ p.sexoGato || 'N/A' }}</td>
                  <td>
                    <span :class="p.estaVacunado === 'si' ? 'badge badge-success' : 'badge badge-danger'">
                      {{ p.estaVacunado === 'si' ? 'Sí' : 'No' }}
                    </span>
                  </td>
                  <td>
                    <span :class="p.prediccionAdopcion === 'si' ? 'badge badge-success' : 'badge badge-danger'">
                      {{ p.prediccionAdopcion === 'si' ? 'Adoptará' : 'No adoptará' }}
                    </span>
                  </td>
                  <td>{{ formatPercentage(p.probabilidadAdopcionSi) }}</td>
                  <td>{{ formatPercentage(p.probabilidadAdopcionNo) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-else-if="busquedaRealizada" class="no-results">
          <p>No se encontraron predicciones con los filtros seleccionados.</p>
        </div>
        
        <div v-else class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>Usa los filtros para buscar predicciones</p>
        </div>
      </div>

      <!-- Formulario de búsqueda (ahora a la derecha) -->
      <div class="form-container">
        <form @submit.prevent="buscarPredicciones" class="search-form">
          <div class="form-grid">
            <!-- Primera fila -->
            <div class="form-group">
              <label class="form-label">Edad</label>
              <input 
                type="number" 
                v-model="filtros.edadPersona" 
                placeholder="Edad" 
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label class="form-label">¿Tiene mascotas previas?</label>
              <select 
                v-model="filtros.tieneMascotasPrevias" 
                class="form-select"
              >
                <option value="true">Sí</option>
                <option value="false">No</option>
              </select>
            </div>

            <!-- Segunda fila -->
            <div class="form-group">
              <label class="form-label">Tipo de casa</label>
              <select 
                v-model="filtros.tipoCasa" 
                class="form-select"
              >
                <option value="">Todos</option>
                <option value="casa">Casa</option>
                <option value="departamento">Departamento</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">¿Prefiere gatos activos?</label>
              <select 
                v-model="filtros.prefiereGatosActivos" 
                class="form-select"
              >
                <option value="">Todos</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Raza</label>
              <select 
                v-model="filtros.raza" 
                class="form-select"
              >
                <option value="">Todas</option>
                <option value="Persian">Persian</option>
                <option value="Siames">Siames</option>
                <option value="Comun">Comun</option>
                <option value="Exotico">Exotico</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <!-- Tercera fila -->
            <div class="form-group">
              <label class="form-label">Sexo del gato</label>
              <select 
                v-model="filtros.sexoGato" 
                class="form-select"
              >
                <option value="">Todos</option>
                <option value="macho">Macho</option>
                <option value="hembra">Hembra</option>
              </select>
            </div>
            
            <div class="form-group">
              <label class="form-label">Comportamiento</label>
              <select 
                v-model="filtros.comportamiento" 
                class="form-select"
              >
                <option value="">Todos</option>
                <option value="tranquilo">Tranquilo</option>
                <option value="juguetón">Juguetón</option>
                <option value="timido">Tímido</option>
                <option value="agresivo">Agresivo</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">¿Está vacunado?</label>
              <select 
                v-model="filtros.estaVacunado" 
                class="form-select"
              >
                <option value="">Todos</option>
                <option value="si">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            <!-- Cuarta fila -->
            <div class="form-group">
              <label class="form-label">Tamaño</label>
              <select 
                v-model="filtros.tamaño" 
                class="form-select"
              >
                <option value="">Todos</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Peso</label>
              <input 
                type="number" 
                step="any"
                v-model="filtros.peso" 
                placeholder="Peso" 
                class="form-input"
              />
            </div>
          </div>

          <!-- Botones -->
          <div class="button-group">
            <button type="submit" class="btn-primary">Buscar</button>
            <button type="button" @click="limpiarFiltros" class="btn-secondary">Limpiar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      filtros: {
        edadPersona: '',
        tieneMascotasPrevias: '',
        tipoCasa: '',
        prefiereGatosActivos: '',
        raza: '',
        sexoGato: '',
        comportamiento: '',
        estaVacunado: '',
        tamaño: '',
        peso: '',
      },
      predicciones: [],
      cargando: false,
      busquedaRealizada: false,
      error: null
    };
  },

  methods: {
    async buscarPredicciones() {
      this.cargando = true;
      this.error = null;
      this.busquedaRealizada = true;

      try {
        const filtrosLimpios = {};
        for (const [key, value] of Object.entries(this.filtros)) {
          if (value !== '') {
            filtrosLimpios[key] = value;
          }
        }

        const response = await axios.get('http://localhost:5000/api/predictions', {
          params: filtrosLimpios
        });

        this.predicciones = response.data;
      } catch (error) {
        console.error('❌ Error al buscar predicciones:', error);
        this.error = error.response?.data?.error || 'Error al conectar con el servidor';
        this.predicciones = [];
      } finally {
        this.cargando = false;
      }
    },

    limpiarFiltros() {
      for (const key in this.filtros) {
        this.filtros[key] = '';
      }
      this.predicciones = [];
      this.busquedaRealizada = false;
    },

    formatPercentage(value) {
      if (value === null || value === undefined) return 'N/A';
      return `${parseFloat(value).toFixed(2)}%`;
    }
  }
};
</script>

<style scoped>
/* Estilos para reemplazar Tailwind */
.container {
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  max-width: 90rem; /* Aumentado para acomodar el layout horizontal */
  margin: 0 auto;
}

.title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

/* Nuevo layout horizontal */
.layout-container {
  display: flex;
  flex-direction: row-reverse; /* Formulario a la derecha, resultados a la izquierda */
  gap: 1.5rem;
  align-items: flex-start;
}

.form-container {
  flex: 0 0 35%; /* Ancho fijo para el formulario */
}

.results-container {
  flex: 1; /* Toma el espacio restante */
  min-width: 0; /* Importante para que flex funcione correctamente */
}

.search-form {
  background-color: #f9fafb;
  padding: 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 0.5rem;
}

.form-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.form-input, .form-select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  background-color: white;
}

.form-input:focus, .form-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.button-group {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.btn-primary {
  flex: 1;
  background-color: #ff6b6b;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #ff5252;
}

.btn-primary:focus {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #ff6b6b;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #1f2937;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #d1d5db;
}

.btn-secondary:focus {
  outline: none;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #9ca3af;
}

.loading {
  text-align: center;
  padding: 2rem 0;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.spinner {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border: 4px solid rgba(59, 130, 246, 0.25);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 0.5rem;
  color: #6b7280;
}

.results {
  background-color: #f9fafb;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  padding: 1.25rem;
}

.results-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #374151;
}

.table-container {
  overflow-x: auto;
  margin: 0 -0.5rem; /* Compensar el padding interno */
}

.results-table {
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.85rem;
}

.results-table th, .results-table td {
  padding: 0.6rem 0.75rem;
  text-align: left;
}

.results-table th {
  background-color: #f3f4f6;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: sticky;
  top: 0;
}

.results-table tbody {
  background-color: white;
}

.results-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
}

.results-table tbody tr:last-child {
  border-bottom: none;
}

.result-row:hover {
  background-color: #f9fafb;
}

.badge {
  padding: 0.125rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.25;
  border-radius: 9999px;
  display: inline-flex;
}

.badge-success {
  background-color: #dcfce7;
  color: #166534;
}

.badge-danger {
  background-color: #fee2e2;
  color: #b91c1c;
}

.no-results {
  padding: 2rem;
  background-color: #fefce8;
  border: 1px solid #fef9c3;
  border-radius: 0.5rem;
  text-align: center;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-results p {
  color: #854d0e;
}

.empty-state {
  padding: 2rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  text-align: center;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state p {
  color: #6b7280;
}

/* Responsive */
@media (max-width: 1024px) {
  .layout-container {
    flex-direction: column;
  }
  
  .form-container, .results-container {
    width: 100%;
    flex: none;
  }
  
  .results-container {
    margin-top: 1.5rem;
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .container {
    padding: 1rem;
  }
}
</style>