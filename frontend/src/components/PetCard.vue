<template>
  <div class="pet-card">
    <div class="pet-image-container">
      <img
        :src="`http://localhost:5000/uploads/${pet.image}`"
        class="pet-image"
        alt="Imagen de mascota"
      >
      <div class="pet-logo">
        <span class="pet-emoji">🐾</span>
      </div>
    </div>
    <div class="pet-info">
      <div class="pet-header">
        <h3 class="pet-name">{{ pet.name }}</h3>
        <div class="pet-age">{{ pet.age }} {{ pet.age === 1 ? 'año' : 'años' }}</div>
      </div>
      
      <div class="pet-tags">
        <div class="tag tag-category">
          <span class="tag-icon">{{ getCategoryIcon(petCategory) }}</span>
          {{ petCategory === 'kitten' ? 'Gatito' : petCategory === 'adult' ? 'Adulto' : 'Senior' }}
        </div>
        <div class="tag tag-breed">
          <span class="tag-icon">🧬</span>
          {{ pet.breed }}
        </div>
        <div class="tag tag-size">
          <span class="tag-icon">📏</span>
          {{ getSizeLabel(pet.size) }}
        </div>
      </div>
      
      <p class="pet-description">{{ pet.description }}</p>
      
      <div class="pet-actions">
        <!-- <button class="btn btn-details" @click="viewDetails">
          Ver detalles
        </button> -->
        <button 
          v-if="isAdmin" 
          @click="deletePet" 
          class="btn btn-delete"
        >
          Eliminar
        </button>
        <button 
          v-if="showAdoptButton && !isAdmin" 
          @click="adoptPet" 
          class="btn btn-adopt"
        >
          Adoptar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PetCard',
  props: {
    pet: {
      type: Object,
      required: true
    },
    showAdoptButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isAdmin() {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user && user.role === 'admin';
    },
    petCategory() {
      const age = this.pet.age;
      if (age < 1) return 'kitten';
      if (age < 7) return 'adult';
      return 'senior';
    }
  },
  methods: {
    getCategoryIcon(category) {
      switch (category) {
        case 'kitten':
          return '🐱';
        case 'adult':
          return '😺';
        case 'senior':
          return '🧶';
        default:
          return '🐈';
      }
    },
    async deletePet() {
      if (!confirm("¿Estás seguro de que deseas eliminar esta mascota?")) return;
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/pets/${this.pet._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.$emit('pet-deleted', this.pet._id);
      } catch (error) {
        console.error('Error al eliminar la mascota:', error);
      }
    },
    adoptPet() {
      this.$router.push({ 
        name: 'AdoptionForm', 
        params: { 
          petId: this.pet._id, 
          petType: this.pet.type 
        } 
      });
    },
    viewDetails() {
      this.$router.push({ 
        name: 'PetDetails', 
        params: { petId: this.pet._id } 
      });
    },
    getSizeLabel(size) {
      switch (size?.toLowerCase()) {
        case 'small': return 'Pequeño';
        case 'medium': return 'Mediano';
        case 'large': return 'Grande';
        default: return 'Desconocido';
      }
    }
  }
};
</script>

<style scoped>
.pet-card {
  width: 100%;
  max-width: 340px;
  border-radius: 16px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin: 16px;
}

.pet-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.pet-image-container {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.pet-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.pet-logo {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pet-emoji {
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 20px;
  height: 20px;
}

.pet-info {
  padding: 16px 20px 20px;
}

.pet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.pet-name {
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.pet-age {
  background-color: #5c94e7;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 20px;
}

.pet-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 14px;
}

.tag {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  background-color: #f5f5f5;
  padding: 4px 10px;
  border-radius: 6px;
}

.tag-icon {
  margin-right: 4px;
  font-size: 12px;
}

.pet-description {
  color: #666;
  font-size: 15px;
  line-height: 1.4;
  margin-bottom: 20px;
}

.pet-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 16px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;
  text-align: center;
}

.btn-details {
  background-color: #5c94e7;
  color: white;
}

.btn-details:hover {
  background-color: #5b4dd1;
}

.btn-delete {
  background-color: #fff0f0;
  color: #ff5252;
  border: 1px solid #ff5252;
}

.btn-delete:hover {
  background-color: #fff0f0;
}

.btn-adopt {
  background-color: #4cd964;
  color: white;
}

.btn-adopt:hover {
  background-color: #3cc554;
}

.tag-category {
  background-color: #fff3e0;
  color: #ff9800;
}
</style>
