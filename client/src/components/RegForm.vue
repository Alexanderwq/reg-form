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
      @click="submitCode"
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
  import {useAlertStore} from "@/stores/alertStore";

  const userStore = useUserStore();
  const { showAlert } = useAlertStore();

  function formIsValid() {
    if (userStore.userNameIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Имя"');
      return false;
    }
    if (userStore.emailIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Email"');
      return false;
    }
    if (userStore.passwordIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Пароль"');
      return false;
    }
    if (userStore.confirmPasswordIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Подтверждение пароля"');
      return false;
    }
    if (!userStore.emailIsValid) {
      showAlert('Ошибка! Не корректно заполнено поле Email')
      return false;
    }
    if (!userStore.passwordsMatch) {
      showAlert('Ошибка! Пароли не совпадают')
      return false;
    }
    return true;
  }

  function submitCode(email) {
    if (!formIsValid()) return
    userStore.sendConfirmationCode(email)
  }
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