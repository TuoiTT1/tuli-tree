<template>
  <transition-group v-if="image" name="fade" mode="out-in" tag="div" class="slider">
    <div class="img-slider" :key="image.id" :style="setBackGroundImg">

    </div>
  </transition-group>
</template>

<script>
export default {
  props: ['image'],
  computed: {
    setBackGroundImg() {
      return {
        backgroundImage: "url( " + this.image.url + ")"
      }
    }
  },
}
</script>

<style scoped>
.slider {
  width: 100%;
  height: 100%;
  margin: 15px;
  position: relative;
}

.img-slider{
  overflow: hidden;
  position: relative;
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  /*position: relative;*/
}

.fade-move {
  transition: all 1s;
}
.fade-enter-active{
  animation-name:fadeEnter;
  animation-duration: 1s;
  animation-iteration-count: 1;
}
.fade-move{
  transition: all 1s;
}
.fade-leave-active{
  animation-name:fadeLeave;
  animation-duration: 1s;
  animation-iteration-count: 1;
  position:absolute;
}
@keyframes fadeEnter{
  from{
    opacity:0;
  }
  to{
    opacity:1;
  }
}
@keyframes fadeLeave{
  from{
    opacity:1;
  }
  to{
    opacity:0;
  }
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>