<template>
  <section class="py-3">
    <div class="flex column flex-center mb-2">
      <h2 class="capitalize">Contact</h2>
      <p class="mt-1">Have a question or want to work together?</p>
    </div>
    <div class="contact-block">
      <contact-form />
    </div>
  </section>
</template>

<script>
  import ContactForm from './ContactForm'

  export default {
    name: 'ContactBlock',
    components: {
      ContactForm,
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  h2 {
    font-size: 2em;
    color: color('font');
    border-bottom: 3px solid color('font');
  }

  p {
    color: color('font');
  }

  section {
    background-color: color('primary');
  }

  .contact-block {
    margin: 0 1rem;
  }
</style>
