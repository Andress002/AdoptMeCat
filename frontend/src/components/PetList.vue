<template>
  <div>
    <h1>Lista de Gatos</h1>
    <ul>
      <li v-for="mascota in mascotas" :key="mascota._id">
        🐱 {{ mascota.name }} - {{ mascota.breed }}
        <button
          v-if="authState.isAuthenticated && authState.userRole === 'admin'"
          @click="eliminarMascota(mascota._id)"
          class="btn btn-danger"
        >
          Eliminar
        </button>
      </li>
    </ul>

    <form @submit.prevent="crearMascota">
      <input v-model="nuevoMascota.name" placeholder="Nombre" required />
      <input v-model="nuevoMascota.breed" placeholder="Raza" required />
      <input v-model="nuevoMascota.age" placeholder="Edad" type="number" required />
      <textarea v-model="nuevoMascota.description" placeholder="Descripción"></textarea>
      <button type="submit">Agregar Gato</button>
    </form>
  </div>
</template>

<script>
import { obtenerMascotas, crearMascota, eliminarMascota } from '@/api.js';
import { inject } from 'vue';

export default {
  name: 'PetList',
  data() {
    return {
      mascotas: [],
      nuevoMascota: {
        name: '',
        breed: '',
        age: '',
        description: '',
        tipo: 'cat', // Fijo como 'cat'
      },
    };
  },
  computed: {
    authState() {
      return inject('authState');
    },
  },
  async created() {
    const todas = await obtenerMascotas().then(res => res.data);
    this.mascotas = todas.filter(m => m.tipo === 'cat'); // Solo gatos
  },
  methods: {
    async crearMascota() {
      const mascota = await crearMascota(this.nuevoMascota).then(res => res.data);
      this.mascotas.push(mascota);
      this.nuevoMascota = {
        name: '',
        breed: '',
        age: '',
        description: '',
        tipo: 'cat', // Mantener como 'cat'
      };
    },
    async eliminarMascota(id) {
      await eliminarMascota(id);
      this.mascotas = this.mascotas.filter(mascota => mascota._id !== id);
    },
  },
};
</script>
