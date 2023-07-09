<template>
  <div class="photo-block">
    <img class="photo-block__img" src="../../assets/img/default-photo.png" alt="photo" />
    <p class="photo-block__name">
      Имя
    </p>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
  .photo-block{
    border-radius: 30px;
    background: #C8DBFF;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    justify-content: center;

    &__img{
      max-width: 170px;
      height: 170px;
      width: 100%;
      overflow: hidden;
      border-radius: 50%;
    }

    &__name{
      color: #4786FF;
      font-size: 40px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }
</style>