<template>
  <div class="carousel-container" @mouseenter="hover = true" @mouseleave="hover = false">
    <!-- Title / Logo -->
    <div class="title">
      <img :src="logo" alt="Suggestions" class="suggestion-logo" />
    </div>

    <!-- Carousel -->
    <div class="carousel-wrapper">
      <!-- Left Arrow -->
      <button
        class="arrow prev"
        @click="prev"
        aria-label="Previous games"
      >
        <img :src="arrowImage" class="arrow-icon rotated" />
      </button>

      <!-- Sliding Track -->
      <div class="carousel-list" ref="carousel">
        <ul class="slider-content" :style="{ transform: slideTransform }">
          <li v-for="(game, index) in games" :key="index" class="poster">
            <router-link :to="`/game/${game.title}`" tabindex="-1">
              <img :src="game.image" :alt="game.title" draggable="false" />
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Right Arrow -->
      <button
        class="arrow next"
        @click="next"
        aria-label="Next games"
      >
        <img :src="arrowImage" class="arrow-icon" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    games: {
      type: Array,
      required: true
    },
    logo: {
      type: String,
      required: true
    },
    arrowImage: {
      type: String,
      required: true
    },
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
      /**
       * Poster width + horizontal gap ( 100px + 16px = 116px )
       */
      slideWidth: 116,
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
    visibleCount () {
      const container = this.$refs.carousel?.clientWidth || 840
      return Math.floor(container / this.slideWidth)
    },
    next () {
      const maxIndex = this.games.length - this.visibleCount()
      this.currentIndex = this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1
    },
    prev () {
      const maxIndex = this.games.length - this.visibleCount()
      this.currentIndex = this.currentIndex <= 0 ? maxIndex : this.currentIndex - 1
    },
    startAutoScroll () {
      this.intervalId = setInterval(() => {
        if (!this.hover) {
          this.scrollDirection === 'right' ? this.next() : this.prev()
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
/* ===== Layout ===== */
.carousel-container {
  width: 100vw;
  overflow: hidden;
  padding: 24px 0;
}

.title {
  padding-left: 48px;
  margin-bottom: 6px;
}

.suggestion-logo {
  height: clamp(80px, 12vw, 160px);
}

.carousel-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.carousel-list {
  position: relative;
  flex: 1;
  overflow: hidden;
}

/* Gradient fade at edges */
.carousel-list::before,
.carousel-list::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 64px;
  pointer-events: none;
  z-index: 2;
}

.carousel-list::before {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.4), transparent);
}

.carousel-list::after {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.4), transparent);
}

/* ===== Track & Poster ===== */
.slider-content {
  display: flex;
  gap: 16px;
  transition: transform 0.5s ease-in-out;
  padding: 0 48px;
}

.poster {
  flex: 0 0 auto;
  width: 100px;
  height: 150px;
  border-radius: 8px;
  overflow: hidden;
  background: transparent;
  position: relative;
  transition: transform 0.25s ease, z-index 0.25s ease;
}

.poster:hover {
  transform: scale(1.1) translateY(-4px);
  z-index: 3;
}

.poster img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: inherit;
}

/* ===== Arrows ===== */
.arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 64px; /* bigger click area */
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  opacity: 0;
  transition: opacity 0.25s ease;
  z-index: 3;
}

.carousel-container:hover .arrow {
  opacity: 1;
}

.arrow.prev {
  left: 0;
}

.arrow.next {
  right: 0;
}

.arrow-icon {
  width: 30px; /* bigger icon */
}

.arrow-icon.rotated {
  transform: rotate(180deg);
}

/* ===== Accessibility ===== */
.arrow:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}
</style>
