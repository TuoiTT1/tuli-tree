<template>
  <div class="product_card">
      <img :src="`/images/${product.image}`" :alt="product.name">
      <div class="card_text">
        <span>{{product.name}}</span><br>
        <span>{{formatPrice}}</span>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      require: true
    }
  },
  computed: {
    formatPrice() {
      return  this.product.price.toLocaleString('vi-VN', {style : 'currency', currency : 'VND'});
    }
  }
}
</script>

<style scoped>
.product_card {
  width: 250px;
  font-size: 20px;
  text-align: center;
  float: left;
  margin-right: 60px;
  margin-top: 15px;
  margin-left: 20px;
  border-radius: 4px;
  border: 1px solid darkgreen;
  overflow: hidden;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
  transition: 0.2s ease transform;
  position: relative;
}
.product_card:hover {
  transform: scale(1.05);
}
img {
  max-width: 250px;
  max-height: 150px;
  object-fit: cover;
  display: block;
  width: 100%;
  height: auto;
}
.card_text {
  /*background: rgb(92 147 42);*/
  color: black;
  display: block;
}
</style>