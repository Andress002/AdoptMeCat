<template>
  <div class="adoption-container">
    <div class="adoption-card">
      <div class="adoption-header">
        <h1 class="adoption-title">Solicitud de Adopcion</h1>
        <p class="adoption-subtitle">Completa este formulario para iniciar el proceso de adopcion</p>
      </div>
      
      <div class="adoption-content">
        <!-- Panel de información de la mascota -->
        <div class="pet-details" v-if="pet">
          <div class="pet-image-container">
            <img
              :src="pet.image ? `http://localhost:5000/uploads/${pet.image}` : '../assets/images/default-pet.jpg'"
              alt="Mascota a adoptar"
              class="pet-image"
            />
            <div class="pet-badge" :class="pet.vaccinated ? 'vaccinated' : 'not-vaccinated'">
              {{ pet.vaccinated ? 'Vacunado' : 'No vacunado' }}
            </div>
          </div>
          
          <div class="pet-info">
            <h2 class="pet-name">{{ pet.name }}</h2>
            <div class="pet-tags">
              <span class="pet-tag">{{ pet.age }} años</span>
              <span class="pet-tag">{{ getSizeLabel(pet.size) }}</span>
              <span class="pet-tag" v-if="pet.breed">{{ pet.breed }}</span>
            </div>
            <p class="pet-description">{{ pet.description }}</p>
            
            <div class="pet-characteristics" v-if="pet.characteristics && pet.characteristics.length">
              <h3>Caracteristicas</h3>
              <div class="characteristics-list">
                <span 
                  v-for="(characteristic, index) in pet.characteristics" 
                  :key="index" 
                  class="characteristic-item"
                >
                  {{ characteristic }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pet-details-placeholder" v-else>
          <div class="loading-spinner" v-if="isLoading"></div>
          <div class="no-pet-info" v-else>
            <span class="no-pet-icon">🐾</span>
            <p>Información de la mascota no disponible</p>
          </div>
        </div>

        <!-- Formulario de adopción -->
        <div class="adoption-form">
          <h2 class="form-title">Tus Datos</h2>
          
          <form @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Nombre completo</label>
                <div class="input-container">
                  <span class="input-icon">👤</span>
                  <input
                    id="name"
                    v-model="name"
                    type="text"
                    :class="{'form-control': true, 'error': errors.name}"
                    placeholder="Tu nombre completo"
                    @focus="clearError('name')"
                  />
                </div>
                <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
              </div>
              
              <div class="form-group">
                <label for="dni">Cedula</label>
                <div class="input-container">
                  <span class="input-icon">🪪</span>
                  <input
                    id="dni"
                    v-model="dni"
                    type="text"
                    :class="{'form-control': true, 'error': errors.dni}"
                    placeholder="Tu numero de cedula"
                    @focus="clearError('dni')"
                  />
                </div>
                <span class="error-message" v-if="errors.dni">{{ errors.dni }}</span>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="email">Correo electronico</label>
                <div class="input-container">
                  <span class="input-icon">✉️</span>
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    :class="{'form-control': true, 'error': errors.email}"
                    placeholder="tu@email.com"
                    @focus="clearError('email')"
                  />
                </div>
                <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
              </div>
              
              <div class="form-group">
                <label for="phone">Telefono</label>
                <div class="input-container">
                  <span class="input-icon">📱</span>
                  <input
                    id="phone"
                    v-model="phone"
                    type="text"
                    :class="{'form-control': true, 'error': errors.phone}"
                    placeholder="Tu numero de telefono"
                    @focus="clearError('phone')"
                  />
                </div>
                <span class="error-message" v-if="errors.phone">{{ errors.phone }}</span>
              </div>
            </div>
            
            <div class="form-group full-width">
              <label for="address">Direccion</label>
              <div class="input-container">
                <span class="input-icon">🏠</span>
                <input
                  id="address"
                  v-model="address"
                  type="text"
                  :class="{'form-control': true, 'error': errors.address}"
                  placeholder="Tu direccion completa"
                  @focus="clearError('address')"
                />
              </div>
              <span class="error-message" v-if="errors.address">{{ errors.address }}</span>
            </div>
            
            <div class="form-group full-width">
              <label for="reason">¿Por que quieres adoptar esta mascota?</label>
              <div class="input-container textarea-container">
                <span class="input-icon textarea-icon">❤️</span>
                <textarea
                  id="reason"
                  v-model="reason"
                  :class="{'form-control': true, 'error': errors.reason}"
                  placeholder="Cuéntanos por que quieres adoptar esta mascota y como será su nuevo hogar..."
                  rows="4"
                  @focus="clearError('reason')"
                ></textarea>
              </div>
              <span class="error-message" v-if="errors.reason">{{ errors.reason }}</span>
              <div class="character-count" :class="{ 'warning': reason.length > 400 }">
                {{ reason.length }}/500 caracteres
              </div>
            </div>
            
            <div class="form-group full-width">
              <label class="checkbox-label">
                <input type="checkbox" v-model="termsAccepted" @change="clearError('terms')">
                <span class="checkmark"></span>
                <span>Acepto los <a href="#" class="terms-link">terminos y condiciones</a> de adopcion</span>
              </label>
              <span class="error-message" v-if="errors.terms">{{ errors.terms }}</span>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn btn-secondary" @click="goBack">Cancelar</button>
              <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
                <span v-if="isSubmitting" class="spinner"></span>
                <span v-else>Enviar solicitud</span>
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <div class="adoption-footer">
        <div class="contact-info">
          <h3>¿Necesitas ayuda?</h3>
          <div class="contact-methods">
            <div class="contact-method">
              <span class="contact-icon">📞</span>
              <div>
                <strong>Telefono</strong>
                <p>3103933668</p>
              </div>
            </div>
            <div class="contact-method">
              <span class="contact-icon">✉️</span>
              <div>
                <strong>Correo</strong>
                <p>info@adopciondegatos.com</p>
              </div>
            </div>
            <div class="contact-method">
              <span class="contact-icon">📍</span>
              <div>
                <strong>Ubicación</strong>
                <p>Cartagena, Colombia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal de confirmación -->
    <div class="modal" v-if="showSuccessModal">
      <div class="modal-content">
        <div class="modal-icon success">✓</div>
        <h2>¡Solicitud Enviada!</h2>
        <p>Hemos recibido tu solicitud para adoptar a <strong>{{ pet ? pet.name : 'esta mascota' }}</strong>. Revisaremos tu información y te contactaremos pronto.</p>
        <button class="btn btn-primary" @click="closeSuccessModal">Entendido</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdoptionForm',
  props: ['petId', 'petType'],
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      address: '',
      reason: '',
      dni: '',
      termsAccepted: false,
      petId: null,
      petType: '',
      pet: null,
      isLoading: true,
      isSubmitting: false,
      showSuccessModal: false,
      errors: {
        name: '',
        email: '',
        phone: '',
        address: '',
        reason: '',
        dni: '',
        terms: ''
      }
    };
  },
  mounted() {
    this.petId = this.$route.params.petId;
    this.petType = this.$route.params.petType;
    if (this.petId) {
      this.fetchPetDetails();
    } else {
      this.isLoading = false;
    }
  },
  methods: {
    async fetchPetDetails() {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://localhost:5000/api/pets/${this.petId}`);
        this.pet = response.data;
      } catch (error) {
        console.error('Error al obtener detalles de la mascota:', error);
      } finally {
        this.isLoading = false;
      }
    },
    getSizeLabel(size) {
      switch (size) {
        case 'small':
          return 'Pequeño';
        case 'medium':
          return 'Mediano';
        case 'large':
          return 'Grande';
        default:
          return 'Desconocido';
      }
    },
    clearError(field) {
      this.errors[field] = '';
    },
    validateForm() {
      let isValid = true;
      
      // Validar nombre
      if (!this.name.trim()) {
        this.errors.name = 'El nombre es requerido';
        isValid = false;
      } else if (this.name.trim().length < 3) {
        this.errors.name = 'El nombre debe tener al menos 3 caracteres';
        isValid = false;
      }
      
      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.trim()) {
        this.errors.email = 'El correo electrónico es requerido';
        isValid = false;
      } else if (!emailRegex.test(this.email)) {
        this.errors.email = 'Ingresa un correo electrónico válido';
        isValid = false;
      }
      
      // Validar teléfono
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!this.phone.trim()) {
        this.errors.phone = 'El teléfono es requerido';
        isValid = false;
      } else if (!phoneRegex.test(this.phone.replace(/\s+/g, ''))) {
        this.errors.phone = 'Ingresa un número de teléfono válido';
        isValid = false;
      }
      
      // Validar dirección
      if (!this.address.trim()) {
        this.errors.address = 'La dirección es requerida';
        isValid = false;
      } else if (this.address.trim().length < 5) {
        this.errors.address = 'Ingresa una dirección más detallada';
        isValid = false;
      }
      
      // Validar DNI
      const dniRegex = /^[0-9]{6,12}$/;
      if (!this.dni.trim()) {
        this.errors.dni = 'La cédula es requerida';
        isValid = false;
      } else if (!dniRegex.test(this.dni.replace(/\s+/g, ''))) {
        this.errors.dni = 'Ingresa un número de cédula válido';
        isValid = false;
      }
      
      // Validar motivo
      if (!this.reason.trim()) {
        this.errors.reason = 'El motivo para adoptar es requerido';
        isValid = false;
      } else if (this.reason.trim().length < 20) {
        this.errors.reason = 'Por favor, proporciona más detalles sobre tu motivo para adoptar';
        isValid = false;
      } else if (this.reason.length > 500) {
        this.errors.reason = 'El motivo no puede exceder los 500 caracteres';
        isValid = false;
      }
      
      // Validar términos
      if (!this.termsAccepted) {
        this.errors.terms = 'Debes aceptar los términos y condiciones';
        isValid = false;
      }
      
      return isValid;
    },
    async handleSubmit() {
      if (!this.validateForm()) {
        // Scroll to the first error
        const firstError = document.querySelector('.error-message');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      
      this.isSubmitting = true;
      
      const adoptionData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        address: this.address,
        reason: this.reason,
        dni: this.dni,
        petId: this.petId,
        petType: this.petType
      };
      
      try {
        const response = await axios.post('http://localhost:5000/api/adoption', adoptionData);
        console.log('Respuesta del servidor:', response.data);
        this.showSuccessModal = true;
        this.resetForm();
      } catch (error) {
        console.error('Error al enviar la solicitud de adopción:', error);
        alert('Hubo un error al enviar la solicitud de adopción. Por favor, intenta nuevamente.');
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.name = '';
      this.email = '';
      this.phone = '';
      this.address = '';
      this.reason = '';
      this.dni = '';
      this.termsAccepted = false;
      this.errors = {
        name: '',
        email: '',
        phone: '',
        address: '',
        reason: '',
        dni: '',
        terms: ''
      };
    },
    goBack() {
      this.$router.go(-1);
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.adoption-container {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffe9f3, #fff4d2);
  padding: 2rem;
  position: relative;
}

.adoption-card {
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
}

.adoption-header {
  background: linear-gradient(90deg, #aab2ee, #b9b3de);
  padding: 1.5rem 2rem;
  color: white;
  text-align: center;
}

.adoption-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.adoption-subtitle {
  font-size: 1rem;
  opacity: 0.9;
}

.adoption-content {
  display: flex;
  flex-direction: row;
  padding: 0;
}

/* Pet details section */
.pet-details {
  flex: 1;
  padding: 2rem;
  background: linear-gradient(135deg, #f0ebff, #e9f5ff);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.pet-image-container {
  position: relative;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.pet-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.pet-image-container:hover .pet-image {
  transform: scale(1.05);
}

.pet-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.vaccinated {
  background-color: #dcfce7;
  color: #166534;
}

.not-vaccinated {
  background-color: #fee2e2;
  color: #b91c1c;
}

.pet-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.pet-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.pet-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.pet-tag {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  color: #555;
}

.pet-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 1.5rem;
}

.pet-characteristics {
  margin-top: auto;
}

.pet-characteristics h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #444;
}

.characteristics-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.characteristic-item {
  background-color: rgba(255, 255, 255, 0.7);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  color: #555;
}

.pet-details-placeholder {
  flex: 1;
  padding: 2rem;
  background: linear-gradient(135deg, #f0ebff, #e9f5ff);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(108, 92, 231, 0.2);
  border-radius: 50%;
  border-top-color: #6c5ce7;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-pet-info {
  text-align: center;
  color: #666;
}

.no-pet-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
  opacity: 0.5;
}

/* Form section */
.adoption-form {
  flex: 1;
  padding: 2rem;
  background-color: white;
}

.form-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  margin-bottom: 1rem;
}

.full-width {
  width: 100%;
}

label {
  display: block;
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
  margin-bottom: 0.5rem;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  transition: all 0.3s;
  background-color: #f9f9f9;
}

.input-container:focus-within {
  border-color: #6c5ce7;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  background-color: white;
}

.input-icon {
  padding: 0 12px;
  font-size: 1rem;
}

.textarea-icon {
  padding-top: 10px;
  align-self: flex-start;
}

.form-control {
  flex: 1;
  padding: 0.8rem 0.8rem 0.8rem 0;
  border: none;
  background: transparent;
  font-size: 0.9rem;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

.form-control:focus {
  outline: none;
}

.form-control.error {
  border-color: #ff5252;
}

.error-message {
  display: block;
  color: #ff5252;
  font-size: 0.75rem;
  margin-top: 0.3rem;
}

.character-count {
  text-align: right;
  font-size: 0.75rem;
  color: #666;
  margin-top: 0.3rem;
}

.character-count.warning {
  color: #ff9800;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 0.85rem;
  color: #555;
  user-select: none;
  margin-top: 0.5rem;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 18px;
  width: 18px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
}

.checkbox-label:hover .checkmark {
  background-color: #e0e0e0;
}

.checkbox-label input:checked ~ .checkmark {
  background-color: #6c5ce7;
  border-color: #6c5ce7;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-label input:checked ~ .checkmark:after {
  display: block;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.terms-link {
  color: #6c5ce7;
  text-decoration: none;
  transition: color 0.2s;
}

.terms-link:hover {
  color: #5344c7;
  text-decoration: underline;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.btn-primary {
  background-color: #6c5ce7;
  color: white;
  flex: 1;
  box-shadow: 0 4px 10px rgba(108, 92, 231, 0.2);
}

.btn-primary:hover {
  background-color: #5344c7;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(108, 92, 231, 0.3);
}

.btn-primary:disabled {
  background-color: #a8a5d3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn-secondary {
  background-color: #e5e7eb;
  color: #1f2937;
}

.btn-secondary:hover {
  background-color: #d1d5db;
  transform: translateY(-2px);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

/* Footer section */
.adoption-footer {
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
}

.contact-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
}

.contact-methods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 1rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.contact-icon {
  font-size: 1.2rem;
  width: 40px;
  height: 40px;
  background-color: rgba(108, 92, 231, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-method strong {
  display: block;
  font-size: 0.85rem;
  color: #444;
}

.contact-method p {
  font-size: 0.8rem;
  color: #666;
}

/* Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-icon {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
}

.modal-icon.success {
  background-color: #dcfce7;
  color: #166534;
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.modal-content p {
  font-size: 1rem;
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 900px) {
  .adoption-content {
    flex-direction: column;
  }
  
  .pet-details, .adoption-form {
    width: 100%;
  }
  
  .form-row {
    flex-direction: column;
    gap: 0;
  }
  
  .contact-methods {
    flex-direction: column;
    align-items: center;
  }
  
  .adoption-container {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .adoption-header {
    padding: 1rem;
  }
  
  .adoption-title {
    font-size: 1.5rem;
  }
  
  .pet-details, .adoption-form {
    padding: 1.5rem;
  }
  
  .pet-image {
    height: 200px;
  }
  
  .btn {
    padding: 0.7rem 1rem;
  }
}
</style>