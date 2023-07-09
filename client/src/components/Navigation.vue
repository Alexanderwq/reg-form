<template>
  <div class="navigation">
    <NavigationLink
      :active="navStore.showLoginForm"
      @click="navStore.setSection(NavigationSections.SIGN_IN)"
    >
      <template v-slot:text>
        Вход
      </template>
    </NavigationLink>

    <NavigationLink
        :active="navStore.showRegForm"
        @click="navStore.setSection(NavigationSections.SIGN_UP)"
    >
      <template v-slot:text>
        Зарегистрироваться
      </template>
    </NavigationLink>
  </div>
</template>

<script setup>
  import NavigationLink from "@/common/NavigationLink.vue";
  import {useNavigationStore} from "@/stores/navigationStore";
  import NavigationSections from "@/const/NavigationSections";

  const navStore = useNavigationStore()
</script>

<style lang="scss" scoped>
  .navigation{
    display: flex;
    align-items: center;
    gap: 50px;
  }
</style>