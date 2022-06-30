<template>
  <section class="experience-grid">
    <div class="experience-select">
      <div v-for="(item, index) in experience" :key="index" class="experience" :class="{'active': index === activeIndex}" tabindex="0" @click="setActiveIndex(index)" @keyup.tab="setActiveIndex(index)">
        <div class="flex align-center">
          <img :src="item.logo" />
          <span class="bold larger">{{ item.company }}</span>
        </div>
        <p class="large">{{ item.title }}</p>
        <p class="italic small">{{ item.year }}</p>
      </div>
    </div>
    <div class="experience-details flex flex-center bg-color-font">
      <ul>
        <li v-for="(line, index) in selectedItem.description" :key="index">{{ line }}</li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Experience',
    data() {
      return {
        activeIndex: 0,
        experience: [
          {
            logo: '/images/gitlab_logo.svg',
            company: 'GitLab',
            title: 'Senior Frontend Engineer',
            year: 'Mar 2021 - Present',
            description: [
              `Stable FE counterpart of the Enablement Department`,
              `Full stack web development (Ruby on Rails, Vue.JS, PostgreSQL)`,
              `Expanding Vue.JS style system GitLab UI`,
              `Unit and Integration Testing (Jest, Capybara)`
            ]
          },
          {
            logo: '/images/gitlab_logo.svg',
            company: 'GitLab',
            title: 'Frontend Engineer',
            year: 'Oct 2019 - Mar 2021',
            description: [
              `Building Frontend for GitLab's Geo Product`,
              `Full stack web development (Ruby on Rails, Vue.JS, PostgreSQL)`,
              `Expanding Vue.JS style system GitLab UI`,
              `Unit and Integration Testing (Jest, Capybara)`
            ]
          },
          {
            logo: '/images/wwt_logo.svg',
            company: 'World Wide Technology',
            title: 'Developer',
            year: 'Jan 2019 - Oct 2019',
            description: [
              `Building an in house CMS to support content served on WWT.com`,
              `Operating as an in-house startup solving business problems with web applications`,
              `Full stack web development (Groovy on Grails, Node.JS, Angular.JS, Vue.JS, Nuxt.JS, MongoDB, OracleDB)`,
              `Integration between ATC Applications (ServiceNow, SalesForce)`,
              `Development and Configuration of the ServiceNow Platform`,
              `Unit and Integration testing (Jasmine, Karma)`
            ]
          },
          {
            logo: '/images/wwt_logo.svg',
            company: 'World Wide Technology',
            title: 'Associate Developer',
            year: 'Dec 2017 - Jan 2019',
            description: [
              `Operating as an in-house startup solving business problems with web applications`,
              `Full stack web development  (Groovy on Grails, Node.JS, Angular.JS, Vue.JS, MongoDB)`,
              `Integration between ATC Applications (ServiceNow, SalesForce)`,
              `Development and Configuration of the ServiceNow Platform`,
              `Unit and Integration testing (Jasmine, Karma)`
            ]
          },
          {
            logo: '/images/wwt_logo.svg',
            company: 'World Wide Technology',
            title: 'Intern',
            year: 'May 2015 - Dec 2017',
            description: [
              `Building software engineer knowledge while supporting the internal ServiceNow applications`,
              `Development and Configuration of the ServiceNow Platform`
            ]
          },
        ]
      }
    },
    computed: {
      selectedItem() {
        return this.experience[this.activeIndex]
      }
    },
    methods: {
      setActiveIndex(index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .experience-grid {
    border: 3px solid color('primary');
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 1rem;

    @media (min-width: breaks(tablet)) {
      grid-template-columns: 1fr 1fr;
    }

    .experience-select {
      font-size: 0.9em;
      border-bottom: 1px solid color('grey');

      @media (min-width: breaks(legacy-phone)) {
        font-size: 1em;
      }

      @media (min-width: breaks(tablet)) {
        border-right: 1px solid color('grey');
      }
    }

    ul {
      padding-left: 1rem;
    }

    li {
      list-style-type: circle;
    }

    img {
      height: 3rem;
      width: 3rem;
    }

    .experience {
      padding: 0.25rem 1rem;
      width: 100%;
      border-bottom: 1px solid color('primary');
      background-color: darken(color('greyLight'), 10%);
      filter: grayscale(100);
      transition: all 400ms;

      &:last-child {
        border-bottom: 0;
      }

      &.active,
      &:hover,
      &:focus,
      &:active,
      &:focus-visible,
      &:focus-within {
        background-color: color('font');
        filter: grayscale(0);
        cursor: pointer;
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible,
      &:focus-within {
        border-color: transparent;
        outline: color('primary') auto 1px;
      }
    }

    .experience-details {
      padding: 3rem 1rem;

      @media (min-width: breaks(legacy-phone)) {
        padding: 3rem;
      }
    }
  }
</style>
