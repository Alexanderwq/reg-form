<template>
  <div class="reg-form">
    <FormInput
      :value="userName"
      :valid="!submitted || !userNameIsEmpty"
      @setValue="setUserName"
      name="name"
      label="Имя"
    />
    <FormInput
      :value="email"
      :valid="!submitted || ( !emailIsEmpty && emailIsValid )"
      @setValue="setEmail"
      name="email"
      label="Email"
    />
    <FormInput
      :value="password"
      :valid="!submitted || (passwordIsEmpty && passwordsMatch)"
      @setValue="setPassword"
      name="password"
      label="Пароль"
    />
    <FormInput
      :value="confirmPassword"
      :valid="!submitted || (confirmPasswordIsEmpty && passwordsMatch)"
      @setValue="setConfirmPassword"
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
  import FormButton from "@/common/FormButton.vue";
  import {useAlertStore} from "@/stores/alertStore";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {computed, ref} from "vue";
  import useEmail from "@/composables/useEmail";
  import usePassword from "@/composables/usePassword";
  import useUserName from "@/composables/useUserName";
  import useAuth from "@/composables/useAuth";

  const { showAlert } = useAlertStore()
  const { sendConfirmationCode } = useAuth()
  const {confirmationSection, setSection } = useNavigationStore()
  const { userName, userNameIsEmpty, setUserName } = useUserName()
  const { email, emailIsEmpty, emailIsValid, setEmail } = useEmail()
  const { password, passwordIsEmpty, setPassword } = usePassword()
  const {
    password: confirmPassword,
    passwordIsEmpty: confirmPasswordIsEmpty,
    setPassword: setConfirmPassword
  } = usePassword()

  const submitted = ref(false)

  const passwordsMatch = computed(() => password.value === confirmPassword.value)

  function validateForm() {
    let formIsValid = true

    if (userNameIsEmpty.value) {
      showAlert('Ошибка! Не заполенено поле "Имя"');
      formIsValid = false;
    }
    if (emailIsEmpty.value) {
      showAlert('Ошибка! Не заполенено поле "Email"');
      formIsValid = false;
    }
    if (passwordIsEmpty.value) {
      showAlert('Ошибка! Не заполенено поле "Пароль"');
      formIsValid = false;
    }
    if (confirmPasswordIsEmpty.value) {
      showAlert('Ошибка! Не заполенено поле "Подтверждение пароля"');
      formIsValid = false;
    }
    if (!emailIsValid.value) {
      showAlert('Ошибка! Не корректно заполнено поле Email')
      formIsValid = false;
    }
    if (!passwordsMatch.value) {
      showAlert('Ошибка! Пароли не совпадают')
      formIsValid = false;
    }

    return formIsValid;
  }

  async function submitCode(email) {
    submitted.value = true
    if (!validateForm()) return

    try {
      await sendConfirmationCode(email.value)
    } catch (e) {
      if (e.response?.data.message) {
        showAlert(e.response.data.message)
      } else {
        showAlert('Произошла ошибка на сервере!')
      }
    }

    setSection(confirmationSection)
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