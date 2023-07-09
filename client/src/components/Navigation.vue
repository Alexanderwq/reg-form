<template>
  <div class="navigation">
    <NavigationLink
      :active="navStore.showLoginForm"
      @click="toLoginForm"
    >
      <template v-slot:text>
        Вход
      </template>
    </NavigationLink>

    <NavigationLink
        :active="navStore.showRegForm"
        @click="toRegForm"
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
  import {useUserStore} from "@/stores/userStore";

  const navStore = useNavigationStore()
  const { resetUserData } = useUserStore()

  function toRegForm() {
    resetUserData()
    navStore.setSection(NavigationSections.SIGN_IN)
  }

  function toLoginForm() {
    resetUserData()
    navStore.setSection(NavigationSections.SIGN_UP)
  }
</script>

<style lang="scss" scoped>
  .navigation{
    display: flex;
    align-items: center;
    gap: 50px;
  }
</style>