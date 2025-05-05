<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">🐾 AdoptMe!</router-link>
      </div>
      <div class="nav-links">
        <router-link to="/">Inicio</router-link>
        <router-link to="/about">Sobre Nosotros</router-link>
        <router-link to="/contact">Contacto</router-link>
        <router-link to="/buscar-predicciones">Buscar Predicciones</router-link>
        <router-link v-if="authState.isAuthenticated && authState.userRole === 'admin'" to="/admin">
          Administrador
        </router-link>
      </div>
      <div class="auth-links">
        <router-link v-if="!authState.isAuthenticated" to="/login" class="btn-link">
          Iniciar Sesión
        </router-link>
        <router-link v-if="!authState.isAuthenticated" to="/register" class="btn-link">
          Registrar
        </router-link>
        <button v-if="authState.isAuthenticated" @click="logout" class="btn-link logout">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  </header>
</template>

<script>
import authState from '../authState';

export default {
  setup() {
    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      authState.isAuthenticated = false;
      authState.userRole = 'user';
    };

    return {
      authState,
      logout,
    };
  },
};
</script>

<style scoped>
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(90deg, #f9e8e8, #f3b576);
  padding: 0.3rem 2rem;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.logo a {
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
}

.nav-links,
.auth-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}

.nav-links a {
  position: relative;
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.nav-links a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  left: 0;
  bottom: -4px;
  background-color: #fff;
  transition: width 0.3s ease-in-out;
}

.nav-links a:hover::after {
  width: 100%;
}

.nav-links a:hover {
  color: #ffece6;
}

.btn-link {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 0.5rem 1.1rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-link:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.logout {
  border: none;
  outline: none;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links,
  .auth-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin-top: 0.8rem;
  }

  .navbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
