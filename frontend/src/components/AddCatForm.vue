<template>
  <div class="container">
    <div class="form-container">
      <h2 class="form-title">Agregar una Nueva Mascota</h2>
      
      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <form @submit.prevent="addMascota">
        <div class="form-grid">
          <!-- Columna izquierda -->
          <div class="form-column">
            <div class="form-group">
              <label for="name" class="form-label">Nombre</label>
              <input
                type="text"
                id="name"
                v-model="mascota.name"
                class="form-control"
                required
                placeholder="Nombre de la mascota"
              />
            </div>
            
            <div class="form-group">
              <label for="type" class="form-label">Tipo</label>
              <div class="radio-group">
                <label class="radio-container">
                  <input type="radio" v-model="mascota.type" value="cat" name="type">
                  <span class="radio-label">Gato</span>
                  <span class="radio-icon">🐱</span>
                </label>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group half">
                <label for="age" class="form-label">Edad</label>
                <input
                  type="number"
                  id="age"
                  v-model="mascota.age"
                  class="form-control"
                  required
                  placeholder="Edad"
                />
              </div>
              
              <div class="form-group half">
                <label for="size" class="form-label">Tamaño</label>
                <select id="size" v-model="mascota.size" class="form-control select-control" required>
                  <option value="small">Pequeño</option>
                  <option value="medium">Mediano</option>
                  <option value="large">Grande</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="breed" class="form-label">Raza</label>
              <input
                type="text"
                id="breed"
                v-model="mascota.breed"
                class="form-control"
                required
                placeholder="Raza del gato"
                />
            </div>
            
            <div class="form-group">
              <label for="vaccinated" class="form-label">Vacunado</label>
              <div class="toggle-container">
                <input 
                  type="checkbox" 
                  id="vaccinated" 
                  class="toggle" 
                  :checked="mascota.vaccinated === 'true'"
                  @change="mascota.vaccinated = $event.target.checked"
                />
                <label for="vaccinated" class="toggle-label"></label>
                <span class="toggle-text">{{ mascota.vaccinated === 'true' ? 'Sí' : 'No' }}</span>
              </div>
            </div>
          </div>
          
          <!-- Columna derecha -->
          <div class="form-column">
            <div class="form-group">
              <label for="description" class="form-label">Descripción</label>
              <textarea
                id="description"
                v-model="mascota.description"
                class="form-control textarea"
                required
                placeholder="Breve descripción de la mascota"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="image" class="form-label">Imagen</label>
              <div class="file-input-container">
                <input
                  type="file"
                  id="image"
                  @change="handleFileUpload"
                  class="file-input"
                  accept="image/*"
                />
                <label for="image" class="file-label">
                  <span class="file-icon">📷</span>
                  <span>{{ image ? image.name : 'Seleccionar imagen' }}</span>
                </label>
              </div>
            </div>
            
            <button type="submit" class="btn btn-submit">
              <span class="btn-icon">✓</span>
              Agregar Mascota
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AddPetForm', 
  data() {
    return {
      mascota: {
        name: '',
        description: '',
        type: 'cat', 
        age: '', 
        vaccinated: 'true', 
        size: 'small',
        breed: '', 
      },
      image: null,
      successMessage: ''
    };
  },
  methods: {
    async addMascota() {
      const formData = new FormData();
      formData.append('name', this.mascota.name);
      formData.append('description', this.mascota.description);
      formData.append('type', this.mascota.type);
      formData.append('age', this.mascota.age);
      formData.append('vaccinated', this.mascota.vaccinated);
      formData.append('size', this.mascota.size);
      formData.append('breed', this.mascota.breed);
      if (this.image) {
        formData.append('image', this.image);
      }

      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/pets', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        this.successMessage = '¡Mascota agregada exitosamente!';
        // Reinicia el formulario
        this.mascota = { name: '', description: '', type: 'cat', age: '', vaccinated: 'true', size: 'small' , breed: '' };
        this.image = null;
        
        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      } catch (error) {
        console.error('Error al agregar la mascota:', error);
        alert('Error al agregar la mascota');
      }
    },
    handleFileUpload(event) {
      this.image = event.target.files[0];
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 10px;
  font-family: 'Poppins', sans-serif;
}

.form-container {
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  padding: 20px;
  margin-top: 20px;
}

.form-title {
  text-align: center;
  margin-bottom: 15px;
  color: #333;
  font-weight: 600;
  font-size: 22px;
  position: relative;
}

.form-title:after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 3px;
  background-color: #ff6b6b;
  border-radius: 3px;
}

.form-grid {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.form-column {
  flex: 1;
  display: flex;
  flex-direction: column;
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

.form-label {
  font-weight: 500;
  color: #555;
  margin-bottom: 4px;
  display: block;
  font-size: 13px;
}

.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  background-color: #f9f9f9;
}

.form-control:focus {
  border-color: #ff6b6b;
  box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.1);
  outline: none;
  background-color: #fff;
}

.textarea {
  min-height: 100px;
  resize: vertical;
}

.select-control {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  padding-right: 30px;
}

.radio-group {
  display: flex;
  gap: 10px;
}

.radio-container {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
}

.radio-container:hover {
  background-color: #f9f9f9;
}

.radio-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.radio-container input:checked + .radio-label {
  color: #ff6b6b;
  font-weight: 500;
}

.radio-container input:checked ~ .radio-icon {
  transform: scale(1.2);
}

.radio-container input:checked + .radio-label + .radio-icon {
  transform: scale(1.2);
}

.radio-label {
  margin-right: 6px;
  font-size: 13px;
}

.radio-icon {
  font-size: 16px;
  transition: transform 0.2s ease;
}

.file-input-container {
  position: relative;
}

.file-input {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.file-label {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border: 1px dashed #e1e1e1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-label:hover {
  background-color: #f0f0f0;
  border-color: #ccc;
}

.file-icon {
  margin-right: 8px;
  font-size: 16px;
  flex-shrink: 0;
}

.toggle-container {
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
  height: 22px;
  background: #e1e1e1;
  display: block;
  border-radius: 100px;
  position: relative;
  transition: 0.3s;
}

.toggle-label:after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 90px;
  transition: 0.3s;
}

.toggle:checked + .toggle-label {
  background: #ff6b6b;
}

.toggle:checked + .toggle-label:after {
  left: calc(100% - 3px);
  transform: translateX(-100%);
}

.toggle-text {
  margin-left: 8px;
  font-size: 13px;
}

.btn-submit {
  width: 100%;
  padding: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(255, 107, 107, 0.2);
  margin-top: auto;
}

.btn-submit:hover {
  background-color: #ff5252;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(255, 107, 107, 0.3);
}

.btn-icon {
  margin-right: 6px;
}

.success-message {
  background-color: #e7f7ed;
  color: #28a745;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
  font-size: 13px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Responsive */
@media (max-width: 768px) {
  .form-grid {
    flex-direction: column;
    gap: 0;
  }
  
  .form-container {
    padding: 15px;
  }
}
</style>