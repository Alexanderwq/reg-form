<template>
  <div class="profile-form">
    <ProfileInput
      :value="userStore.userName"
      :disabled="true"
    />
    <ProfileInput
      :value="userStore.email"
      :disabled="true"
    />
    <ProfileInput
        :value="userStore.email"
        :disabled="true"
    />
    <ProfileInput
        :value="userStore.email"
        :disabled="true"
    />
  </div>
</template>

<script setup>
  import ProfileInput from "@/components/ProfileSection/ProfileInput.vue";
  import {useUserStore} from "@/stores/userStore";

  const userStore = useUserStore()
</script>

<style lang="scss" scoped>
  .profile-form{
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>