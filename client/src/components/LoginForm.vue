<template>
  <div class="login-form">
    <p class="login-form__title">
      Войдите в систему
    </p>
    <FormInput
      :value="email"
      :valid="!submitted || (!emailIsEmpty && emailIsValid)"
      @setValue="setEmail"
      name="email"
      label="Email"
    />
    <FormInput
        :value="password"
        :valid="!submitted || !passwordIsEmpty"
        @setValue="setPassword"
        name="password"
        label="Пароль"
    />
    <FormButton
        @click="signIn"
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
  import {useAlertStore} from "@/stores/alertStore";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {useProfileStore} from "@/stores/useProfileStore";
  import useEmail from "@/composables/useEmail";
  import usePassword from "@/composables/usePassword";
  import {ref} from "vue";

  const { email, emailIsEmpty, emailIsValid, setEmail } = useEmail()
  const { password, passwordIsEmpty, setPassword } = usePassword()
  const userStore = useUserStore()
  const { showAlert } = useAlertStore()
  const navStore = useNavigationStore()
  const profileStore = useProfileStore()

  const submitted = ref(false)

  function validateForm() {
    if (emailIsEmpty.value) {
      showAlert('Ошибка! Не заполенено поле "Email"');
      return false;
    }
    if (passwordIsEmpty.value) {
      showAlert('Ошибка! Не заполенено поле "Пароль"');
      return false;
    }
    if (!emailIsValid.value) {
      showAlert('Ошибка! Не корректно заполнено поле "Email"')
      return false;
    }

    return true
  }

  async function signIn() {
    submitted.value = true
    if (!validateForm()) return

    try {
      const res = await userStore.signIn(email.value, password.value)
      document.cookie = `token=${res.data.token}`
      navStore.setSection(navStore.profileSection)
      await profileStore.getProfile()
    } catch (e) {
      if (e.response?.data.message) {
        showAlert(e.response.data.message)
      } else {
        showAlert('Произошла ошибка на сервере!')
      }
    }
  }
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