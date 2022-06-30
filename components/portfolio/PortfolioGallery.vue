<template>
  <div>
    <carousel
      :value="activeImageIndex"
      :per-page="1" :loop="true"
      pagination-position="bottom-overlay"
      pagination-color="#FAFAFA"
      pagination-active-color="#39BEFF"
      @page-change="updateActiveImageIndex"
    >
      <slide v-for="image in portfolioImages" :key="image">
       <img :src="image" />
      </slide>
    </carousel>
    <div class="gallery-controls flex align-center">
      <span class="flex align-center" @click="prevImage"><i class="fas fa-chevron-left pr-50" /> Prev</span>
      <span class="flex align-center" @click="nextImage">Next <i class="fas fa-chevron-right pl-50" /></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PortfolioGallery',
    props: {
      imagePath: {
        type: String,
        required: true
      },
      totalImages: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        activeImageIndex: 0
      }
    },
    computed: {
      portfolioImages() {
        const imageArray = []

        for (let i = 0; i < this.totalImages; i++) {
          imageArray.push(`/images/portfolio/${this.imagePath}/${this.imagePath}_0${i+1}.jpg`)
        }

        return imageArray
      }
    },
    methods: {
      prevImage() {
        let newIndex = this.activeImageIndex - 1

        // Prev clicked on first image, loop forward to the end
        if (newIndex < 0) {
          newIndex = this.totalImages - 1
        }

        this.updateActiveImageIndex(newIndex)
      },
      nextImage() {
        let newIndex = this.activeImageIndex + 1

        // Prev clicked on last image, loop back to the start
        if (newIndex >= this.totalImages) {
          newIndex = 0
        }

        this.updateActiveImageIndex(newIndex)
      },
      updateActiveImageIndex(index) {
        this.activeImageIndex = index
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/styles/colors';

  img {
    max-width: 100%;
  }

  .gallery-controls {
    font-size: 1.1em;
    justify-content: space-between;
    padding: 1rem;

    span {
      transition: all 400ms;
      font-weight: bold;
      color: color('primary');

      &:hover,
      &:active {
        cursor: pointer;
        color: color('primaryDark');
      }
    }
  }
</style>
