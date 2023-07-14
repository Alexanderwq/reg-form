<template>
  <form class="reg-form" @submit.prevent="submitForm">
    <FormInput
      :value="authStore.userName"
      :valid="!submitted || !authStore.userNameIsEmpty"
      @setValue="authStore.setUserName"
      name="name"
      label="Имя"
    />
    <FormInput
      :value="authStore.email"
      :valid="!submitted || ( !authStore.emailIsEmpty && authStore.emailIsValid )"
      @setValue="authStore.setEmail"
      name="email"
      label="Email"
    />
    <FormInput
      :value="authStore.password"
      :valid="!submitted || (!authStore.passwordIsEmpty && authStore.passwordsMatch)"
      @setValue="authStore.setPassword"
      name="password"
      label="Пароль"
    />
    <FormInput
      :value="authStore.confirmPassword"
      :valid="!submitted || (!authStore.confirmPasswordIsEmpty && authStore.passwordsMatch)"
      @setValue="authStore.setConfirmPassword"
      name="confirmPassword"
      label="Подтверждение пароля"
    />
    <FormButton
      class="reg-form__button"
    >
      <template v-slot:text>
        Зарегистрироваться
      </template>
    </FormButton>
  </form>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import FormButton from "@/common/FormButton.vue";
  import {useAlertStore} from "@/stores/alertStore";
  import {computed, ref} from "vue";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {useAuthStore} from "@/stores/authStore";

  const { confirmationSection, setSection } = useNavigationStore()
  const { showAlert } = useAlertStore()
  const authStore = useAuthStore()

  const submitted = ref(false)

  const getErrorMessage = computed(() => {
    let message = []
    if (authStore.userNameIsEmpty) {
      message.push('Не заполенено поле "Имя"');
    }
    if (authStore.emailIsEmpty) {
      message.push('Не заполенено поле "Email"');
    }
    if (authStore.passwordIsEmpty) {
      message.push('Не заполенено поле "Пароль"');
    }
    if (authStore.confirmPasswordIsEmpty) {
      message.push('Не заполенено поле "Подтверждение пароля"');
    }
    if (!authStore.emailIsValid) {
      message.push('Не корректно заполнено поле Email')
    }
    if (!authStore.passwordsMatch) {
      message.push('Пароли не совпадают')
    }

    return 'Ошибка!\n' + message.join('\n');
  })

  const formIsValid = computed(() => {
    return !authStore.userNameIsEmpty &&
        !authStore.emailIsEmpty &&
        !authStore.passwordIsEmpty &&
        !authStore.confirmPasswordIsEmpty &&
        authStore.emailIsValid &&
        authStore.passwordsMatch
  })

  async function submitForm() {
    submitted.value = true
    if (!formIsValid.value) return showAlert(getErrorMessage.value)

    try {
      await authStore.sendConfirmationCode()
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