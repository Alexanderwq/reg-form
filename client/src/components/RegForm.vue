<template>
  <div class="reg-form">
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
    <FormButton
      class="reg-form__button"
      @click="userStore.sendConfirmationCode"
    >
      <template v-slot:text>
        Зарегистрироваться
      </template>
    </FormButton>
  </div>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import {useUserStore} from "@/stores/userStore";
  import FormButton from "@/common/FormButton.vue";

  const userStore = useUserStore();
</script>

<style lang="scss" scoped>
  .reg-form{
    display: flex;
    flex-direction: column;
    gap: 40px;
    max-width: 600px;
    margin: 0 auto;

    &__button{
      margin-top: 20px;
    }
  }
</style>