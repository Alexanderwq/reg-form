<template>
  <form class="login-form" @submit.prevent="submit">
    <p class="login-form__title">
      Войдите в систему
    </p>
    <FormInput
      :value="authStore.email"
      :valid="!submitted || (!authStore.emailIsEmpty && authStore.emailIsValid)"
      @setValue="authStore.setEmail"
      name="email"
      label="Email"
    />
    <FormInput
        :value="authStore.password"
        :valid="!submitted || !authStore.passwordIsEmpty"
        @setValue="authStore.setPassword"
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
  </form>
</template>

<script setup>
  import FormInput from "@/common/FormInput.vue";
  import FormButton from "@/common/FormButton.vue";
  import {useAlertStore} from "@/stores/alertStore";
  import {useNavigationStore} from "@/stores/navigationStore";
  import {useProfileStore} from "@/stores/useProfileStore";
  import {computed, ref} from "vue";
  import useCookie from "@/composables/useCookie";
  import {useAuthStore} from "@/stores/authStore";

  const authStore = useAuthStore()
  const { showAlert } = useAlertStore()
  const navStore = useNavigationStore()
  const profileStore = useProfileStore()
  const { setCookie } = useCookie()

  const submitted = ref(false)

  const formIsValid = computed(() => !authStore.emailIsEmpty && !authStore.passwordIsEmpty && authStore.emailIsValid)

  const getErrorMessage = computed(() => {
    let message = []
    if (authStore.emailIsEmpty) {
      message.push('Не заполенено поле "Email"');
    }
    if (authStore.passwordIsEmpty) {
      message.push('Не заполенено поле "Пароль"');
    }
    if (!authStore.emailIsValid) {
      message.push('Не корректно заполнено поле "Email"')
    }

    return 'Ошибка! \n' + message.join('\n')
  })

  async function submit() {
    submitted.value = true
    if (!formIsValid.value) return showAlert(getErrorMessage.value)

    try {
      const { token } = await authStore.signIn()
      setCookie('token', token)
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