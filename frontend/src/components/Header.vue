<template>
  <header>
    <nav class="navbar">
      <div class="logo">
        <router-link to="/">🐾 AdoptMe!</router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }">&#9776;</span>
      </button>

      <div :class="['nav-container', { open: isMenuOpen }]">
        <div class="nav-links">
          <router-link to="/" @click="closeMenu">Inicio</router-link>
          <router-link to="/about" @click="closeMenu">Sobre Nosotros</router-link>
          <router-link to="/contact" @click="closeMenu">Contacto</router-link>
          <router-link to="/buscar-predicciones" @click="closeMenu">Buscar Predicciones</router-link>
          <router-link
            v-if="authState.isAuthenticated && authState.userRole === 'admin'"
            to="/admin"
            @click="closeMenu"
          >
            Administrador
          </router-link>
        </div>
        <div class="auth-links">
          <router-link
            v-if="!authState.isAuthenticated"
            to="/login"
            class="btn-link"
            @click="closeMenu"
          >
            Iniciar Sesión
          </router-link>
          <router-link
            v-if="!authState.isAuthenticated"
            to="/register"
            class="btn-link"
            @click="closeMenu"
          >
            Registrar
          </router-link>
          <button
            v-if="authState.isAuthenticated"
            @click="logout"
            class="btn-link logout"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import authState from '../authState';
import { ref } from 'vue';

export default {
  setup() {
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      authState.isAuthenticated = false;
      authState.userRole = 'user';
      closeMenu();
    };

    return {
      authState,
      isMenuOpen,
      toggleMenu,
      closeMenu,
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

/* Hamburguesa - Solo visible en móvil */
.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
}

/* Contenedor de navegación */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}

/* Centramos los enlaces de navegación */
.nav-links {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 0 auto;
  padding-left: 2rem;
}

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
  .menu-toggle {
    display: block;
  }

  .nav-container {
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    display: none;
  }

  .nav-container.open {
    display: flex;
    margin-top: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 0.8rem 1rem;
  }

  .nav-links,
  .auth-links {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .nav-links {
    margin-bottom: 1rem;
  }

  .nav-links a,
  .btn-link {
    width: 100%;
  }
}
</style>