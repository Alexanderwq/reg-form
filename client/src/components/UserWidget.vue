<template>
  <div class="user-widget">
    <Navigation
      v-if="navStore.showNavigation"
      class="user-widget__navigation"
    />
    <component :is="navStore.currentSection.component"></component>
  </div>
</template>

<script setup>
  import Navigation from "@/components/Navigation.vue";
  import {useNavigationStore} from "@/stores/navigationStore";

  const navStore = useNavigationStore();
</script>

<style lang="scss" scoped>
  .user-widget{
    max-width: 1040px;
    padding: 30px;
    background: #FFF;
    filter: drop-shadow(0px 10px 25px rgba(92, 99, 105, 0.20));
    border-radius: 10px;
    margin: 100px auto 100px;

    &__navigation{
      margin-bottom: 70px;
    }
  }
</style>