<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Layout horizontal con dos columnas -->
      <div class="login-layout">
        <!-- Columna izquierda: Logo e información -->
        <div class="login-info">
          <div class="logo-container">
            <div class="logo">
              <span class="logo-icon">🐾</span>
            </div>
          </div>
          <h1>¡Bienvenido de nuevo!</h1>
          <p class="info-text">Inicia sesión para acceder a tu cuenta y descubrir todas las mascotas disponibles para adopción.</p>
          <div class="info-benefits">
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Encuentra tu mascota ideal</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Gestiona tus solicitudes de adopción</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-icon">✓</span>
              <span>Recibe notificaciones personalizadas</span>
            </div>
          </div>
          <!-- <div class="info-footer">
            <p>¿No tienes una cuenta?</p> 
            <a href="../views/Register.vue" class="register-link">Regístrate</a>
          </div> -->
        </div>
        
        <!-- Columna derecha: Formulario -->
        <div class="login-form-container">
          <h2>Iniciar Sesión</h2>
          
          <form @submit.prevent="loginUser" class="login-form">
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
              <div class="label-row">
                <label for="password">Contraseña</label>
                <a href="#" class="forgot-link">¿Olvidaste tu contraseña?</a>
              </div>
              <div class="input-container">
                <span class="input-icon">🔒</span>
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  id="password" 
                  v-model="password" 
                  required 
                  placeholder="Tu contraseña"
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
            </div>
            
            <div class="remember-container">
              <label class="remember-label">
                <input type="checkbox" v-model="rememberMe" />
                <span class="checkmark"></span>
                <span>Recordarme</span>
              </label>
            </div>
            
            <button 
              type="submit" 
              class="login-button" 
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="spinner"></span>
              <span v-else>Iniciar Sesión</span>
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
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false,
      isLoading: false,
      generalError: '',
      errors: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    clearError(field) {
      this.errors[field] = '';
      this.generalError = '';
    },
    validateForm() {
      let isValid = true;
      
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
      
      return isValid;
    },
    async loginUser() {
      // Limpiar errores previos
      this.errors = { email: '', password: '' };
      this.generalError = '';
      
      // Validar formulario
      if (!this.validateForm()) return;
      
      this.isLoading = true;
      
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Guardamos el token y el rol en el almacenamiento local
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({ role: response.data.role }));
        
        // Si el usuario marcó "recordarme", guardamos el email
        if (this.rememberMe) {
          localStorage.setItem('rememberedEmail', this.email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }

        // Actualizamos el estado de autenticación
        authState.isAuthenticated = true;
        authState.userRole = response.data.role || 'user';

        // Redirigir al usuario a la página principal
        this.$router.push('/');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        
        if (error.response) {
          // Error de respuesta del servidor
          if (error.response.status === 401) {
            this.generalError = 'Credenciales incorrectas. Verifica tu email y contraseña.';
          } else if (error.response.status === 404) {
            this.errors.email = 'Este correo no está registrado en nuestro sistema.';
          } else {
            this.generalError = error.response.data.message || 'Error al iniciar sesión. Inténtalo de nuevo.';
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
    }
  },
  mounted() {
    // Recuperar email si existe en localStorage
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
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

.login-page {
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

.login-page::before {
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

.login-container {
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.login-layout {
  display: flex;
  flex-direction: row;
}

/* Columna izquierda - Información */
.login-info {
  flex: 1;
  padding: 40px;
  background: linear-gradient(135deg, #f0ebff, #e9f5ff);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.login-info::before {
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

.login-info h1 {
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

.register-link {
  color: #6c5ce7;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.2s;
}

.register-link:hover {
  color: #5344c7;
  text-decoration: underline;
}

/* Columna derecha - Formulario */
.login-form-container {
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
}

.login-form-container h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
}

.login-form {
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

.label-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #444;
  margin-bottom: 8px;
}

.forgot-link {
  font-size: 12px;
  color: #6c5ce7;
  text-decoration: none;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #5344c7;
  text-decoration: underline;
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

input[type="email"],
input[type="password"],
input[type="text"] {
  flex: 1;
  padding: 12px 12px 12px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  font-family: 'Poppins', sans-serif;
}

input:focus {
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

.remember-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.remember-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  user-select: none;
}

.remember-label input {
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

.remember-label:hover .checkmark {
  background-color: #e0e0e0;
}

.remember-label input:checked ~ .checkmark {
  background-color: #6c5ce7;
  border-color: #6c5ce7;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.remember-label input:checked ~ .checkmark:after {
  display: block;
  left: 6px;
  top: 2px;
  width: 4px;
  height: 9px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.login-button {
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
}

.login-button:hover {
  background-color: #5344c7;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(108, 92, 231, 0.3);
}

.login-button:disabled {
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

.social-login {
  margin-top: 20px;
}

.social-divider {
  text-align: center;
  position: relative;
  margin-bottom: 15px;
  color: #888;
  font-size: 14px;
}

.social-divider::before,
.social-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 50px);
  height: 1px;
  background-color: #ddd;
}

.social-divider::before {
  left: 0;
}

.social-divider::after {
  right: 0;
}

.social-buttons {
  display: flex;
  gap: 10px;
}

.social-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
}

.social-button:hover {
  background-color: #f5f5f5;
  transform: translateY(-2px);
}

.social-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
  font-weight: 600;
}

.google .social-icon {
  color: #DB4437;
  background-color: rgba(219, 68, 55, 0.1);
}

.facebook .social-icon {
  color: #4267B2;
  background-color: rgba(66, 103, 178, 0.1);
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
  .login-layout {
    flex-direction: column;
  }
  
  .login-info, .login-form-container {
    padding: 30px 20px;
  }
  
  .login-info {
    text-align: center;
  }
  
  .benefit-item {
    justify-content: center;
  }
  
  .login-container {
    max-width: 450px;
  }
}

@media (max-width: 480px) {
  .login-container {
    border-radius: 12px;
  }
  
  .login-info, .login-form-container {
    padding: 20px 15px;
  }
  
  .login-info h1 {
    font-size: 22px;
  }
  
  .logo {
    width: 60px;
    height: 60px;
  }
  
  .logo-icon {
    font-size: 28px;
  }
  
  .login-form-container h2 {
    font-size: 20px;
  }
  
  .social-buttons {
    flex-direction: column;
  }
}
</style>