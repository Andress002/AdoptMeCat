<template>
  <div class="prediction-container">
    <div class="prediction-card">
      <div class="card-header">
        <h2>Predicción de Adopción</h2>
        <p class="subtitle">Complete el formulario para predecir la compatibilidad</p>
      </div>
      
      <form @submit.prevent="enviarDatos">
        <div class="form-grid">
          <!-- Columna izquierda: Información del adoptante -->
          <div class="form-section">
            <h3 class="section-title">Información del Adoptante</h3>
            
            <div class="form-group">
              <label for="edadPersona">Edad</label>
              <input 
                type="number" 
                id="edadPersona" 
                v-model="edadPersona" 
                min="18" 
                required 
                placeholder="Edad en años"
                class="form-control"
              />
            </div>
            
            <div class="form-group">
              <label>¿Tiene mascotas previas?</label>
              <div class="toggle-buttons">
                <label class="toggle-btn" :class="{ active: tieneMascotasPrevias === 'si' }">
                  <input 
                    type="radio" 
                    v-model="tieneMascotasPrevias" 
                    value="si" 
                    hidden
                  />
                  <span>Sí</span>
                </label>
                <label class="toggle-btn" :class="{ active: tieneMascotasPrevias === 'no' }">
                  <input 
                    type="radio" 
                    v-model="tieneMascotasPrevias" 
                    value="no" 
                    hidden
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>Tipo de vivienda</label>
              <div class="toggle-buttons">
                <label class="toggle-btn" :class="{ active: tipoCasa === 'casa' }">
                  <input 
                    type="radio" 
                    v-model="tipoCasa" 
                    value="casa" 
                    hidden
                  />
                  <span>Casa</span>
                </label>
                <label class="toggle-btn" :class="{ active: tipoCasa === 'departamento' }">
                  <input 
                    type="radio" 
                    v-model="tipoCasa" 
                    value="departamento" 
                    hidden
                  />
                  <span>Departamento</span>
                </label>
              </div>
            </div>
            
            <div class="form-group">
              <label>¿Prefiere gatos activos?</label>
              <div class="toggle-buttons">
                <label class="toggle-btn" :class="{ active: prefiereGatosActivos === 'si' }">
                  <input 
                    type="radio" 
                    v-model="prefiereGatosActivos" 
                    value="si" 
                    hidden
                  />
                  <span>Sí</span>
                </label>
                <label class="toggle-btn" :class="{ active: prefiereGatosActivos === 'no' }">
                  <input 
                    type="radio" 
                    v-model="prefiereGatosActivos" 
                    value="no" 
                    hidden
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
          </div>
          
          <!-- Columna derecha: Información del gato -->
          <div class="form-section">
            <h3 class="section-title">Información del Gato</h3>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="peso">Peso (kg)</label>
                <input 
                  type="number" 
                  id="peso" 
                  v-model="peso" 
                  step="0.1" 
                  min="0.1" 
                  required 
                  placeholder="Ej: 3.5"
                  class="form-control"
                />
              </div>
              
              <div class="form-group half">
                <label for="tamaño">Tamaño</label>
                <select id="tamaño" v-model="tamaño" required class="form-control">
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="raza">Raza</label>
                <select id="raza" v-model="raza" required class="form-control">
                  <option value="Persian">Persa</option>
                  <option value="Siames">Siamés</option>
                  <option value="Comun">Común</option>
                  <option value="Exotico">Exótico</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              
              <div class="form-group half">
                <label for="sexoGato">Sexo</label>
                <select id="sexoGato" v-model="sexoGato" required class="form-control">
                  <option value="macho">Macho</option>
                  <option value="hembra">Hembra</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label for="comportamiento">Comportamiento</label>
              <select id="comportamiento" v-model="comportamiento" required class="form-control">
                <option value="tranquilo">Tranquilo</option>
                <option value="juguetón">Juguetón</option>
                <option value="timido">Tímido</option>
                <option value="agresivo">Agresivo</option>
              </select>
            </div>
            
            <div class="form-group">
              <label>¿Está vacunado?</label>
              <div class="toggle-switch">
                <input 
                  type="checkbox" 
                  id="estaVacunado" 
                  class="toggle" 
                  :checked="estaVacunado === 'si'"
                  @change="estaVacunado = $event.target.checked ? 'si' : 'no'"
                />
                <label for="estaVacunado" class="toggle-label"></label>
                <span class="toggle-text">{{ estaVacunado === 'si' ? 'Sí' : 'No' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button type="submit" class="submit-btn">
          <span class="btn-icon">🔮</span>
          Predecir Adopción
        </button>
      </form>
      
      <!-- Resultados de la predicción -->
      <transition name="fade">
        <div v-if="resultadoPrediccion" class="prediction-results">
          <h3>Resultado de la Predicción</h3>
          
          <div class="result-card" :class="resultadoPrediccion === 'si' ? 'positive' : 'negative'">
            <div class="result-icon">
              {{ resultadoPrediccion === 'si' ? '✅' : '❌' }}
            </div>
            <div class="result-text">
              <p class="result-title">
                {{ resultadoPrediccion === 'si' ? '¡Adopción Favorable!' : 'Adopción No Recomendada' }}
              </p>
              <div class="probability-bars">
                <div class="probability-item">
                  <span class="probability-label">Probabilidad de adopción:</span>
                  <div class="progress-bar">
                    <div class="progress-fill positive" :style="`width: ${porcentajeSi}%`"></div>
                    <span class="progress-text">{{ porcentajeSi }}%</span>
                  </div>
                </div>
                <div class="probability-item">
                  <span class="probability-label">Probabilidad de rechazo:</span>
                  <div class="progress-bar">
                    <div class="progress-fill negative" :style="`width: ${porcentajeNo}%`"></div>
                    <span class="progress-text">{{ porcentajeNo }}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      edadPersona: "",
      tieneMascotasPrevias: "si",
      tipoCasa: "casa",
      prefiereGatosActivos: "si",
      peso: "",
      raza: "Persian",
      sexoGato: "macho",
      comportamiento: "tranquilo",
      estaVacunado: "si",
      tamaño: "mediano",
      resultadoPrediccion: null,
      porcentajeSi: null,
      porcentajeNo: null,
    };
  },
  methods: {
    async enviarDatos() {
      const datosFormulario = {
        edadPersona: this.edadPersona,
        tieneMascotasPrevias: this.tieneMascotasPrevias,
        tipoCasa: this.tipoCasa,
        prefiereGatosActivos: this.prefiereGatosActivos,
        peso: this.peso,
        raza: this.raza,
        sexoGato: this.sexoGato,
        tamaño: this.tamaño,
        comportamiento: this.comportamiento,
        estaVacunado: this.estaVacunado,
        tamaño: this.tamaño
      };

      console.log(datosFormulario)

      try {
        const response = await axios.post("http://localhost:5000/api/predictor", datosFormulario);

        this.resultadoPrediccion = response.data.resultado;
        this.porcentajeSi = response.data.porcentajeSi?.toFixed(2) || "0";
        this.porcentajeNo = response.data.porcentajeNo?.toFixed(2) || "0";

      } catch (error) {
        console.error("Error en la predicción:", error);
        alert("Hubo un error al hacer la predicción.");
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.prediction-container {
  font-family: 'Poppins', sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 15px;
}

.prediction-card {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.card-header {
  background-color: #afacac;
  color: white;
  padding: 15px 20px;
  text-align: center;
}

.card-header h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 5px;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
}

form {
  padding: 20px;
}

.form-grid {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-section {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 15px;
}

.section-title {
  font-size: 16px;
  color: #000000;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.form-row {
  display: flex;
  gap: 10px;
}

.form-group {
  margin-bottom: 12px;
  width: 100%;
}

.form-group.half {
  flex: 1;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #495057;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 13px;
  transition: all 0.2s ease;
  background-color: white;
}

.form-control:focus {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1);
  outline: none;
}

.toggle-buttons {
  display: flex;
  gap: 8px;
}

.toggle-btn {
  flex: 1;
  padding: 6px 10px;
  text-align: center;
  background-color: #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s ease;
  color: #495057;
}

.toggle-btn.active {
  background-color: #ff6b6b;
  color: white;
}

.toggle-switch {
  display: flex;
  align-items: center;
}

.toggle {
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;
}

.toggle-label {
  cursor: pointer;
  width: 40px;
  height: 20px;
  background: #e9ecef;
  display: block;
  border-radius: 100px;
  position: relative;
  transition: 0.3s;
}

.toggle-label:after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 90px;
  transition: 0.3s;
}

.toggle:checked + .toggle-label {
  background: #ff6b6b;
}

.toggle:checked + .toggle-label:after {
  left: calc(100% - 2px);
  transform: translateX(-100%);
}

.toggle-text {
  margin-left: 8px;
  font-size: 13px;
}

.submit-btn {
  width: 100%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.submit-btn:hover {
  background-color: #e83c3c;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(108, 92, 231, 0.2);
}

.btn-icon {
  margin-right: 8px;
}

/* Resultados de la predicción */
.prediction-results {
  padding: 20px;
  border-top: 1px solid #e9ecef;
}

.prediction-results h3 {
  font-size: 18px;
  color: #495057;
  margin-bottom: 15px;
  text-align: center;
}

.result-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  background-color: #f8f9fa;
}

.result-card.positive {
  background-color: #e3fcef;
}

.result-card.negative {
  background-color: #ffe3e3;
}

.result-icon {
  font-size: 24px;
  margin-right: 15px;
}

.result-text {
  flex: 1;
}

.result-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #495057;
}

.probability-bars {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.probability-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.probability-label {
  font-size: 13px;
  color: #6c757d;
  width: 180px;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background-color: #e9ecef;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.5s ease;
}

.progress-fill.positive {
  background-color: #38d39f;
}

.progress-fill.negative {
  background-color: #ff6b6b;
}

.progress-text {
  position: absolute;
  right: 5px;
  top: -3px;
  font-size: 11px;
  color: #495057;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    flex-direction: column;
  }
  
  .prediction-container {
    padding: 10px;
  }
}
</style>