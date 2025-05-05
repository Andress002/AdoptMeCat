<template>
  <div class="card">
    <div class="card-img-wrapper">
      <img
        :src="`http://localhost:5000/uploads/${pet.image}`"
        class="card-img-top"
        alt="Imagen de gato"
      >
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ pet.name }}</h5>
      <p class="card-text"><strong>Descripción:</strong> {{ pet.description }}</p>
      <p class="card-text"><strong>Edad:</strong> {{ pet.age }} años</p>
      <p class="card-text"><strong>Vacunado:</strong> {{ pet.vaccinated ? 'Sí' : 'No' }}</p>
      <p class="card-text"><strong>Tamaño:</strong> {{ getSizeLabel(pet.size) }}</p>
      <p class="card-text"><strong>Raza:</strong> {{ pet.breed }}</p>
      <div class="card-buttons">
        <button v-if="isAdmin" @click="deletePet" class="btn btn-delete">Eliminar</button>
        <button v-if="showAdoptButton" @click="adoptPet" class="btn btn-adopt">Adoptar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PetCard',
  props: {
    pet: Object,
    showAdoptButton: Boolean
  },
  computed: {
    isAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.role === 'admin';
    }
  },
  methods: {
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
      this.$router.push({ name: 'AdoptionForm', params: { petId: this.pet._id } });
    },
    getSizeLabel(size) {
      switch (size) {
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
.card {
  width: 320px;
  background: #eea318;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.card-img-wrapper {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card-img-wrapper:hover .card-img-top {
  transform: scale(1.08);
}

.card-body {
  padding: 1.4rem;
  text-align: center;
  background-color: #fff;
}

.card-title {
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.4rem;
}

.card-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 1.2rem;
}

.btn {
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;
}

.btn-adopt {
  background: #6C5CE7;
  box-shadow: 0 0 8px #6C5CE7;
}

.btn-adopt:hover {
  background: #5944d4;
  box-shadow: 0 0 10px #5944d4;
}

.btn-delete {
  background: #FF6B6B;
  box-shadow: 0 0 8px #FF6B6B;
}

.btn-delete:hover {
  background: #e44d4d;
  box-shadow: 0 0 10px #e44d4d;
}
</style>
