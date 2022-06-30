<template>
  <form
    id="contact-form"
    name="contact-form"
    method="POST"
    action="/"
    class="flex column"
    data-netlify="true"
    data-netlify-honeypot="bot-field"
    @submit.prevent="handleFormSubmit"
  >
    <input id="name" v-model="formData.name" name="name" placeholder="Name" type="text" required />
    <input id="email"  v-model="formData.email" name="email" placeholder="Email" type="email" required />
    <textarea  id="message" v-model="formData.message" name="message" placeholder="Message" required />
    <input type="hidden" name="form-name" value="contact-form" />
    <p hidden><label>Do not fill this out: <input name="bot-field" /></label></p>
    <button class="mt-25" type="submit">Submit</button>
    <transition name="response-message">
      <p v-if="response.message" :class="response.type">{{ response.message }}</p>
    </transition>
  </form>
</template>

<script>
  export default {
    name: 'ContactForm',
    data() {
      return {
        response: {
          type: null,
          message: ''
        },
        formData: {
          name: '',
          email: '',
          message: ''
        }
      }
    },
    methods: {
      async handleFormSubmit(event) {
        const form = event.target
        const body = new URLSearchParams(new FormData(form))

        try {
          const res = await fetch(form.action, { method: 'POST', body })

          if (res.ok) {
            this.response = {
              type: 'success',
              message: `The Eagle has Landed! I'll get back to you shortly!`
            }

            this.formData = {
              name: '',
              email: '',
              message: ''
            }
          } else {
            throw res
          }
        } catch (err) {
          this.response = {
            type: 'error',
            message: `Houston, we have a problem! Try again later!`
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  form {
    width: 100%;
    max-width: breaks(phablet);
    margin: auto;

    button {
      margin-left: auto;
      background-color: color('primaryDark');
      border-color: color('primaryDark');

      &:hover,
      &:focus,
      &:active {
        border-color: color('font');
        background-color: color('font');
        color: color('primaryDark');
      }
    }

    p {
      text-align: center;
      margin-top: 1rem;
      padding: 0.5rem;

      &.success {
        background-color: color('primaryDark');
        color: color('font');
      }

      &.error {
        background-color: color('red');
        color: color('font');
      }
    }
  }

  .response-message-enter-active,
  .response-message-leave-active {
    transition: opacity 400ms;
  }

  .response-message-enter,
  .response-message-leave-to {
    opacity: 0;
  }
</style>
