<!-- App.vue -->
<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <footer>
      <p>&copy; 2024 Adopción de Gatos. Todos los derechos reservados.</p>
    </footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';

export default {
  components: {
    Header
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&display=swap');

:root {
  --primary-color: #000000;           /* Rosa vibrante */
  --secondary-color: #FFE66D;         /* Amarillo pastel */
  --accent-color: #6C5CE7;            /* Morado brillante */
  --background-color: #FFF8F1;        /* Fondo suave */
  --text-color: #2C3E50;              /* Texto oscuro */
  --footer-bg: #000000;               /* Mismo que primary */
  --footer-text: #fff;
  --font-family: 'Baloo 2', cursive;
}

#app {
  font-family: var(--font-family);
  color: var(--text-color);
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding-bottom: 2rem;
}

footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  text-align: center;
  padding: 1rem 0;
  font-weight: 600;
  letter-spacing: 0.5px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>
