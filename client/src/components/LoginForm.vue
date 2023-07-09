<template>
  <div class="login-form">
    <p class="login-form__title">
      Войдите в систему
    </p>
    <FormInput
      :value="userStore.email"
      name="email"
      label="Email"
    />
    <FormInput
        :value="userStore.password"
        name="password"
        label="Пароль"
    />
    <FormButton
        class="login-form__button"
    >
      <template v-slot:text>
        Войти
      </template>
    </FormButton>
  </div>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import {useUserStore} from "@/stores/userStore";
  import FormButton from "@/common/FormButton.vue";

  const userStore = useUserStore()
</script>

<style lang="scss" scoped>
  .login-form{
    display: flex;
    max-width: 600px;
    flex-direction: column;
    gap: 40px;
    margin: 0 auto;

    &__title{
      text-align: center;
      color: #4786FF;
      font-size: 50px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin-bottom: 20px;
    }

    &__button{
      margin-top: 50px;
      margin-bottom: 65px;
    }
  }
</style>