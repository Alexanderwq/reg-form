<template>
  <div class="navigation">
    <NavigationLink
      :active="navStore.loginSectionIsActive"
      @click="toRegForm"
    >
      <template v-slot:text>
        Вход
      </template>
    </NavigationLink>

    <NavigationLink
        :active="navStore.regSectionIsActive"
        @click="toLoginForm"
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

  const navStore = useNavigationStore()

  function toRegForm() {
    navStore.setSection(navStore.loginForm)
  }

  function toLoginForm() {
    navStore.setSection(navStore.regForm)
  }
</script>

<style lang="scss" scoped>
  .navigation{
    display: flex;
    align-items: center;
    gap: 50px;
  }
</style>