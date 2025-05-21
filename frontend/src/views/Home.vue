<template>
  <div class="home-container">
    <!-- HERO -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>¡Adopta Amor en Forma de Gato!</h1>
            <p>Tu mejor amigo está esperándote. Salva una vida, recibe amor incondicional 😻</p>
            <div class="hero-buttons">
              <router-link to="/about" class="btn btn-neon">Conocenos</router-link>
              <a href="#pets-gallery" class="btn btn-outline">Ver Gatitos</a>
            </div>
          </div>
          <div class="hero-image">
            <img src="../assets/images/fondohome.jpg" alt="Gato en adopción" />
          </div>
        </div>
      </div>
    </section>

    <!-- GALERÍA -->
    <section id="pets-gallery" class="gallery-section">
      <div class="container">
        <h2 class="section-title">🐾 Mascotas Buscando Hogar</h2>
        
        <!-- Filtros avanzados -->
        <div class="advanced-filters">
          <button 
            @click="showFilters = !showFilters" 
            class="filter-toggle-btn"
            :aria-expanded="showFilters"
            aria-controls="filters-panel"
          >
            <span>Filtros avanzados</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
              :class="{'rotate-180': showFilters}"
              class="transition-transform"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          
          <transition name="fade">
            <div v-if="showFilters" id="filters-panel" class="filters-panel">
              <div class="filter-group">
                <h3>Edad</h3>
                <div class="filter-options">
                  <button 
                    v-for="filter in filters" 
                    :key="filter.value"
                    @click="activeFilter = filter.value; filterPets()"
                    :class="['filter-option', activeFilter === filter.value ? 'active' : '']"
                  >
                    {{ filter.label }}
                  </button>
                </div>
              </div>
              
              <div class="filter-group">
                <h3>Raza</h3>
                <div class="filter-options">
                  <button 
                    v-for="breed in availableBreeds" 
                    :key="breed"
                    @click="selectedBreed = selectedBreed === breed ? '' : breed; filterPets()"
                    :class="['filter-option', selectedBreed === breed ? 'active' : '']"
                  >
                    {{ breed }}
                  </button>
                </div>
              </div>
              
              <div class="filter-group">
                <h3>Tamaño</h3>
                <div class="filter-options">
                  <button 
                    v-for="size in availableSizes" 
                    :key="size"
                    @click="selectedSize = selectedSize === size ? '' : size; filterPets()"
                    :class="['filter-option', selectedSize === size ? 'active' : '']"
                  >
                    {{ size }}
                  </button>
                </div>
              </div>
              
              <div class="filter-actions">
                <button @click="resetFilters" class="btn btn-secondary">Limpiar filtros</button>
              </div>
            </div>
          </transition>
        </div>
        
        <!-- Búsqueda -->
        <div class="search-container">
          <div class="search-input">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              class="search-icon"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar por nombre o características..." 
              @input="debouncedFilter"
            />
          </div>
        </div>
        
        <!-- Filtros activos -->
        <transition name="fade">
          <div v-if="hasActiveFilters" class="active-filters">
            <span>Filtros activos:</span>
            <div class="filter-tags">
              <div v-if="activeFilter !== 'all'" class="filter-tag">
                {{ getFilterLabel(activeFilter) }}
                <button @click="activeFilter = 'all'; filterPets()" class="tag-remove" aria-label="Eliminar filtro de edad">×</button>
              </div>
              <div v-if="selectedBreed" class="filter-tag">
                {{ selectedBreed }}
                <button @click="selectedBreed = ''; filterPets()" class="tag-remove" aria-label="Eliminar filtro de raza">×</button>
              </div>
              <div v-if="selectedSize" class="filter-tag">
                {{ selectedSize }}
                <button @click="selectedSize = ''; filterPets()" class="tag-remove" aria-label="Eliminar filtro de tamaño">×</button>
              </div>
            </div>
          </div>
        </transition>
        
        <!-- Mascotas -->
        <transition-group name="pet-list" tag="div" class="pets-grid">
          <div v-for="pet in filteredPets" :key="pet._id" class="pet-card">
            <PetCard :pet="pet" :showAdoptButton="isUser" @pet-deleted="removePet" />
          </div>
        </transition-group>
        
        <!-- Estado vacío -->
        <transition name="fade">
          <div v-if="!filteredPets.length && !isLoading" class="empty-state">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="64" 
              height="64" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="1" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/>
              <path d="M8 14v.5"/>
              <path d="M16 14v.5"/>
              <path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>
            </svg>
            <p>No se encontraron gatitos con esos criterios</p>
            <button @click="resetFilters" class="btn btn-secondary">Ver todos</button>
          </div>
        </transition>
        
        <!-- Estado de carga -->
        <div v-if="isLoading" class="loading-state">
          <div class="loader"></div>
          <p>Cargando gatitos...</p>
        </div>
      </div>
    </section>

    <!-- PROCESO -->
    <section class="process-section">
      <div class="container">
        <h2 class="section-title">📋 ¿Como Funciona?</h2>
        <div class="process-steps">
          <div 
            v-for="(step, index) in adoptionSteps" 
            :key="index"
            class="process-step"
            :class="{'process-step-delay-1': index === 1, 'process-step-delay-2': index === 2}"
          >
            <span class="step-icon">{{ step.icon }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIOS -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">💬 Historias Felices</h2>
        <div class="testimonials-slider" ref="testimonialsSlider">
          <div 
            v-for="(testimonial, index) in testimonials" 
            :key="index" 
            class="testimonial-card"
          >
            <div class="testimonial-image">
              <img :src="testimonial.image" :alt="`${testimonial.name} con ${testimonial.catName}`" />
            </div>
            <div class="testimonial-content">
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <p class="testimonial-author">- {{ testimonial.name }} y {{ testimonial.catName }}</p>
            </div>
          </div>
        </div>
        <div class="slider-controls">
          <button @click="prevSlide" class="slider-btn" aria-label="Testimonio anterior">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div class="slider-dots">
            <button 
              v-for="(_, index) in testimonials" 
              :key="index"
              @click="goToSlide(index)"
              :class="['slider-dot', currentSlide === index ? 'active' : '']"
              :aria-label="`Ir al testimonio ${index + 1}`"
            ></button>
          </div>
          <button @click="nextSlide" class="slider-btn" aria-label="Testimonio siguiente">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- LLAMADO A LA ACCIÓN -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>¿Listo para cambiar una vida?</h2>
          <p>Cada adopcion es una historia de amor que comienza. Se parte del cambio.</p>
          <router-link to="/contact" class="btn btn-neon">Contactanos</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import PetCard from '../components/PetCard.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: { 
    PetCard
  },
  setup() {
    // Estado
    const pets = ref([]);
    const allPets = ref([]);
    const isUser = ref(false);
    const searchQuery = ref('');
    const activeFilter = ref('all');
    const selectedBreed = ref('');
    const selectedSize = ref('');
    const currentSlide = ref(0);
    const showFilters = ref(false);
    const isLoading = ref(true);
    const testimonialsSlider = ref(null);
    const slideInterval = ref(null);
    
    // Filtros disponibles
    const filters = [
      { label: 'Todos', value: 'all' },
      { label: 'Cachorros', value: 'kitten' },
      { label: 'Adultos', value: 'adult' },
      { label: 'Seniors', value: 'senior' }
    ];
    
    // Pasos de adopción
    const adoptionSteps = [
      {
        icon: '🔍',
        title: 'Explora',
        description: 'Descubre gatos adorables esperando una segunda oportunidad.'
      },
      {
        icon: '📞',
        title: 'Contacta',
        description: 'Habla con nuestro equipo para saber mas sobre tu elegido.'
      },
      {
        icon: '🏡',
        title: 'Adopta',
        description: 'Completa el proceso y dale a un peludito su nuevo hogar.'
      }
    ];
    
    // Testimonios
    const testimonials = [
      {
        name: 'Maria',
        catName: 'Luna',
        text: 'Adoptar a Luna fue la mejor decision que tomamos. Ha llenado nuestro hogar de alegria y ronroneos.',
        image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Carlos',
        catName: 'Simba',
        text: 'Simba llegó a mi vida cuando más lo necesitaba. Es increible cómo un gatito puede cambiar tu perspectiva.',
        image: 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Ana',
        catName: 'Milo',
        text: 'El proceso de adopción fue sencillo y el equipo muy atento. Milo se adapto rapidamente a su nuevo hogar.',
        image: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
      }
    ];

    // Computed properties
    const filteredPets = computed(() => pets.value);
    
    const availableBreeds = computed(() => {
      const breeds = new Set();
      allPets.value.forEach(pet => {
        if (pet.breed) {
          breeds.add(pet.breed);
        }
      });
      return Array.from(breeds).sort();
    });
    
    const availableSizes = computed(() => {
      const sizes = new Set();
      allPets.value.forEach(pet => {
        if (pet.size) {
          sizes.add(pet.size);
        }
      });
      return Array.from(sizes).sort();
    });
    
    const hasActiveFilters = computed(() => {
      return activeFilter.value !== 'all' || selectedBreed.value || selectedSize.value;
    });

    // Métodos
    const fetchPets = async () => {
      try {
        isLoading.value = true;
        const response = await axios.get('http://localhost:5000/api/pets');
        allPets.value = response.data;
        pets.value = response.data;
      } catch (error) {
        console.error('Error al obtener las mascotas:', error);
      } finally {
        isLoading.value = false;
      }
    };
    
    const checkUserRole = () => {
      const user = JSON.parse(localStorage.getItem('user'));
      isUser.value = user && user.role !== 'admin';
    };
    
    const removePet = (petId) => {
      pets.value = pets.value.filter(pet => pet._id !== petId);
      allPets.value = allPets.value.filter(pet => pet._id !== petId);
    };
    
    // Implementación de debounce para la búsqueda
    let debounceTimeout;
    const debouncedFilter = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        filterPets();
      }, 300);
    };
    
    const filterPets = () => {
      let filtered = [...allPets.value];
      
      // Filtrar por búsqueda
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(pet => 
          pet.name.toLowerCase().includes(query) || 
          (pet.description && pet.description.toLowerCase().includes(query)) ||
          (pet.breed && pet.breed.toLowerCase().includes(query))
        );
      }
      
      // Filtrar por categoría de edad
      if (activeFilter.value !== 'all') {
        filtered = filtered.filter(pet => {
          if (pet.ageCategory) {
            return pet.ageCategory === activeFilter.value;
          } else if (pet.age) {
            // Lógica alternativa basada en la edad
            const age = parseInt(pet.age);
            if (activeFilter.value === 'kitten' && age < 1) return true;
            if (activeFilter.value === 'adult' && age >= 1 && age < 7) return true;
            if (activeFilter.value === 'senior' && age >= 7) return true;
          }
          return false;
        });
      }
      
      // Filtrar por raza
      if (selectedBreed.value) {
        filtered = filtered.filter(pet => pet.breed === selectedBreed.value);
      }
      
      // Filtrar por tamaño
      if (selectedSize.value) {
        filtered = filtered.filter(pet => pet.size === selectedSize.value);
      }
      
      pets.value = filtered;
    };
    
    const resetFilters = () => {
      searchQuery.value = '';
      activeFilter.value = 'all';
      selectedBreed.value = '';
      selectedSize.value = '';
      pets.value = [...allPets.value];
    };
    
    const getFilterLabel = (value) => {
      const filter = filters.find(f => f.value === value);
      return filter ? filter.label : value;
    };
    
    // Funciones para el slider de testimonios
    const nextSlide = () => {
      if (!testimonialsSlider.value) return;
      
      currentSlide.value = (currentSlide.value + 1) % testimonials.length;
      scrollToCurrentSlide();
    };
    
    const prevSlide = () => {
      if (!testimonialsSlider.value) return;
      
      currentSlide.value = (currentSlide.value - 1 + testimonials.length) % testimonials.length;
      scrollToCurrentSlide();
    };
    
    const goToSlide = (index) => {
      currentSlide.value = index;
      scrollToCurrentSlide();
    };
    
    const scrollToCurrentSlide = () => {
      const slider = testimonialsSlider.value;
      const cardWidth = slider.querySelector('.testimonial-card').offsetWidth + 20; // 20px de gap
      
      slider.scrollTo({
        left: cardWidth * currentSlide.value,
        behavior: 'smooth'
      });
    };
    
    // Lifecycle hooks
    onMounted(() => {
      fetchPets();
      checkUserRole();
      
      // Auto-scroll testimonios
      slideInterval.value = setInterval(() => {
        nextSlide();
      }, 5000);
      
      // Observador de intersección para animaciones al hacer scroll
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      // Observar secciones para animaciones
      nextTick(() => {
        document.querySelectorAll('.section-title, .process-step, .testimonial-card, .cta-content').forEach(el => {
          observer.observe(el);
        });
      });
    });
    
    onBeforeUnmount(() => {
      // Limpiar el intervalo cuando el componente se destruye
      if (slideInterval.value) {
        clearInterval(slideInterval.value);
      }
    });

    return {
      pets,
      allPets,
      isUser,
      searchQuery,
      activeFilter,
      selectedBreed,
      selectedSize,
      currentSlide,
      showFilters,
      isLoading,
      testimonialsSlider,
      filters,
      adoptionSteps,
      testimonials,
      filteredPets,
      availableBreeds,
      availableSizes,
      hasActiveFilters,
      fetchPets,
      checkUserRole,
      removePet,
      debouncedFilter,
      filterPets,
      resetFilters,
      getFilterLabel,
      nextSlide,
      prevSlide,
      goToSlide
    };
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

.home-container {
  font-family: 'Baloo 2', cursive;
  background: linear-gradient(135deg, #fafafa, #fafafa);
  color: var(--dark-text);
  min-height: 100vh;
}

/* HERO */
.hero-section {
  padding: 6rem 0;
  background: radial-gradient(circle at top left, #ffe9f3, #fff4d2);
  animation: bgPulse 10s ease infinite;
  position: relative;
  overflow: hidden;
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

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 2;
}

.hero-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2.5rem;
  justify-content: space-between;
}

.hero-text {
  flex: 1;
  max-width: 550px;
}

.hero-text h1 {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 1rem;
  line-height: 1.1;
  animation: fadeInUp 1s ease;
}

.hero-text p {
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: var(--dark-text);
  animation: fadeInUp 1s ease 0.2s forwards;
  opacity: 0;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
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
  border: none;
}

.btn-neon {
  background-color: var(--accent);
  color: rgb(0, 0, 0);
  box-shadow: 0 0 15px var(--accent);
}

.btn-neon:hover {
  background-color: #a29bfe;
  box-shadow: 0 0 20px #a29bfe;
  color: white;
  transform: translateY(-3px);
}

.btn-outline {
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
}

.btn-outline:hover {
  background-color: #a29bfe;
  box-shadow: 0 0 20px #a29bfe;
  color: white;
  transform: translateY(-3px);
}

.btn-secondary {
  background-color: var(--secondary);
  color: var(--dark-text);
}

.btn-secondary:hover {
  background-color: #ffa953;
  transform: translateY(-3px);
}

.hero-image {
  flex: 1;
  text-align: center;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
}

.hero-image img {
  max-width: 450px;
  width: 100%;
  border-radius: 25px;
  box-shadow: 0 15px 30px var(--shadow);
  transition: transform 0.3s ease;
}

.hero-image img:hover {
  transform: scale(1.04);
}

/* GALLERY */
.gallery-section {
  padding: 5rem 0;
  background: #fff;
}

.section-title {
  text-align: center;
  font-size: 2.4rem;
  margin-bottom: 2rem;
  color: var(--accent);
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.section-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Filtros avanzados */
.advanced-filters {
  margin-bottom: 2rem;
}

.filter-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--light-bg);
  border: 1px solid #e0e0e0;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  margin: 0 auto;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-toggle-btn:hover {
  background-color: #f0f0f0;
}

.transition-transform {
  transition: transform 0.3s ease;
}

.rotate-180 {
  transform: rotate(180deg);
}

.filters-panel {
  background-color: var(--light-bg);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group h3 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  color: var(--dark-text);
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-option {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: white;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.filter-option:hover:not(.active) {
  background-color: #f5f5f5;
}

.filter-option.active {
  background-color: var(--accent);
  color: white;
  border-color: var(--accent);
}

.filter-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.filter-actions .btn {
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
}

/* Filtros activos */
.active-filters {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
}

.active-filters span {
  font-size: 0.9rem;
  color: #666;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  background-color: var(--accent);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
}

.tag-remove {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin-left: 0.2rem;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.tag-remove:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.search-container {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.search-input {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 30px;
  padding: 0.5rem 1.2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.search-icon {
  color: #888;
  margin-right: 0.8rem;
}

.search-input input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem 0;
  font-size: 1rem;
  outline: none;
  color: var(--dark-text);
}

.pets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.pet-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.pet-card:hover {
  transform: translateY(-5px);
}

/* Animaciones para la lista de mascotas */
.pet-list-enter-active,
.pet-list-leave-active {
  transition: all 0.5s ease;
}

.pet-list-enter-from,
.pet-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Animaciones para fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state svg {
  color: var(--primary);
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

/* Estado de carga */
.loading-state {
  text-align: center;
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid var(--accent);
  border-bottom-color: transparent;
  border-radius: 50%;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* PROCESO */
.process-section {
  padding: 5rem 0;
  background: #fafafa;
  position: relative;
  overflow: hidden;
}

.process-section::before {
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

.process-steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  position: relative;
  z-index: 2;
}

.process-step {
  background: var(--card-bg);
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  width: 280px;
  box-shadow: 0 10px 25px rgba(255, 107, 129, 0.15);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(30px);
}

.process-step.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.process-step-delay-1 {
  transition-delay: 0.2s;
}

.process-step-delay-2 {
  transition-delay: 0.4s;
}

.process-step::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, var(--primary), var(--accent));
}

.process-step:hover {
  transform: translateY(-7px);
  box-shadow: 0 15px 30px rgba(255, 107, 129, 0.2);
}

.step-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.process-step h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary);
}

/* TESTIMONIOS */
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
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
}

.testimonial-card.animate-in {
  opacity: 1;
  transform: translateY(0);
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

.testimonial-text {
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
  align-items: center;
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

.slider-dots {
  display: flex;
  gap: 0.5rem;
}

.slider-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #e0e0e0;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.slider-dot.active {
  background-color: var(--accent);
  transform: scale(1.2);
}

/* LLAMADO A LA ACCIÓN */
.cta-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary), var(--accent));
  color: rgb(0, 0, 0);
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.5s ease;
}

.cta-content.animate-in {
  opacity: 1;
  transform: translateY(0);
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

/* RESPONSIVE */
@media (max-width: 768px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-image img {
    max-width: 300px;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .process-step {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
  
  .testimonial-card {
    width: 100%;
  }
  
  .filters-panel {
    padding: 1rem;
  }
  
  .filter-options {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-option {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .hero-text h1 {
    font-size: 2rem;
  }
  
  .hero-text p {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .filter-container {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .cta-content h2 {
    font-size: 2rem;
  }
  
  .active-filters {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>