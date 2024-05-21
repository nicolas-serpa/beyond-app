<template>
  <div class="text-center loading-container">
    <h1 class="loading-title">Carregando...</h1>
    <v-progress-circular :size="80" :width="7" color="#401580" class="loader-spinner" indeterminate />
  </div>
</template>

<style scoped>
.loading-container {
  margin-top: 14rem
}

.loading-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: #401580;
  margin-bottom: 1.5rem;
}
</style>
