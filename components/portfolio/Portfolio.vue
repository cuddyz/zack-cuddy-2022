<template>
  <section class="portfolio-grid">
    <div v-for="item in portfolio" :key="item.portfolioName" class="portfolio-grid-item" tabindex="0">
      <div class="image-container" :style="backgroundImage(item)" />
      <div class="text flex column flex-center">
        <p>{{ item.title }}</p>
        <span>{{ item.language }}</span>
      </div>
      <div class="see-more flex flex-center">
        <button @click="seeMore(item)">See more</button>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Portfolio',
    data() {
      return {
        portfolio: [
          {
            title: 'GitLab Geo',
            portfolioName: 'gitlab',
            totalImages: 4,
            description: 'The solution for widely distributed development teams.',
            language: 'Vue.JS / Ruby',
            source: 'https://gitlab.com/gitlab-org/gitlab/-/tree/master/ee/app/assets/javascripts/geo_nodes',
            sourceIcon: 'gitlab',
            url: 'https://about.gitlab.com/solutions/geo/',
            technology: [
              `Vue.JS - Majority of UI, state management via Vuex`,
              `GitLab UI - Component Library built in Vue.JS and SASS`,
              `REST and GraphQL - APIs powering various parts of the UI`,
              `Ruby/HAML - Server side rendering of templates`,
              `Jest - Unit tests via vue-test-utils`,
              `Capybara - Integration tests`
            ]
          },
          {
            title: 'GielowKrebs',
            portfolioName: 'accounting',
            totalImages: 3,
            description: 'Early web presence for local accounting firm.',
            language: 'Nuxt.JS',
            source: 'https://github.com/cuddyz/The-Accounting-Office',
            sourceIcon: 'github',
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `SASS - Preprocessed CSS3 to provide better responsive design`
            ]
          },
          {
            title: 'WaxAlerts',
            portfolioName: 'wax',
            totalImages: 2,
            description: 'Sealed sports card inventory tracker.',
            language: 'Nuxt.JS / Node.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Node.JS - Web server responsible for scraping major retailers websites`,
              `Puppeteer - Google powered web crawler used to control the Node.JS scraper`,
              `Firestore - Google Firebase web storage to manage scraped data`,
              `Mailchimp - Email service used to send out email alerts on inventory updates`,
              `Discord Bot - Chat service used to instant message alerts of inventory updates`,
              `FireAuth - Google Authentication to manage user data`
            ]
          },
          {
            title: 'TreyTheTrainer',
            portfolioName: 'trey',
            totalImages: 6,
            description: 'Personal trainer service sales site.',
            language: 'Nuxt.JS / Node.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Node.JS - Web server responsible of handling transactions and applications of customers`,
              `Contentful - CMS to allow trainer to update content on site without developer support`,
              `AirTable - Database with Google Sheets style UI to allow trainer to manage customers stored straight from Node.JS server`,
              `PayPal - Integrated payment service to complete transactions with customers on site`
            ]
          },
          {
            title: 'TeachMeHowToCuddy',
            portfolioName: 'wedding',
            totalImages: 3,
            description: 'Upcoming wedding site for couple.',
            language: 'Nuxt.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Contentful - CMS to allow couple to add registries to their site and store notes sent from attendees`
            ]
          },
          {
            title: 'CardsRUs',
            portfolioName: 'cardsrus',
            totalImages: 4,
            description: 'Card collecting community site.',
            language: 'Nuxt.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Firestore - Google Firebase web storage to manage merchandise sales`,
              `PayPal - Integrated payment service to complete transactions with customers on site`
            ]
          },
          {
            title: 'Realtio',
            portfolioName: 'realtio',
            totalImages: 3,
            description: 'Rental cashflow investment report builder.',
            language: 'Nuxt.JS / Node.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Node.JS - Web server responsible for scraping property listings and rental estimates`,
              `Puppeteer - Google powered web crawler used to control the Node.JS scraper`,
              `Realtor RapidAPI - Data source for active retail listings`,
              `Firestore - Google Firebase web storage to manage scraped data and user built reports`,
              `FireAuth - Google Authentication to manage user data`
            ]
          },
          {
            title: 'Seven T Farms',
            portfolioName: 'venue',
            totalImages: 7,
            description: 'Local wedding venue site.',
            language: 'Nuxt.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Firestore - Google Firebase web storage to manage booked days and user defined prices`,
              `FireStorage - Google file storage for large image file caching`,
              `FireAuth - Google Authentication to authenticate admin users`
            ]
          },
          {
            title: 'CardsRUs Investments',
            portfolioName: 'psa',
            totalImages: 3,
            description: 'Graded Pokemon card eBay sales tracker.',
            language: 'Nuxt.JS / Node.JS',
            source: null,
            sourceIcon: null,
            url: null,
            technology: [
              `Nuxt.JS - Entire UI built via Nuxt.JS`,
              `Node.JS - Web server responsible for scraping PSA and eBay sales records`,
              `Puppeteer - Google powered web crawler used to control the Node.JS scraper`,
              `Firestore - Google Firebase web storage to manage scraped data`,
              `FireAuth - Google Authentication to manage user data`
            ]
          },
          {
            title: 'Oakville Butcher Block',
            portfolioName: 'obb',
            totalImages: 4,
            description: 'Local butcher shop site.',
            language: 'Vue.JS',
            source: null,
            sourceIcon: null,
            url: 'https://oakvillebutcherblock.com/',
            technology: [
              `Vue.JS - Entire UI built via Vue.JS`,
              `GiftUp! - Integration to sell online gift cards to be used in-person`,
              `TeePublic - Integration to sell T-Shirts to customers`,
              `CSVtoJSON - Integration to allow owner to provide CSV of menu to be added to site`
            ]
          }
        ]
      }
    },
    mounted() {
      document.documentElement.style.setProperty('--scrollbar-width', (window.innerWidth - document.documentElement.clientWidth) + "px");
    },
    methods: {
      backgroundImage(item) {
        return `background-image: url('/images/portfolio/${item.portfolioName}/${item.portfolioName}_01.jpg')`
      },
      seeMore(item) {
        this.$emit('show', item)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';
  @import './assets/styles/breaks';

  .portfolio-grid {
    display: flex;
    flex-wrap: wrap;

    .portfolio-grid-item {
      position: relative;

      .image-container {
        width: calc(100vw - var(--scrollbar-width));
        height: calc(100vw - var(--scrollbar-width));
        background-size: cover;
        background-repeat: no-repeat;
        transition: opacity 400ms;

        @media (min-width: breaks(phablet)) {
          width: calc(50vw - var(--scrollbar-width) / 2);
          height: calc(50vw - var(--scrollbar-width) / 2);
        }

        @media (min-width: breaks(tablet)) {
          width: calc(100vw / 3 - var(--scrollbar-width) / 3);
          height: calc(100vw / 3 - var(--scrollbar-width) / 3);
        }

        @media (min-width: breaks(laptop)) {
          width: calc(25vw - var(--scrollbar-width) / 4);
          height: calc(25vw - var(--scrollbar-width) / 4);
        }

        @media (min-width: breaks(max)) {
          width: calc(breaks(max) / 4);
          height: calc(breaks(max) / 4);
        }
      }

      .text {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        opacity: 0;
        z-index: 2;
        transition: all 400ms;

        p {
          font-size: 1.6em;
          font-weight: bold;
          color: color('primary')
        }
      }

      .see-more {
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0;
        z-index: 2;
        width: 100%;
        transition: all 400ms;

        button {
          width: 50%;
          border-color: color('primary');
          color: color('primary');
          font-size: 1.2em;

          &:hover,
          &:focus,
          &:active,
          &:focus-visible,
          &:focus-within {
            color: color('font');
            background-color: color('primary');
            border-color: transparent;
            outline: color('primary') auto 1px;
          }
        }
      }

      &:hover,
      &:focus,
      &:active,
      &:focus-visible,
      &:focus-within {
        border-color: transparent;
        outline: color('primary') auto 1px;

        .image-container {
          opacity: 0.05;
        }

        .text {
          opacity: 1;
          top: 25%;
        }

        .see-more {
          opacity: 1;
          bottom: 25%;
        }
      }
    }
  }
</style>
