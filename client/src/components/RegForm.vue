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
      :valid="!submitted || (!passwordIsEmpty && passwordsMatch)"
      @setValue="setPassword"
      name="password"
      label="Пароль"
    />
    <FormInput
      :value="confirmPassword"
      :valid="!submitted || (!confirmPasswordIsEmpty && passwordsMatch)"
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

  const getErrorMessage = computed(() => {
    let message = []
    if (userNameIsEmpty.value) {
      message.push('Не заполенено поле "Имя" \n');
    }
    if (emailIsEmpty.value) {
      message.push('Не заполенено поле "Email" \n');
    }
    if (passwordIsEmpty.value) {
      message.push('Не заполенено поле "Пароль" \n');
    }
    if (confirmPasswordIsEmpty.value) {
      message.push('Не заполенено поле "Подтверждение пароля" \n');
    }
    if (!emailIsValid.value) {
      message.push('Не корректно заполнено поле Email \n')
    }
    if (!passwordsMatch.value) {
      message.push('Пароли не совпадают \n')
    }

    return 'Ошибка!\n' + message.join(' ');
  })

  const formIsValid = computed(() => {
    return !userNameIsEmpty.value &&
        !emailIsEmpty.value &&
        !passwordIsEmpty.value &&
        !confirmPasswordIsEmpty.value &&
        emailIsValid.value &&
        passwordsMatch.value
  })


  async function submitCode(email) {
    submitted.value = true
    if (!formIsValid.value) return showAlert(getErrorMessage.value)

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