<template>
  <div class="profile-form">
    <ProfileInput
      :value="profileStore.userName"
      :disabled="profileStore.userNameIsDisabled"
      @inputValue="profileStore.setUserName"
      @enableInput="profileStore.setUserNameIsDisabled(false)"
    />
    <ProfileInput
      :value="profileStore.email"
      :disabled="profileStore.emailIsDisabled"
      @inputValue="profileStore.setEmail"
      @enableInput="profileStore.setEmailIsDisabled(false)"
    />
    <ProfileInput
        :value="profileStore.password"
        :disabled="profileStore.passwordIsDisabled"
        @inputValue="profileStore.setPassword"
        @enableInput="profileStore.setPasswordIsDisabled(false)"
    />
    <ProfileInput
        :value="profileStore.confirmPassword"
        :disabled="profileStore.confirmPasswordIsDisabled"
        @inputValue="profileStore.setConfirmPassword"
        @enableInput="profileStore.setConfirmPasswordIsDisabled(false)"
    />
  </div>
</template>

<script setup>
  import ProfileInput from "@/components/ProfileSection/ProfileInput.vue";
  import {useProfileStore} from "@/stores/profileStore";

  const profileStore = useProfileStore()
</script>

<style lang="scss" scoped>
  .profile-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>