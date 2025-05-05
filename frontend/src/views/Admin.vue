<template>
  <div class="container mt-5">
    <h2 class="titulo">Panel de Administrador</h2>
    <div class="admin-panel">
      <div class="panel-item">
        <AddCatForm />
      </div>
      <div class="panel-item bottom-offset">
        <SearchPrediction />
      </div>
    </div>
  </div>
</template>

<script>
/* import ArffPredictor from '../components/ArffPredictor.vue'; */               /* quitar si no me gusta */
import AddCatForm from '../components/AddCatForm.vue'; 

export default {
  name: 'Admin',
  components: {
    AddCatForm,
    /* ArffPredictor */                  /* quitar si no me gusta */
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}
</style>
