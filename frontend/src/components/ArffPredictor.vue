<template>
  <div class="prediction-form">
    <h2>Formulario de Predicción</h2>
    <form @submit.prevent="enviarDatos">
      <div>
        <label for="edadPersona">Edad de la persona:</label>
        <input type="number" v-model="edadPersona" min="18" required />
      </div>

      <div>
        <label for="tieneMascotasPrevias">¿Tiene mascotas previas?</label>
        <select v-model="tieneMascotasPrevias" required>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label for="tipoCasa">Tipo de casa:</label>
        <select v-model="tipoCasa" required>
          <option value="departamento">Departamento</option>
          <option value="casa">Casa</option>
        </select>
      </div>

      <div>
        <label for="prefiereGatosActivos">¿Prefiere gatos activos?</label>
        <select v-model="prefiereGatosActivos" required>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label for="peso">Peso del gato (en kg):</label>
        <input type="number" step="0.1" v-model="peso" min="0.1" required />
      </div>

      <div>
        <label for="raza">Raza del gato:</label>
        <select v-model="raza" required>
          <option value="Persian">Persian</option>
          <option value="Siames">Siames</option>
          <option value="Común">Común</option>
          <option value="Exótico">Exótico</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <!-- Nuevos campos -->
      <div>
        <label for="sexoGato">Sexo del gato:</label>
        <select v-model="sexoGato" required>
          <option value="macho">Macho</option>
          <option value="hembra">Hembra</option>
        </select>
      </div>

      <div>
        <label for="comportamiento">Comportamiento del gato:</label>
        <select v-model="comportamiento" required>
          <option value="tranquilo">Tranquilo</option>
          <option value="juguetón">Juguetón</option>
          <option value="tímido">Tímido</option>
          <option value="agresivo">Agresivo</option>
        </select>
      </div>

      <div>
        <label for="estaVacunado">¿Está vacunado?</label>
        <select v-model="estaVacunado" required>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div>
        <label for="tamaño">Tamaño del gato:</label>
        <select v-model="tamaño" required>
          <option value="pequeño">Pequeño</option>
          <option value="mediano">Mediano</option>
          <option value="grande">Grande</option>
        </select>
      </div>

      <button type="submit">Hacer predicción</button>
    </form>

    <div v-if="resultadoPrediccion">
      <h3>Resultado de la predicción:</h3>
      <p><strong>¿Adoptará?:</strong> {{ resultadoPrediccion }}</p>
      <p><strong>Probabilidad de adopción (sí):</strong> {{ porcentajeSi }}%</p>
      <p><strong>Probabilidad de no adopción (no):</strong> {{ porcentajeNo }}%</p>
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
      tipoCasa: "departamento",
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
        comportamiento: this.comportamiento,
        estaVacunado: this.estaVacunado,
        tamaño: this.tamaño
      };

      try {
        const response = await axios.post("http://localhost:5000/api/predictor", datosFormulario);

        this.resultadoPrediccion = response.data.resultado;

        this.porcentajeSi = response.data.porcentajeSi?.toFixed(2) || "No disponible";
        this.porcentajeNo = response.data.porcentajeNo?.toFixed(2) || "No disponible";

      } catch (error) {
        console.error("Error en la predicción:", error);
        alert("Hubo un error al hacer la predicción.");
      }
    },
  },
};
</script>

<style scoped>
.prediction-form {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
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
select,
button {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #45a049;
}
</style>
