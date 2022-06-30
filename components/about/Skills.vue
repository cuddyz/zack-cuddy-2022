<template>
  <section class="skills">
    <header class="skill-grid">
      <span class="text-left">Skill</span>
      <span>Learning</span>
      <span>Growing</span>
      <span>Performing</span>
      <span>Excelling</span>
    </header>
    <div v-for="skill in skills" :key="skill.title" class="skill-grid">
      <p class="bold text-left">{{ skill.title }}</p>
      <i class="fas fa-star" :class="{ 'level': skill.level === 1 }" />
      <i class="fas fa-star" :class="{ 'level': skill.level === 2 }" />
      <i class="fas fa-star" :class="{ 'level': skill.level === 3 }" />
      <i class="fas fa-star" :class="{ 'level': skill.level === 4 }" />
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Skills',
    data() {
      return {
        skills: [
          {
            title: 'Vue.JS',
            level: 4
          },
          {
            title: 'Nuxt.JS',
            level: 4
          },
          {
            title: 'Javascript',
            level: 4
          },
          {
            title: 'HTML',
            level: 4
          },
          {
            title: 'CSS',
            level: 3
          },
          {
            title: 'Node.JS',
            level: 3
          },
          {
            title: 'Firebase',
            level: 3
          },
          {
            title: 'UI Design',
            level: 2
          },
          {
            title: 'Lua',
            level: 2
          },
          {
            title: 'Python',
            level: 2
          },
          {
            title: 'Photoshop',
            level: 1
          },
          {
            title: 'Ruby',
            level: 1
          },
          {
            title: 'Flutter',
            level: 1
          },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .skills {
    background-color: color('bg');
    border:  3px solid color('primary');
    padding: 1rem;

    @media (min-width: breaks(phone)) {
      padding: 3rem;
    }
  }

  header {
    font-size: 0.8em;
    font-style: italic;
    color: color('font');
    margin-bottom: 1rem;
    border-bottom: 1px solid color('font');
  }

  .skill-grid {
    display: grid;
    text-align: center;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    grid-gap: 0.5rem;

    .fa-star {
      color: rgba(color('font'), 10%);

      &.level {
        color: color('primary');
      }
    }
  }
</style>
