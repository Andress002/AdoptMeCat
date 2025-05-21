<template>
  <div class="contact-container">
    <!-- Decoración de fondo -->
    <div class="background-decoration">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="page-header">
      <h1>Contáctanos</h1>
      <p class="subtitle">Estamos aquí para responder tus preguntas y ayudarte en el proceso de adopción</p>
    </div>

    <div class="contact-wrapper">
      <div class="contact-info">
        <div class="info-header">
          <h2>¿Cómo podemos ayudarte?</h2>
          <p>Nuestro equipo está listo para asistirte en cada paso del camino hacia la adopción de tu nuevo amigo felino.</p>
        </div>
        
        <div class="contact-details">
          <div class="contact-detail">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <div class="detail-content">
              <h3>Llámanos</h3>
              <p>310 345 0342</p>
              <p class="detail-note">Lunes a Viernes: 9am - 6pm</p>
            </div>
          </div>
          
          <div class="contact-detail">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            <div class="detail-content">
              <h3>Escríbenos</h3>
              <p>AdoptMe@gmail.com</p>
              <p class="detail-note">Respondemos en 24 horas</p>
            </div>
          </div>
          
          <div class="contact-detail">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="detail-content">
              <h3>Visítanos</h3>
              <p>Cartagena, Colombia</p>
              <p class="detail-note">Cita previa requerida</p>
            </div>
          </div>
        </div>
        
        <div class="social-media">
          <h3>Síguenos</h3>
          <div class="social-icons">
            <a href="#" class="social-icon" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" class="social-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" class="social-icon" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <div class="contact-form">
        <div class="form-header">
          <h2>Envíanos un mensaje</h2>
          <p>Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
        </div>
        
        <form @submit.prevent="handleForm">
          <div class="form-group" :class="{ 'has-error': errors.name }">
            <div class="input-wrapper">
              <input 
                id="name" 
                type="text" 
                v-model="name" 
                placeholder=" " 
                @focus="clearError('name')"
                @blur="validateField('name')"
                required 
              />
              <label for="name">Nombre Completo</label>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
            </div>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.email }">
            <div class="input-wrapper">
              <input 
                id="email" 
                type="email" 
                v-model="email" 
                placeholder=" " 
                @focus="clearError('email')"
                @blur="validateField('email')"
                required 
              />
              <label for="email">Correo Electrónico</label>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
          </div>
          
          <div class="form-group" :class="{ 'has-error': errors.phone }">
            <div class="input-wrapper">
              <input 
                id="phone" 
                type="tel" 
                v-model="phone" 
                placeholder=" " 
                @focus="clearError('phone')"
                @blur="validateField('phone')"
              />
              <label for="phone">Teléfono (Opcional)</label>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
            </div>
          </div>
          
          <div class="form-group" :class="{ 'has-error': errors.subject }">
            <div class="select-wrapper">
              <select 
                id="subject" 
                v-model="subject"
                @focus="clearError('subject')"
                @blur="validateField('subject')"
                required
              >
                <option value="" disabled selected>Selecciona un tema</option>
                <option value="adoption">Proceso de adopción</option>
                <option value="donation">Donaciones</option>
                <option value="volunteer">Voluntariado</option>
                <option value="other">Otro</option>
              </select>
              <label for="subject">Asunto</label>
              <svg class="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span v-if="errors.subject" class="error-message">{{ errors.subject }}</span>
            </div>
          </div>

          <div class="form-group" :class="{ 'has-error': errors.message }">
            <div class="input-wrapper">
              <textarea 
                id="message" 
                v-model="message" 
                placeholder=" " 
                rows="4" 
                @focus="clearError('message')"
                @blur="validateField('message')"
                required
              ></textarea>
              <label for="message">Tu Mensaje</label>
              <svg class="input-icon textarea-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>
          </div>
          
          <div class="form-group checkbox-group">
            <label class="checkbox-container">
              <input type="checkbox" v-model="newsletter">
              <span class="checkmark"></span>
              <span class="checkbox-text">Suscribirme al boletín de noticias</span>
            </label>
          </div>

          <button 
            type="submit" 
            class="btn-submit" 
            :disabled="isSubmitting || !isFormValid"
            :class="{ 'submitting': isSubmitting, 'disabled': !isFormValid && !isSubmitting }"
          >
            <span v-if="!isSubmitting">Enviar Mensaje</span>
            <span v-else class="loading-text">Enviando...</span>
            <svg v-if="!isSubmitting" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            <div v-else class="spinner"></div>
          </button>
        </form>
        
        <transition name="fade">
          <div v-if="showSuccessMessage" class="success-message">
            <div class="success-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>¡Mensaje Enviado!</h3>
            <p>Gracias por contactarnos. Te responderemos lo antes posible.</p>
            <button @click="resetForm" class="btn-reset">Enviar otro mensaje</button>
          </div>
        </transition>
      </div>
    </div>
    
    <div class="faq-section">
      <h2>Preguntas Frecuentes</h2>
      <div class="faq-container">
        <div 
          v-for="(faq, index) in faqs" 
          :key="index" 
          class="faq-item"
          :class="{ 'active': activeFaq === index }"
        >
          <div class="faq-question" @click="toggleFaq(index)">
            <h3>{{ faq.question }}</h3>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="faq-icon">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
          <transition name="slide">
            <div v-if="activeFaq === index" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, onMounted } from 'vue';
import axios from 'axios';

export default {
  name: 'Contact',
  setup() {
    // Estado del formulario
    const name = ref('');
    const email = ref('');
    const phone = ref('');
    const subject = ref('');
    const message = ref('');
    const newsletter = ref(false);
    const isSubmitting = ref(false);
    const showSuccessMessage = ref(false);
    const errors = reactive({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    // FAQs
    const activeFaq = ref(null);
    const faqs = [
      {
        question: "¿Cuál es el proceso de adopción?",
        answer: "Nuestro proceso de adopción incluye completar un formulario, una entrevista, visita al hogar y finalmente la adopción. Todo el proceso está diseñado para asegurar que nuestros gatos encuentren hogares amorosos y adecuados."
      },
      {
        question: "¿Cuáles son los requisitos para adoptar?",
        answer: "Para adoptar, debes ser mayor de edad, tener un hogar estable, estar dispuesto a proporcionar atención veterinaria regular, y comprometerte a cuidar del animal durante toda su vida."
      },
      {
        question: "¿Hay algún costo asociado con la adopción?",
        answer: "Sí, hay una cuota de adopción que cubre vacunas, esterilización/castración, microchip y exámenes veterinarios básicos. Esta cuota varía dependiendo de la edad y necesidades específicas del gato."
      },
      {
        question: "¿Puedo devolver al gato si no funciona?",
        answer: "Entendemos que a veces las cosas no salen como se planearon. Si por alguna razón no puedes quedarte con el gato, te pedimos que nos lo devuelvas a nosotros en lugar de darlo a otra persona o refugio."
      },
      {
        question: "¿Cómo puedo ayudar si no puedo adoptar?",
        answer: "¡Hay muchas formas de ayudar! Puedes hacer donaciones, ser voluntario, convertirte en hogar temporal, o ayudar a difundir información sobre nuestros gatos en redes sociales."
      }
    ];

    // Validación computada para habilitar/deshabilitar el botón
    const isFormValid = computed(() => {
      return name.value.trim() !== '' &&
             email.value.trim() !== '' &&
             isValidEmail(email.value) &&
             subject.value !== '' &&
             message.value.trim() !== '';
    });

    // Métodos de validación
    const isValidEmail = (email) => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    };

    const isValidPhone = (phone) => {
      if (!phone) return true; // Opcional
      const phonePattern = /^[0-9\s\-\+]{7,15}$/;
      return phonePattern.test(phone);
    };

    const validateField = (field) => {
      if (field === 'name' && !name.value.trim()) {
        errors.name = 'Por favor, ingresa tu nombre';
      } else if (field === 'name') {
        errors.name = '';
      }

      if (field === 'email') {
        if (!email.value.trim()) {
          errors.email = 'Por favor, ingresa tu correo electrónico';
        } else if (!isValidEmail(email.value)) {
          errors.email = 'Por favor, ingresa un correo electrónico válido';
        } else {
          errors.email = '';
        }
      }

      if (field === 'phone') {
        if (phone.value && !isValidPhone(phone.value)) {
          errors.phone = 'Por favor, ingresa un número de teléfono válido';
        } else {
          errors.phone = '';
        }
      }

      if (field === 'subject' && !subject.value) {
        errors.subject = 'Por favor, selecciona un asunto';
      } else if (field === 'subject') {
        errors.subject = '';
      }

      if (field === 'message' && !message.value.trim()) {
        errors.message = 'Por favor, ingresa tu mensaje';
      } else if (field === 'message') {
        errors.message = '';
      }
    };

    const clearError = (field) => {
      errors[field] = '';
    };

    const validateForm = () => {
      let isValid = true;

      // Validar nombre
      if (!name.value.trim()) {
        errors.name = 'Por favor, ingresa tu nombre';
        isValid = false;
      }

      // Validar email
      if (!email.value.trim()) {
        errors.email = 'Por favor, ingresa tu correo electrónico';
        isValid = false;
      } else if (!isValidEmail(email.value)) {
        errors.email = 'Por favor, ingresa un correo electrónico válido';
        isValid = false;
      }

      // Validar teléfono (opcional)
      if (phone.value && !isValidPhone(phone.value)) {
        errors.phone = 'Por favor, ingresa un número de teléfono válido';
        isValid = false;
      }

      // Validar asunto
      if (!subject.value) {
        errors.subject = 'Por favor, selecciona un asunto';
        isValid = false;
      }

      // Validar mensaje
      if (!message.value.trim()) {
        errors.message = 'Por favor, ingresa tu mensaje';
        isValid = false;
      }

      return isValid;
    };

    // Enviar formulario
    // Enviar formulario
const handleForm = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;

  try {
    const response = await axios.post('http://localhost:5000/api/contact', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      subject: subject.value,
      message: message.value,
      newsletter: newsletter.value
    });

    console.log('Respuesta del servidor:', response.data);

    showSuccessMessage.value = true;

    alert('!Mensaje enviado con exito! Gracias por contactarnos.')
    resetForm();
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);

    if (error.response) {
      // Error de respuesta del servidor (4xx, 5xx)
      alert(error.response.data.error || `Error ${error.response.status}: No se pudo procesar la solicitud.`);
    } else if (error.request) {
      // Error de red - no se recibió respuesta
      alert('No pudimos conectar con el servidor. Por favor, comprueba tu conexión a internet.');
    } else {
      // Otros errores
      alert('Hubo un problema al enviar el mensaje. Por favor, intenta de nuevo más tarde.');
    }
  } finally {
    isSubmitting.value = false;
  }
};

    // Limpiar formulario
    const resetForm = () => {
      name.value = '';
      email.value = '';
      phone.value = '';
      subject.value = '';
      message.value = '';
      newsletter.value = false;
      showSuccessMessage.value = false;

      Object.keys(errors).forEach(key => {
        errors[key] = '';
      });
    };

    // FAQs
    const toggleFaq = (index) => {
      if (activeFaq.value === index) {
        activeFaq.value = null;
      } else {
        activeFaq.value = index;
      }
    };

    // Abrir Google Maps
    const openGoogleMaps = () => {
      window.open('https://www.google.com/maps/search/?api=1&query=Cartagena,Colombia', '_blank');
    };

    onMounted(() => {
      if (faqs.length > 0) {
        activeFaq.value = 0;
      }
    });

    return {
      name,
      email,
      phone,
      subject,
      message,
      newsletter,
      isSubmitting,
      showSuccessMessage,
      errors,
      activeFaq,
      faqs,
      isFormValid,
      validateField,
      clearError,
      handleForm,
      resetForm,
      toggleFaq,
      openGoogleMaps
    };
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --primary-color: #FF6B81;
  --secondary-color: #FFB86F;
  --accent-color: #FFB86F;
  --text-color: #2C3E50;
  --light-text: #6C7A89;
  --background-color: #F8F9FA;
  --card-bg: #FFFFFF;
  --error-color: #FF5252;
  --success-color: #4CAF50;
  --border-radius: 12px;
  --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* Estilos generales */
.contact-container {
  font-family: 'Poppins', sans-serif;
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh;
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
}

/* Decoración de fondo */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.circle-1 {
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  animation: float 15s infinite alternate ease-in-out;
}

.circle-2 {
  bottom: -150px;
  left: -150px;
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, var(--secondary-color), var(--accent-color));
  animation: float 20s infinite alternate-reverse ease-in-out;
}

.circle-3 {
  top: 40%;
  left: 30%;
  width: 200px;
  height: 200px;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  animation: float 12s infinite alternate ease-in-out;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, 20px) rotate(5deg); }
  100% { transform: translate(-20px, 10px) rotate(-5deg); }
}

/* Encabezado de página */
.page-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  z-index: 1;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.page-header h1::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--light-text);
  max-width: 600px;
  margin: 0 auto;
}

/* Contenedor principal */
.contact-wrapper {
  display: flex;
  background: var(--card-bg);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  overflow: hidden;
  max-width: 1200px;
  margin: 0 auto 4rem;
  position: relative;
  z-index: 1;
}

/* Sección de información de contacto */
.contact-info {
  flex: 1;
  padding: 3rem;
  background: linear-gradient(200deg, var(--accent-color), var(--text-color));
  color: rgb(255, 255, 255);
  position: relative;
  overflow: hidden;
}

.contact-info::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: 0;
}

.info-header {
  position: relative;
  z-index: 1;
  margin-bottom: 2.5rem;
}

.info-header h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.info-header p {
  opacity: 0.9;
  line-height: 1.6;
}

.contact-details {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.contact-detail {
  display: flex;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  padding: 1.2rem;
  transition: var(--transition);
}

.contact-detail:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.2);
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  flex-shrink: 0;
}

.detail-content {
  flex: 1;
}

.detail-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
}

.detail-content p {
  margin: 0;
  font-size: 1rem;
}

.detail-note {
  font-size: 0.85rem !important;
  opacity: 0.8;
  margin-top: 0.3rem !important;
}

/* Redes sociales */
.social-media {
  position: relative;
  z-index: 1;
  margin-bottom: 2.5rem;
}

.social-media h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
  color: white;
}

.social-icon:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-3px);
}

/* Mapa */
.map-container {
  position: relative;
  z-index: 1;
}

.map-container h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.map-placeholder {
  position: relative;
  border-radius: var(--border-radius);
  overflow: hidden;
  height: 200px;
}

.map-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.map-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.map-overlay:hover {
  background: rgba(0, 0, 0, 0.4);
}

.map-button {
  background: white;
  color: var(--accent-color);
  border: none;
  border-radius: 30px;
  padding: 0.8rem 1.5rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
}

.map-button:hover {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

/* Formulario de contacto */
.contact-form {
  flex: 1;
  padding: 3rem;
  background: var(--card-bg);
  position: relative;
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 2rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.form-header p {
  color: var(--light-text);
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  color: var(--light-text);
  z-index: 1;
}

.textarea-icon {
  top: 20px;
}

input, textarea, select {
  width: 100%;
  padding: 12px 12px 12px 45px;
  border: 2px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: var(--transition);
  background-color: #f9f9f9;
  color: var(--text-color);
  font-family: 'Poppins', sans-serif;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%236C7A89' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 15px center;
  background-size: 16px;
}

.select-wrapper {
  position: relative;
}

.select-wrapper .input-icon {
  z-index: 1;
}

label {
  position: absolute;
  top: 12px;
  left: 45px;
  font-size: 0.9rem;
  color: var(--light-text);
  transition: var(--transition);
  pointer-events: none;
  z-index: 1;
}

input:focus, textarea:focus, select:focus {
  border-color: var(--secondary-color);
  outline: none;
  box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
  background-color: white;
}

input:focus + label, textarea:focus + label, select:focus + label,
input:not(:placeholder-shown) + label, textarea:not(:placeholder-shown) + label {
  top: -10px;
  left: 20px;
  font-size: 0.75rem;
  color: var(--secondary-color);
  background-color: white;
  padding: 0 5px;
}

.error-message {
  color: var(--error-color);
  font-size: 0.8rem;
  margin-top: 0.3rem;
  display: block;
}

.has-error input, .has-error textarea, .has-error select {
  border-color: var(--error-color);
}

.has-error .input-icon {
  color: var(--error-color);
}

/* Checkbox personalizado */
.checkbox-group {
  margin-top: 1rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 22px;
  width: 22px;
  background-color: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  transition: var(--transition);
}

.checkbox-container:hover input ~ .checkmark {
  background-color: #f0f0f0;
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 7px;
  top: 3px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-text {
  font-size: 0.9rem;
  color: var(--light-text);
}

/* Botón de envío */
.btn-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, var(--accent-color), var(--text-color));
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: var(--transition);
  cursor: pointer;
  margin-top: 1.5rem;
  position: relative;
  overflow: hidden;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn-submit.disabled {
  background: #ccc;
  cursor: not-allowed;
}

.submitting {
  background: var(--secondary-color);
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Mensaje de éxito */
.success-message {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  z-index: 10;
}

.success-icon {
  width: 80px;
  height: 80px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.success-icon svg {
  color: var(--success-color);
  stroke-width: 3;
}

.success-message h3 {
  font-size: 1.8rem;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.success-message p {
  color: var(--light-text);
  margin-bottom: 2rem;
}

.btn-reset {
  padding: 12px 24px;
  background: var(--secondary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.btn-reset:hover {
  background: var(--primary-color);
  transform: translateY(-3px);
}

/* Sección de FAQ */
.faq-section {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.faq-section h2 {
  text-align: center;
  font-size: 2.2rem;
  color: var(--text-color);
  margin-bottom: 2.5rem;
  position: relative;
}

.faq-section h2::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 2px;
}

.faq-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  background: white;
  border-radius: var(--border-radius);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: var(--transition);
}

.faq-item.active {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.faq-question {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
}

.faq-icon {
  transition: transform 0.3s ease;
  color: var(--secondary-color);
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  color: var(--light-text);
  line-height: 1.6;
}

/* Animaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}

/* Responsive */
@media (max-width: 992px) {
  .contact-wrapper {
    flex-direction: column;
  }
  
  .contact-info, .contact-form {
    padding: 2.5rem;
  }
  
  .page-header h1 {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact-container {
    padding: 3rem 1.5rem;
  }
  
  .page-header h1 {
    font-size: 2.2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .contact-info, .contact-form {
    padding: 2rem;
  }
  
  .info-header h2, .form-header h2 {
    font-size: 1.8rem;
  }
  
  .faq-section h2 {
    font-size: 1.8rem;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 2rem 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .contact-info, .contact-form {
    padding: 1.5rem;
  }
  
  .info-header h2, .form-header h2 {
    font-size: 1.5rem;
  }
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
  }
  
  .faq-question h3 {
    font-size: 1rem;
  }
}
</style>