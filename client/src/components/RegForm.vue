<template>
  <div class="login-form">
    <FormInput
      :value="userStore.userName"
      name="name"
      @setValue="userStore.setUserName"
      label="Имя"
    />
    <FormInput
      :value="userStore.email"
      name="email"
      @setValue="userStore.setEmail"
      label="Email"
    />
    <FormInput
      :value="userStore.password"
      name="password"
      @setValue="userStore.setPassword"
      label="Пароль"
    />
    <FormInput
      :value="userStore.confirmPassword"
      name="confirmPassword"
      @setValue="userStore.setConfirmPassword"
      label="Подтверждение пароля"
    />
  </div>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import {useUserStore} from "@/stores/userStore";

  const userStore = useUserStore();
</script>

<style lang="scss" scoped>
  .login-form{
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
  }
</style>