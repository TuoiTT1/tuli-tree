<template>
  <div class="mainContent">
    <div v-if="imgList" class="banner">
      <Slide :image="imgList[currentImg]"/>
      <div class="arrow_lef" @click="arrowLeft"></div>
      <div class="arrow_right" @click="arrowRight"></div>
      <div class="circles">
        <div v-for="img in imgList" :key="img.id" @click="circles(img.id)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Slide from '@/components/dashboard/Slide.vue';

export default {
  components: {
    Slide
  },
  data() {
    return {
      currentImg: 0,
      imgList: [
        {
          id: 0,
          url: '/images/banner_xuongrong.jpg'
        },
        {
          id: 1,
          url: '/images/banner_senda.jpg'
        },
        {
          id: 2,
          url: '/images/banner_cay_phong_thuy.jpg'
        }
      ],
      intervalObject: null
    }
  },
  methods: {
    circles(number) {
      this.currentImg = number
      clearInterval(this.intervalObject)
      this.intervalObject = setInterval(() => {
        this.moveRight();
      }, 3000)
    },
    arrowLeft() {
      clearInterval(this.intervalObject)
      this.moveLeft()
      this.intervalObject = setInterval(() => {
        this.moveLeft();
      }, 3000)
    },
    arrowRight() {
      clearInterval(this.intervalObject)
      this.moveRight()
      this.intervalObject = setInterval(() => {
        this.moveRight();
      }, 3000)
    },
    moveRight() {
      let index = this.currentImg = this.currentImg + 1;
      if (index >= this.imgList.length) {
        index = 0
      }
      this.currentImg = index
    },
    moveLeft() {
      let index = this.currentImg = this.currentImg - 1;
      if (index < 0) {
        index = this.imgList.length - 1
      }
      this.currentImg = index
    }
  },
  created() {
    this.intervalObject = setInterval(() => {
      this.moveLeft();
    }, 3000)
  }
}
</script>

<style>
.banner {
  width: 90%;
  height: 400px;
}

.arrow_lef, .arrow_right {
  border: 20px solid transparent;
  top: 40%;
  position: absolute;
}

.arrow_lef {
  left: 0%;
  border-right-color: green;
}

.arrow_right {
  right: 7%;
  border-left-color: green;
}

.circles {
  position: absolute;
  bottom: 20px;
  left: calc(50% - 70px);
}

.circles div {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  background-color: green;
}

.circles div:active,
.circles div:hover {
  background-color: greenyellow;
}
</style>
