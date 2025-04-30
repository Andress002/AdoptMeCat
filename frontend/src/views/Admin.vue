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
import SearchPrediction from '../components/SearchPrediction.vue';

export default {
  name: 'Admin',
  components: {
    AddCatForm,
    SearchPrediction
    /* ArffPredictor */                  /* quitar si no me gusta */
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding: 20px;
}

.titulo {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #2c3e50;
}

.admin-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  gap: 40px;
}

.panel-item {
  flex: 1 1 45%;
  min-width: 350px;
  max-width: 500px;
}

/* Ajuste adicional para bajar ligeramente el segundo panel */
.bottom-offset {
  margin-top: 30px;
}
</style>
