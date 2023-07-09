<template>
  <div class="reg-form">
    <FormInput
      :value="userStore.userName"
      :valid="fieldsValidStatus.userName"
      @setValue="userStore.setUserName"
      name="name"
      label="Имя"
    />
    <FormInput
      :value="userStore.email"
      :valid="fieldsValidStatus.email"
      @setValue="userStore.setEmail"
      name="email"
      label="Email"
    />
    <FormInput
      :value="userStore.password"
      :valid="fieldsValidStatus.password"
      @setValue="userStore.setPassword"
      name="password"
      label="Пароль"
    />
    <FormInput
      :value="userStore.confirmPassword"
      :valid="fieldsValidStatus.confirmPassword"
      @setValue="userStore.setConfirmPassword"
      name="confirmPassword"
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
  import {useNavigationStore} from "@/stores/navigationStore";
  import NavigationSections from "@/const/NavigationSections";
  import {ref} from "vue";

  const userStore = useUserStore()
  const { showAlert } = useAlertStore()
  const { setSection } = useNavigationStore()

  const fieldsValidStatus = ref({
    userName: true,
    email: true,
    code: true,
    password: true,
    confirmPassword: true,
  })

  function formIsValid() {
    if (userStore.userNameIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Имя"');
      fieldsValidStatus.value.userName = false;
      return false;
    }
    if (userStore.emailIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Email"');
      fieldsValidStatus.value.email = false;
      return false;
    }
    if (userStore.passwordIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Пароль"');
      fieldsValidStatus.value.password = false;
      return false;
    }
    if (userStore.confirmPasswordIsEmpty) {
      showAlert('Ошибка! Не заполенено поле "Подтверждение пароля"');
      fieldsValidStatus.value.confirmPassword = false;
      return false;
    }
    if (!userStore.emailIsValid) {
      showAlert('Ошибка! Не корректно заполнено поле Email')
      fieldsValidStatus.value.email = false;
      return false;
    }
    if (!userStore.passwordsMatch) {
      showAlert('Ошибка! Пароли не совпадают')
      fieldsValidStatus.value.password = false;
      fieldsValidStatus.value.confirmPassword = false;
      return false;
    }

    for (let key in fieldsValidStatus.value) {
      fieldsValidStatus.value[key] = true;
    }

    return true;
  }

  async function submitCode(email) {
    if (!formIsValid()) return

    try {
      await userStore.sendConfirmationCode(email)
    } catch (e) {
      if (e.response.data.message) {
        showAlert(e.response.data.message)
      } else {
        showAlert('Произошла ошибка на сервере!')
      }
    }

    setSection(NavigationSections.CONFIRMATION)
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