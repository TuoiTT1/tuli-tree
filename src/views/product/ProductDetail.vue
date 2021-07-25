<template>
  <base-dialog v-if="isOpenNotify" title="Thông báo">
    <template #default>
      <h4>Bạn phải <router-link :to="{name: 'login'}">Đăng nhập</router-link> trước.</h4>
      <h4>Hoặc <router-link :to="{name: 'signup'}">Đăng ký</router-link> tài khoản mới.</h4>
    </template>
    <template #actions>
      <button type="button" class="btn btn-primary" @click="closeNotify">OK</button>
    </template>
  </base-dialog>

  <div class="mainContent">
    <h1><i class="fa fa-arrow-left" @click="$router.back()"></i></h1>
    <div class="container">
      <div class="row">
        <div class="pb-left-column col-xs-12 col-sm-4 col-md-5">
          <div class="image-block">
            <img
                :src="imgUrl">
          </div>
        </div>
        <div class="pb-center-column col-xs-12 col-sm-4">
          <h1>{{ product.name }}</h1>
          <p>{{ product.description }}</p>
        </div>
        <div class="pb-right-column col-xs-12 col-sm-4 col-md-3">
          <div class="box-info-product">
            <div class="content_prices clearfix">
              <h4>{{ productInStock(product) ? "Còn hàng" : "Hết hàng" }} ({{ product.inventory }})</h4>
              <div class="price">
                <h2>{{ formatPrice }}</h2>
              </div>
            </div>
            <div class="product_attributes clearfix">
              <div class="box-cart-bottom">
                <div class="buttons_bottom_block">
                  <button :disabled="!productInStock(product)"
                          class="exclusive"
                          @click="addToCart(product)"
                  >
                    <span>Thêm vào giỏ <span><i class="fa fa-shopping-cart"></i></span></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import BaseDialog from '@/components/UI/BaseDialog';
export default {
  components: {
    BaseDialog
  },
  props: {
    productSlug: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isOpenNotify: false
    }
  },
  computed: {
    product() {
      return this.$store.getters['product/getProductBySlug'](this.productSlug)
    },
    imgUrl() {
      return '/images/' + this.product.image
    },
    formatPrice() {
      return this.product.price ?
          this.product.price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'})
          : "";
    },
    ...mapGetters('product', {
      productInStock: 'productInStock'
    }),
    ...mapGetters('auth', {
      auth: 'isAuthenticated'
    }),
  },
  methods: {
    ...mapActions('cart', {
      addProductToCart: 'addProductToCart'
    }),
    addToCart(product) {
      if(!this.auth){
        this.isOpenNotify = true
      }
      else{
        this.addProductToCart(product)
      }
    },
    closeNotify() {
      this.isOpenNotify = false
    }
  }
}
</script>

<style scoped>
a [class^="icon-"], a [class*=" icon-"] {
  display: inline;
}

p {
  text-align: justify;
}

h1 {
  text-align: left;
  color: #28a745;
}

.image-block {
  position: relative;
  display: block;
  cursor: pointer;
  padding: 5px;
  border: 1px solid #dbdbdb;
  background: white;
}

.image-block img {
  max-width: 100%;
  max-height: 600px;
  width: 100%;
  height: 100%;
}

.box-info-product {
  background: #f6f6f6;
  border: 1px solid #d2d0d0;
  border-top: 1px solid #b0afaf;
  border-bottom: 1px solid #b0afaf;
}

.content_prices {
  padding: 13px 19px;
}

.price {
  font-size: 13px;
  color: #777777;
  white-space: nowrap;
  margin-top: 20px;
}

.product_attributes {
  padding: 19px 19px 17px;
}

.box-cart-bottom {
  padding: 0;
}

.buttons_bottom_block {
  clear: both;
  padding: 19px 0 19px 0;
}

.box-info-product .exclusive {
  font-size: 23px;
  color: white;
  border-top: 1px solid #0079b6;
  border-right: 1px solid #006fa8;
  border-left: 1px solid #006fa8;
  border-bottom: 1px solid #012740;
  border-radius: 5px;
  position: relative;
  background-image: linear-gradient(#009ad0, #73c786);
}
</style>