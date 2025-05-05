<template>
  <div class="register-page">
    <div class="register-container">
      <!-- Layout horizontal con dos columnas -->
      <div class="register-layout">
        <!-- Columna izquierda: Logo e información -->
        <div class="register-info">
          <div class="logo-container">
            <div class="logo">
              <span class="logo-icon">🐾</span>
            </div>
          </div>
          <h1>Únete a nuestra comunidad</h1>
          <p class="info-text">Crea una cuenta para acceder a todas las funciones y comenzar a explorar nuestro catálogo de mascotas en adopción.</p>
          <div class="info-benefits">
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Acceso a todas las mascotas disponibles</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Proceso de adopción simplificado</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Notificaciones sobre nuevas mascotas</span>
            </div>
          </div>
          <!-- <div class="info-footer">
            <p>¿Ya tienes una cuenta?</p>
            <a href="/login" class="login-link">Iniciar Sesión</a>
          </div> -->
        </div>
        
        <!-- Columna derecha: Formulario -->
        <div class="register-form-container">
          <h2>Crear una cuenta</h2>
          
          <form @submit.prevent="registerUser" class="register-form">
            <div class="form-group" :class="{ 'error': errors.username }">
              <label for="username">Nombre de Usuario</label>
              <div class="input-container">
                <span class="input-icon">👤</span>
                <input 
                  type="text" 
                  id="username" 
                  v-model="username" 
                  required 
                  placeholder="Tu nombre de usuario"
                  @focus="clearError('username')"
                />
              </div>
              <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
            </div>
            
            <div class="form-group" :class="{ 'error': errors.email }">
              <label for="email">Correo Electrónico</label>
              <div class="input-container">
                <span class="input-icon">✉️</span>
                <input 
                  type="email" 
                  id="email" 
                  v-model="email" 
                  required 
                  placeholder="tu@email.com"
                  @focus="clearError('email')"
                />
              </div>
              <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
            </div>
            
            <div class="form-group" :class="{ 'error': errors.password }">
              <label for="password">Contraseña</label>
              <div class="input-container">
                <span class="input-icon">🔒</span>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  required 
                  placeholder="Crea una contraseña segura"
                  @focus="clearError('password')"
                />
                <button 
                  type="button" 
                  class="toggle-password" 
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? '👁️' : '👁️‍🗨️' }}
                </button>
              </div>
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              <div class="password-strength" v-if="password">
                <div class="strength-bar">
                  <div 
                    class="strength-fill" 
                    :style="{ width: passwordStrength.percent + '%' }"
                    :class="passwordStrength.class"
                  ></div>
                </div>
                <span class="strength-text" :class="passwordStrength.class">
                  {{ passwordStrength.text }}
                </span>
              </div>
            </div>
            
            <div class="form-group" v-if="showAdminRole">
              <label for="role">Rol</label>
              <div class="input-container">
                <span class="input-icon">🔑</span>
                <select id="role" v-model="role" class="form-control">
                  <option value="user">Usuario</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>
            </div>
            
            <div class="terms-container">
              <label class="terms-label">
                <input type="checkbox" v-model="acceptTerms" />
                <span class="checkmark"></span>
                <span>Acepto los <a href="#" class="terms-link">Términos y Condiciones</a></span>
              </label>
            </div>
            
            <button 
              type="submit" 
              class="register-button" 
              :disabled="isLoading || !acceptTerms"
            >
              <span v-if="isLoading" class="spinner"></span>
              <span v-else>Crear Cuenta</span>
            </button>
          </form>
        </div>
      </div>
      
      <div v-if="generalError" class="general-error">
        <span class="error-icon">⚠️</span>
        <span>{{ generalError }}</span>
        <button class="close-error" @click="generalError = ''">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import authState from '../authState';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      role: 'user',
      showPassword: false,
      acceptTerms: false,
      isLoading: false,
      showAdminRole: false,
      generalError: '',
      errors: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  computed: {
    passwordStrength() {
      if (!this.password) {
        return { percent: 0, class: '', text: '' };
      }
      
      let strength = 0;
      
      // Longitud mínima
      if (this.password.length >= 8) strength += 25;
      
      // Contiene letras minúsculas
      if (/[a-z]/.test(this.password)) strength += 25;
      
      // Contiene letras mayúsculas
      if (/[A-Z]/.test(this.password)) strength += 25;
      
      // Contiene números o caracteres especiales
      if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(this.password)) strength += 25;
      
      let strengthClass = '';
      let strengthText = '';
      
      if (strength <= 25) {
        strengthClass = 'weak';
        strengthText = 'Débil';
      } else if (strength <= 50) {
        strengthClass = 'medium';
        strengthText = 'Media';
      } else if (strength <= 75) {
        strengthClass = 'good';
        strengthText = 'Buena';
      } else {
        strengthClass = 'strong';
        strengthText = 'Fuerte';
      }
      
      return {
        percent: strength,
        class: strengthClass,
        text: strengthText
      };
    }
  },
  methods: {
    clearError(field) {
      this.errors[field] = '';
      this.generalError = '';
    },
    validateForm() {
      let isValid = true;
      
      // Validar nombre de usuario
      if (!this.username) {
        this.errors.username = 'El nombre de usuario es requerido';
        isValid = false;
      } else if (this.username.length < 3) {
        this.errors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
        isValid = false;
      }
      
      // Validar email
      if (!this.email) {
        this.errors.email = 'El correo electrónico es requerido';
        isValid = false;
      } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
        this.errors.email = 'Ingresa un correo electrónico válido';
        isValid = false;
      }
      
      // Validar contraseña
      if (!this.password) {
        this.errors.password = 'La contraseña es requerida';
        isValid = false;
      } else if (this.password.length < 6) {
        this.errors.password = 'La contraseña debe tener al menos 6 caracteres';
        isValid = false;
      }
      
      // Validar términos
      if (!this.acceptTerms) {
        this.generalError = 'Debes aceptar los términos y condiciones';
        isValid = false;
      }
      
      return isValid;
    },
    async registerUser() {
      // Limpiar errores previos
      this.errors = { username: '', email: '', password: '' };
      this.generalError = '';
      
      // Validar formulario
      if (!this.validateForm()) return;
      
      this.isLoading = true;
      
      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role,
        });

        // Guardamos el token y el rol en el almacenamiento local
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ role: this.role }));

        // Actualizamos el estado de autenticación
        authState.isAuthenticated = true;
        authState.userRole = this.role;

        // Redirigir al usuario a la página principal
        this.$router.push('/');
      } catch (error) {
        console.error('Error al registrarse:', error);
        
        if (error.response) {
          // Error de respuesta del servidor
          if (error.response.status === 409) {
            if (error.response.data.message.includes('email')) {
              this.errors.email = 'Este correo electrónico ya está registrado';
            } else if (error.response.data.message.includes('username')) {
              this.errors.username = 'Este nombre de usuario ya está en uso';
            } else {
              this.generalError = error.response.data.message || 'Error al registrarse. Inténtalo de nuevo.';
            }
          } else {
            this.generalError = error.response.data.message || 'Error al registrarse. Inténtalo de nuevo.';
          }
        } else if (error.request) {
          // Error de conexión
          this.generalError = 'No se pudo conectar con el servidor. Verifica tu conexión a internet.';
        } else {
          // Otro tipo de error
          this.generalError = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
        }
      } finally {
        this.isLoading = false;
      }
    },
    toggleAdminRole() {
      // Método para activar/desactivar la opción de rol de administrador
      this.showAdminRole = !this.showAdminRole;
    }
  },
  mounted() {
    // Detectar combinación de teclas para mostrar el campo de rol (Alt+Shift+A)
    document.addEventListener('keydown', (e) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        this.toggleAdminRole();
      }
    });
  },
  beforeUnmount() {
    // Limpiar el event listener
    document.removeEventListener('keydown', this.toggleAdminRole);
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

.register-page {
  font-family: 'Poppins', sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ffe9f3, #fff4d2);
  padding: 20px;
  animation: bgPulse 10s ease infinite;
  position: relative;
  overflow: hidden;
}

.register-page::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
  animation: rotate 20s linear infinite;
  z-index: 1;
  pointer-events: none;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bgPulse {
  0% { background-position: left top; }
  50% { background-position: right bottom; }
  100% { background-position: left top; }
}

.register-container {
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.register-layout {
  display: flex;
  flex-direction: row;
}

/* Columna izquierda - Información */
.register-info {
  flex: 1;
  padding: 40px;
  background: linear-gradient(135deg, #f0ebff, #e9f5ff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.register-info::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236c5ce7' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(108, 92, 231, 0.2);
}

.logo-icon {
  font-size: 36px;
}

.register-info h1 {
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.info-text {
  font-size: 15px;
  color: #555;
  margin-bottom: 30px;
  line-height: 1.6;
  text-align: center;
}

.info-benefits {
  margin-bottom: 30px;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.benefit-icon {
  width: 24px;
  height: 24px;
  background-color: #6c5ce7;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 14px;
}

.info-footer {
  margin-top: auto;
  text-align: center;
}

.info-footer p {
  margin-bottom: 8px;
  color: #666;
}

.login-link {
  color: #6c5ce7;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.2s;
}

.login-link:hover {
  color: #5344c7;
  text-decoration: underline;
}

/* Columna derecha - Formulario */
.register-form-container {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.register-form-container h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}

.register-form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group.error .input-container {
  border-color: #ff5252;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
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
  font-size: 16px;
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  flex: 1;
  padding: 12px 12px 12px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23555' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 40px;
}

input:focus, select:focus {
  outline: none;
}

.toggle-password {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 12px;
  font-size: 16px;
}

.error-message {
  display: block;
  color: #ff5252;
  font-size: 12px;
  margin-top: 5px;
}

.password-strength {
  margin-top: 8px;
}

.strength-bar {
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.strength-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s ease;
}

.strength-fill.weak {
  background-color: #ff5252;
}

.strength-fill.medium {
  background-color: #ffb86f;
}

.strength-fill.good {
  background-color: #6c5ce7;
}

.strength-fill.strong {
  background-color: #38d39f;
}

.strength-text {
  font-size: 11px;
  float: right;
}

.strength-text.weak {
  color: #ff5252;
}

.strength-text.medium {
  color: #ffb86f;
}

.strength-text.good {
  color: #6c5ce7;
}

.strength-text.strong {
  color: #38d39f;
}

.terms-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.terms-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  user-select: none;
}

.terms-label input {
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

.terms-label:hover .checkmark {
  background-color: #e0e0e0;
}

.terms-label input:checked ~ .checkmark {
  background-color: #6c5ce7;
  border-color: #6c5ce7;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.terms-label input:checked ~ .checkmark:after {
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

.register-button {
  width: 100%;
  padding: 14px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(108, 92, 231, 0.2);
  margin-top: auto;
}

.register-button:hover {
  background-color: #5344c7;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(108, 92, 231, 0.3);
}

.register-button:disabled {
  background-color: #a8a5d3;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.general-error {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ffe3e3;
  color: #d63031;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 13px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 90%;
  animation: slideUp 0.3s forwards;
}

.error-icon {
  margin-right: 8px;
}

.close-error {
  background: none;
  border: none;
  color: #d63031;
  font-size: 18px;
  cursor: pointer;
  margin-left: 8px;
  padding: 0 5px;
}

@keyframes slideUp {
  from { opacity: 0; transform: translate(-50%, 20px); }
  to { opacity: 1; transform: translate(-50%, 0); }
}

/* Responsive */
@media (max-width: 768px) {
  .register-layout {
    flex-direction: column;
  }
  
  .register-info, .register-form-container {
    padding: 30px 20px;
  }
  
  .register-info {
    text-align: center;
  }
  
  .benefit-item {
    justify-content: center;
  }
  
  .register-container {
    max-width: 450px;
  }
}

@media (max-width: 480px) {
  .register-container {
    border-radius: 12px;
  }
  
  .register-info, .register-form-container {
    padding: 20px 15px;
  }
  
  .register-info h1 {
    font-size: 22px;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
  
  .logo-icon {
    font-size: 28px;
  }
  
  .register-form-container h2 {
    font-size: 20px;
  }
}
</style>