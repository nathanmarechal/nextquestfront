<template>
  <v-app-bar app flat color="#180342" class="px-4">
    <v-container class="d-flex align-center justify-space-between" fluid>

      <v-img src="@/assets/NextQuest.png" max-height="40" contain class="mr-6" />

      <v-row class="align-center" no-gutters>
        <v-img src="@/assets/Accueil.png" max-height="40" contain class="mx-3" />
        <v-img src="@/assets/Menu.png" max-height="40" contain class="mx-3" />
        <v-img src="@/assets/Recherche.png" max-height="40" contain class="mx-3" />
        <v-img src="@/assets/Connexion.png" max-height="40" contain class="mx-3" />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>

</script>

<style scoped>
.v-img {
  cursor: pointer;
  transition: transform 0.2s ease;
}
.v-img:hover {
  transform: scale(1.05);
}
</style>
