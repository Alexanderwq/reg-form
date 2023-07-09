<template>
  <div class="profile">
    <ProfilePhoto />
    <ProfileForm />
    <ProfilePanel />
  </div>
</template>

<script setup>
  import ProfilePhoto from "@/components/ProfileSection/ProfilePhoto.vue";
  import ProfileForm from "@/components/ProfileSection/ProfileForm.vue";
  import ProfilePanel from "@/components/ProfileSection/ProfilePanel.vue";
</script>

<style lang="scss" scoped>
  .profile{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
  }
</style>