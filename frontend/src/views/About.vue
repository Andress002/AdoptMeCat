<template>
  <div class="about-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Sobre Nosotros</h1>
          <p class="tagline">Transformando vidas, un hogar a la vez</p>
          <p>En Mundo Gatuno, creemos que cada animal merece amor, cuidado y un hogar donde pueda florecer. Nuestra misión es hacer que la adopción responsable sea una experiencia significativa y llena de alegría.</p>
        </div>
      </div>
      <div class="hero-shape"></div>
    </section>

    <!-- Misión Section -->
    <section class="mission-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Nuestra Misión</h2>
          <div class="section-divider"></div>
        </div>
        <div class="mission-content">
          <div class="mission-image">
            <img src="../assets/images/mission.jpg" alt="Nuestra misión" onerror="this.src='https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'">
          </div>
          <div class="mission-text">
            <p>
              En Adopt Me, nuestra pasión es conectar corazones y hogares. No solo rescatamos gatos, sino que también les brindamos una segunda oportunidad, asegurándonos de que encuentren familias que los amen y los cuiden para siempre.
            </p>
            <p>
              Nos esforzamos por educar a la comunidad sobre la importancia de la adopción responsable, la esterilización y el respeto hacia los animales. Creemos que cada pequeño acto de bondad puede generar un cambio enorme en la vida de estos seres maravillosos.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Por Qué Adoptar Section -->
    <section id="why-adopt" class="why-adopt-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">¿Por Qué Adoptar?</h2>
          <div class="section-divider"></div>
          <p class="section-intro">La adopción de un gato es más que simplemente llevar un nuevo amigo a casa: es un acto de amor, compasión y compromiso.</p>
        </div>
        <div class="reasons-grid">
          <div class="reason-card">
            <div class="reason-icon">❤️</div>
            <h3>Amor Incondicional</h3>
            <p>Los animales adoptados crean lazos inquebrantables con sus familias. Su gratitud y cariño son infinitos, y cada día te recordarán lo especial que eres para ellos.</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">🏠</div>
            <h3>Salvar una Vida</h3>
            <p>Muchos animales en refugios han sufrido el abandono o el maltrato. Al adoptar, no solo les das un hogar, sino también la oportunidad de vivir una vida digna y feliz.</p>
          </div>
          <div class="reason-card">
            <div class="reason-icon">🌍</div>
            <h3>Haces un Impacto Positivo</h3>
            <p>Al adoptar, ayudas a reducir la sobrepoblación en refugios y promueves una cultura de respeto y cuidado hacia los animales.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Predictor Section -->
    <section class="predictor-section">
      <div class="container">
        <div class="predictor-content">
          <h2>¿Quieres saber si una persona adoptará?</h2>
          <p>Utiliza nuestro predictor inteligente para evaluar la compatibilidad</p>
          <router-link to="/predictor" class="btn btn-accent">
            Ir al Predictor
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      testimonials: [
        {
          name: 'Juan y María',
          quote: 'Adoptar a nuestro gato Simba ha sido una de las mejores decisiones de nuestras vidas. Nos llena de alegría con sus travesuras y nos acompaña en cada momento. Gracias a Mundo Gatuno por hacer posible este encuentro.',
          image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        },
        {
          name: 'Laura',
          quote: 'Nunca pensé cuánto amor podía traer un gato a nuestra vida hasta que adoptamos a Luna. Desde el primer día, sentimos su gratitud y cariño. La adopción nos ha cambiado en formas que nunca imaginamos.',
          image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        },
        {
          name: 'Pedro',
          quote: 'Después de perder a mi gato de 15 años, pensé que nunca podría volver a tener otro. Mundo Gatuno me ayudó a encontrar a Max, quien ha traído nueva alegría a mi vida. Su proceso de adopción fue impecable.',
          image: 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
        }
      ]
    };
  },
  methods: {
    initAnimations() {
      const elements = document.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      }, { threshold: 0.3 });
      elements.forEach(el => observer.observe(el));
    }
  },
  mounted() {
    this.initAnimations();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary: #FF6B81;
  --secondary: #FFB86F;
  --accent: #6C5CE7;
  --light-bg: #FFFDF9;
  --dark-text: #2C3E50;
  --card-bg: #ffffff;
  --shadow: rgba(0, 0, 0, 0.1);
}

/* Estilos generales */
.about-container {
  font-family: 'Inter', sans-serif;
  color: var(--dark-text);
  min-height: 100vh;
  background-color: #FAFAFA;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--accent);
  position: relative;
  display: inline-block;
}

.section-divider {
  width: 60px;
  height: 4px;
  background: var(--primary);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.section-intro {
  max-width: 700px;
  margin: 1.5rem auto 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background-color: var(--primary);
  color: white;
  box-shadow: 0 4px 15px rgba(255, 107, 129, 0.3);
}

.btn-primary:hover {
  background-color: #ff5371;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 129, 0.4);
}

.btn-accent {
  background-color: var(--accent);
  color: white;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.3);
}

.btn-accent:hover {
  background-color: #5b4bd4;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(108, 92, 231, 0.4);
}

/* Hero Section */
.hero-section {
  padding: 8rem 0 6rem;
  background: linear-gradient(135deg, #ffe9f3, #fff4d2);
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-shape {
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 80px;
  background-color: #FAFAFA;
  clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 100%);
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-content h1 {
  font-size: 4rem;
  font-weight: 800;
  color: var(--primary);
  margin-bottom: 1rem;
  line-height: 1.1;
  animation: fadeInUp 1s ease;
}

.hero-content .tagline {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--accent);
  animation: fadeInUp 1s ease 0.2s forwards;
  opacity: 0;
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  animation: fadeInUp 1s ease 0.4s forwards;
  opacity: 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Sección Misión */
.mission-section {
  padding: 6rem 0;
  background: #fff;
  position: relative;
}

.mission-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.mission-image {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.mission-image::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  width: 100px;
  height: 100px;
  background-color: rgba(255, 107, 129, 0.2);
  border-radius: 50%;
  z-index: -1;
}

.mission-image::after {
  content: "";
  position: absolute;
  bottom: -30px;
  right: -30px;
  width: 150px;
  height: 150px;
  background-color: rgba(108, 92, 231, 0.15);
  border-radius: 50%;
  z-index: -1;
}

.mission-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  transition: transform 0.5s ease;
}

.mission-image:hover img {
  transform: scale(1.05);
}

.mission-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mission-text p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

.mission-text .btn {
  align-self: flex-start;
  margin-top: 1rem;
}

/* Sección Por Qué Adoptar */
.why-adopt-section {
  padding: 6rem 0;
  background-color: #f8f9fa;
  position: relative;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.reason-card {
  background: var(--card-bg);
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.reason-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.reason-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.reason-icon {
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  display: inline-block;
  position: relative;
}

.reason-icon::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: rgba(255, 107, 129, 0.1);
  border-radius: 50%;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.reason-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
  font-weight: 700;
}

.reason-card p {
  color: #666;
  line-height: 1.6;
}

/* Predictor Section */
.predictor-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, #FAFAFA, #FAFAFA);
  color: rgb(0, 0, 0);
  text-align: center;
  position: relative;
  overflow: hidden;
}

.predictor-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
}

.predictor-content {
  max-width: 700px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.predictor-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.predictor-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.predictor-content .btn {
  background-color: white;
  color: var(--accent);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.predictor-content .btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Animación Fade In */
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease-out, transform 1s ease-out;
}

.fade-in.appear {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (max-width: 992px) {
  .mission-content {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .mission-image {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .mission-text .btn {
    align-self: center;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 3rem;
  }
  
  .section-title {
    font-size: 2.2rem;
  }
  
  .hero-section,
  .mission-section,
  .why-adopt-section,
  .predictor-section {
    padding: 4rem 0;
  }
  
  .reason-card {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content .tagline {
    font-size: 1.3rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .predictor-content h2 {
    font-size: 2rem;
  }
}
</style>