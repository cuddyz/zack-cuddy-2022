<template>
  <footer class="flex column flex-center">
    <img src="/images/Logo.png" width="50px" class="my-1">
    <div class="flex align-center">
      <div class="icon-circle">
        <a href="https://gitlab.com/zcuddy" rel="noreferrer" target="_blank" aria-label="GitLab"><i class="fab fa-gitlab" aria-hidden="true" /></a>
      </div>
      <div class="icon-circle">
        <a href="https://github.com/cuddyz" rel="noreferrer" target="_blank" aria-label="GitHub"><i class="fab fa-github" aria-hidden="true" /></a>
      </div>
      <div class="icon-circle">
        <a href="https://www.linkedin.com/in/zcuddy/" rel="noreferrer" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin-in" aria-hidden="true" /></a>
      </div>
      <div class="icon-circle">
        <a href="mailto:zcuddy23@gmail.com" rel="noreferrer" aria-label="Email"><i class="far fa-envelope" aria-hidden="true" /></a>
      </div>
    </div>
    <p class="pt-50 smaller">
      Copyright © {{ year }} Zack Cuddy
    </p>
    <a class="p-50 smaller" href="https://github.com/cuddyz/zack-cuddy-2022" rel="noreferrer" target="_blank">
      View page source
    </a>
  </footer>
</template>

<script>
export default {
  name: 'BottomFooter',
  computed: {
    year () {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  footer {
    background-color: color(bg);
    color: color(font);
    border-top: 2px solid color('primary');

    a {
      color: color('primary');

      &:hover {
        color: color('primaryDark');
      }
    }

    .icon-circle {
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: color('primary');
      border-radius: 100%;
      margin: 0.5rem;

      &:hover {
        cursor: pointer;
        background-color: color('primaryDark');
      }

      > a {
        font-size: 1.2em;
        color: color(bg);
      }
    }
  }
</style>
