<template>
  <div class="about-container">
    <!-- Sección Hero -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1>Sobre Nosotros</h1>
          <p class="tagline">Transformando vidas, un hogar a la vez</p>
          <p>En Mundo Gatuno, creemos que cada animal merece amor, cuidado y un hogar donde pueda florecer. Nuestra misión es hacer que la adopción responsable sea una experiencia significativa y llena de alegría.</p>
        </div>
      </div>
    </section>

    <!-- Sección Misión -->
    <section class="mission-section">
      <div class="container">
        <h2 class="section-title">Nuestra Misión</h2>
        <div class="section-divider"></div>
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

    <!-- Sección ¿Por Qué Adoptar? -->
    <section id="why-adopt" class="why-adopt-section">
      <div class="container">
        <h2 class="section-title">¿Por Qué Adoptar?</h2>
        <div class="section-divider"></div>
        <p class="section-intro">La adopción de un gato es más que simplemente llevar un nuevo amigo a casa: es un acto de amor, compasión y compromiso. Aquí te contamos por qué adoptar es una de las mejores decisiones que puedes tomar:</p>
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

    <!-- Sección Testimonios -->
    <section id="testimonials" class="testimonials-section">
      <div class="container">
        <h2 class="section-title">Historias de Adopción</h2>
        <div class="section-divider"></div>
        <p class="section-intro">Cada adopción es un nuevo comienzo, una oportunidad para escribir una historia llena de amor y esperanza. Conoce a algunas familias que han abierto sus corazones a un amigo peludo.</p>
        <div class="testimonials-slider" ref="testimonialsSlider">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
            <div class="testimonial-image">
              <img :src="testimonial.image" :alt="testimonial.name">
            </div>
            <div class="testimonial-content">
              <blockquote>{{ testimonial.quote }}</blockquote>
              <p class="testimonial-author">- {{ testimonial.name }}</p>
            </div>
          </div>
        </div>
        <div class="slider-controls">
          <button @click="prevSlide" class="slider-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button @click="nextSlide" class="slider-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Llamado a la acción -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>¿Listo para cambiar una vida?</h2>
          <p>Cada adopción es una historia de amor que comienza. Se parte del cambio.</p>
          <router-link to="/contact" class="btn btn-neon">Contáctanos</router-link>
        </div>
      </div>
    </section>

      <!-- Quitar esto por si no me gusta-->
    <section class="cta-section">
  <div class="container" style="text-align: center; padding: 3rem 0;">
    <h2>¿Quieres saber si una persona adoptara?</h2>
    <p>Haz clic abajo para usar nuestro predictor inteligente.</p>
    <router-link to="/predictor" class="btn btn-neon" style="margin-top: 1rem;">
      Ir al Predictor
    </router-link>
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
    nextSlide() {
      if (!this.$refs.testimonialsSlider) return;
      
      const slider = this.$refs.testimonialsSlider;
      const cardWidth = slider.querySelector('.testimonial-card').offsetWidth + 20; // 20px de gap
      
      this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
      slider.scrollTo({
        left: cardWidth * this.currentSlide,
        behavior: 'smooth'
      });
    },
    prevSlide() {
      if (!this.$refs.testimonialsSlider) return;
      
      const slider = this.$refs.testimonialsSlider;
      const cardWidth = slider.querySelector('.testimonial-card').offsetWidth + 20; // 20px de gap
      
      this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
      slider.scrollTo({
        left: cardWidth * this.currentSlide,
        behavior: 'smooth'
      });
    },
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
    
    // Auto-scroll testimonios
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  },
  beforeDestroy() {
    // Limpiar el intervalo cuando el componente se destruye
    clearInterval(this.slideInterval);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700&display=swap');

:root {
  --primary: #FF6B81;
  --secondary: #FFB86F;
  --accent: #6C5CE7;
  --light-bg: #FFFDF9;
  --dark-text: #2C3E50;
  --card-bg: #ffffff;
  --shadow: rgba(0, 0, 0, 0.15);
}

/* Estilos generales */
.about-container {
  font-family: 'Baloo 2', cursive;
  background: linear-gradient(135deg, #ffe9f3, #fff4d2);
  color: var(--dark-text);
  min-height: 100vh;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.section-title {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 1rem;
  color: var(--accent);
}

.section-divider {
  width: 80px;
  height: 4px;
  background: var(--primary);
  margin: 0 auto 2rem;
  border-radius: 2px;
}

.section-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
}

.btn {
  padding: 0.9rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.btn-neon {
  background-color: var(--accent);
  color: rgb(0, 0, 0);
  box-shadow: 0 0 15px var(--accent);
}

.btn-neon:hover {
  background-color: #a29bfe;
  box-shadow: 0 0 20px #a29bfe;
  transform: translateY(-3px);
}

/* Hero Section */
.hero-section {
  padding: 6rem 0;
  background: radial-gradient(circle at top left, #ffe9f3, #fff4d2);
  animation: bgPulse 10s ease infinite;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.hero-section::before {
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

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
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
  padding: 5rem 0;
  background: #fff;
}

.mission-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
}

.mission-image {
  flex: 1;
  min-width: 300px;
}

.mission-image img {
  width: 100%;
  border-radius: 20px;
  box-shadow: 0 10px 25px var(--shadow);
  transition: transform 0.3s ease;
}

.mission-image img:hover {
  transform: scale(1.03);
}

.mission-text {
  flex: 1;
  min-width: 300px;
}

.mission-text p {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Sección Por Qué Adoptar */
.why-adopt-section {
  padding: 5rem 0;
  background: #fef6e4;
  position: relative;
  overflow: hidden;
}

.why-adopt-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b81' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
  z-index: 1;
}

.reasons-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.reason-card {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(255, 107, 129, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 2;
}

.reason-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.reason-card:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 30px rgba(255, 107, 129, 0.2);
}

.reason-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.reason-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

.reason-card p {
  color: var(--dark-text);
  line-height: 1.6;
}

/* Sección Testimonios */
.testimonials-section {
  padding: 5rem 0;
  background-color: white;
}

.testimonials-slider {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  gap: 20px;
  padding: 1.5rem 0;
  scroll-behavior: smooth;
}

.testimonials-slider::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.testimonial-card {
  flex: 0 0 auto;
  width: calc(100% - 40px);
  max-width: 500px;
  scroll-snap-align: center;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(108, 92, 231, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.testimonial-image {
  height: 200px;
  overflow: hidden;
}

.testimonial-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-content {
  padding: 2rem;
  text-align: center;
}

.testimonial-content blockquote {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-style: italic;
  color: var(--dark-text);
}

.testimonial-author {
  font-weight: 700;
  color: var(--accent);
}

.slider-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.slider-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--accent);
  color: var(--accent);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-btn:hover {
  background-color: var(--accent);
  color: white;
}

/* Llamado a la acción */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: rgb(0, 0, 0);
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
}

.cta-content h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-content .btn-neon {
  background-color: white;
  color: var(--accent);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
}

.cta-content .btn-neon:hover {
  background-color: var(--light-bg);
  transform: translateY(-3px);
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
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .hero-content .tagline {
    font-size: 1.3rem;
  }
  
  .hero-content p {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .mission-content {
    flex-direction: column;
  }
  
  .testimonial-card {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.8rem;
  }
  
  .reason-card {
    padding: 1.5rem;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
}
</style>