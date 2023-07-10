<template>
  <div class="profile-form">
    <ProfileInput
      :value="userStore.userName"
      :disabled="profileStore.userNameIsDisabled"
      @inputValue="userStore.setUserName"
      @enableInput="profileStore.setUserNameIsDisabled(false)"
    />
    <ProfileInput
      :value="userStore.email"
      :disabled="profileStore.emailIsDisabled"
      @inputValue="userStore.setEmail"
      @enableInput="profileStore.setEmailIsDisabled(false)"
    />
    <ProfileInput
        :value="userStore.password"
        :disabled="profileStore.passwordIsDisabled"
        @inputValue="userStore.setPassword"
        @enableInput="profileStore.setPasswordIsDisabled(false)"
    />
    <ProfileInput
        :value="userStore.confirmPassword"
        :disabled="profileStore.confirmPasswordIsDisabled"
        @inputValue="userStore.setConfirmPassword"
        @enableInput="profileStore.setConfirmPasswordIsDisabled(false)"
    />
  </div>
</template>

<script setup>
  import ProfileInput from "@/components/ProfileSection/ProfileInput.vue";
  import {useUserStore} from "@/stores/userStore";
  import {useProfileStore} from "@/stores/useProfileStore";

  const userStore = useUserStore()
  const profileStore = useProfileStore()
</script>

<style lang="scss" scoped>
  .profile-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>