<template>
  <section class="flex column align-center">
    <div class="image-container mb-2"></div>
    <div class="text-center">
      <p>My name is <span class="bold color-primary">Zack Cuddy</span> and I'm a Senior Frontend Engineer at <span class="bold color-primary">GitLab</span>.</p>
      <p>Located in <span class="bold color-primary">St. Louis, MO</span>.</p>
      <p>I specialize in building <span class="bold color-primary">Vue.JS</span> web applications that scale through my rigorous approach to <span class="bold color-primary">maintainability</span> and <span class="bold color-primary">quality</span>.</p>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'AboutMe'
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .image-container {
    background-image: url('/images/me.jpg');
    border-radius: 50%;
    border: 5px solid color('primary');
    height: 10rem;
    width: 10rem;
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;

    @media (min-width: breaks(legacy-phone)) {
      height: 13rem;
      width: 13rem;
    }

    @media (min-width: breaks(phone)) {
      height: 18rem;
      width: 18rem;
    }
  }

  p {
    color: color('fontDark');
  }
</style>
