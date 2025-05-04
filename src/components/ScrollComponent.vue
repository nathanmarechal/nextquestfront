<template>
  <div class="carousel-container" @mouseenter="hover = true" @mouseleave="hover = false">
    <div class="title">
      <img :src="logo" alt="Suggestions" class="suggestion-logo" />
    </div>
    <div class="carousel-wrapper">
      <div v-if="hover" class="arrow prev" @click="prev">
        <img :src="arrowImage" class="arrow-icon rotated" />
      </div>
      <div class="carousel-list" ref="carousel">
        <ul class="slider-content" :style="{ transform: slideTransform }">
          <li v-for="(game, index) in games" :key="index">
            <router-link :to="`/game/${game.title}`"><img :src="game.image" :alt="game.title" /></router-link>
          </li>
        </ul>
      </div>
      <div v-if="hover" class="arrow next" @click="next">
        <img :src="arrowImage" class="arrow-icon" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    games: Array,
    logo: String,
    arrowImage: String,
    scrollDirection: {
      type: String,
      default: 'right',
      validator: value => ['left', 'right'].includes(value)
    }
  },
  data () {
    return {
      currentIndex: 0,
      hover: false,
      slideWidth: 224,
      intervalId: null
    }
  },
  computed: {
    slideTransform () {
      const offset = this.currentIndex * this.slideWidth
      return `translateX(-${offset}px)`
    }
  },
  methods: {
    next () {
      const maxIndex = this.games.length - 5
      this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1
    },
    prev () {
      this.currentIndex = this.currentIndex <= 0 ? this.games.length - 5 : this.currentIndex - 1
    },
    startAutoScroll () {
      this.intervalId = setInterval(() => {
        if (!this.hover) {
          if (this.scrollDirection === 'right') {
            this.next()
          } else {
            this.prev()
          }
        }
      }, 2000)
    },
    stopAutoScroll () {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  },
  mounted () {
    this.startAutoScroll()
  },
  beforeDestroy () {
    this.stopAutoScroll()
  }
}
</script>

<style scoped>
.carousel-container {
  width: 100vw;
  overflow: hidden;
  padding: 20px 0;
}
.title {
  padding-left: 36px;
  padding-bottom: 12px;
  text-align: left;
}
.suggestion-logo {
  height: 20vh;
}
.carousel-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}
.carousel-list {
  flex: 1;
  overflow: hidden;
}
.slider-content {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.slider-content li {
  list-style: none;
  flex: 0 0 auto;
  width: 220px;
  height: 280px;
  margin: 0 14px;
  overflow: hidden;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.3); /* optionnel : effet carte */
  transition: transform 0.3s ease;
}

.slider-content li:hover {
  transform: scale(1.03);
}

.slider-content img {
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  display: block;
  aspect-ratio: 220 / 280;
}

.arrow {
  width: 64px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.arrow-icon {
  width: 48px;
}
.arrow-icon.rotated {
  transform: rotate(180deg);
}
</style>
