<template>
  <div class="card">
    <div class="card-img-wrapper">
      <img
        :src="`http://localhost:5000/uploads/${pet.image}`"
        class="card-img-top"
        :alt="pet.type === 'cat' ? 'Imagen de gato' : 'Imagen de perro'"
      >
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ pet.name }}</h5>
      <p class="card-text"><strong>Descripción:</strong> {{ pet.description }}</p>
      <p class="card-text"><strong>Edad:</strong> {{ pet.age }} años</p>
      <p class="card-text"><strong>Vacunado:</strong> {{ pet.vaccinated ? 'Sí' : 'No' }}</p>
      <p class="card-text"><strong>Tamaño:</strong> {{ getSizeLabel(pet.size) }}</p>
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
      const confirmation = confirm("¿Estás seguro de que deseas eliminar esta mascota?");
      if (!confirmation) return;
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
      this.$router.push({ name: 'AdoptionForm', params: { petId: this.pet._id, petType: this.pet.type } });
    },
    getSizeLabel(size) {
      switch (size) {
        case 'small':
          return 'Pequeño';
        case 'medium':
          return 'Mediano';
        case 'large':
          return 'Grande';
        default:
          return 'Desconocido';
      }
    }
  }
};
</script>

<style scoped>
.card {
  width: 300px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 20px;
  box-shadow: 0 8px 25px rgba(114, 97, 99, 0.2);
  overflow: hidden;
  margin: 20px auto;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(8px);
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 30px rgba(245, 125, 88, 0.845);
}

.card-img-wrapper {
  height: 200px;
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
  transform: scale(1.1);
}

.card-body {
  padding: 1.2rem;
  text-align: center;
}

.card-title {
  font-size: 1.7rem;
  color: #FF6B81;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.6rem;
}

.card-buttons {
  display: flex;
  justify-content: space-around;
  gap: 10px;
  margin-top: 1rem;
}

.btn {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  cursor: pointer;
  color: white;
}

.btn-adopt {
  background: #6C5CE7;
  box-shadow: 0 0 10px #6C5CE7;
}

.btn-adopt:hover {
  background: #5944d4;
  box-shadow: 0 0 12px #5944d4;
}

.btn-delete {
  background: #FF6B6B;
  box-shadow: 0 0 10px #FF6B6B;
}

.btn-delete:hover {
  background: #e44d4d;
  box-shadow: 0 0 12px #e44d4d;
}
</style>
