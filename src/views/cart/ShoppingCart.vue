<template>
  <div class="mainContent">
    <div class="center_column col-xs-12 col-sm-12">
      <h1 v-if="totalItemsInCart > 0">Thông tin giỏ hàng</h1>
      <h1 v-else>Giỏ hàng trống</h1>
      <hr>
      <router-link v-if="totalItemsInCart === 0" to="/products"><h4>Chọn cây yêu thích ngay!</h4></router-link>
      <table v-else class="table table-bordered">
        <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Mô tả</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in cartProducts"
            :key="item.id"
        >
          <cart-item
              :cartItem="item"
          ></cart-item>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td colspan="2"></td>
          <td colspan="3"><b>TOTAL</b></td>
          <td><b>{{ formatPrice(cartTotal) }}</b></td>
        </tr>
        </tfoot>
      </table>
      <div v-if="totalItemsInCart > 0" class="cart_navigation clearfix">
        <router-link :to="{name: 'product_show_all'}" class="continue_shopping">
          <span><i class='fa fa-angle-left'></i> Tiếp tục chọn cây</span>
        </router-link>
        <a href="#" @click="checkout">
          <div class="checkout">
            <span>Mua hàng <i class='fa fa-angle-right'></i></span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CartItem from '@/components/cart/CartItem.vue';

export default {
  components: {
    CartItem
  },
  computed: {
    ...mapGetters('cart', {
      cartProducts: 'cartProducts',
      cartTotal: 'cartTotal',
      totalItemsInCart: 'totalItemsInCart',
    }),
  },
  methods: {
    formatPrice(price) {
      return price ? price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) : "";
    },
    decrementQty(cartItem) {
      this.$store.dispatch('cart/decrementItemQuantity', cartItem)
    },
    checkout() {
      this.$store.dispatch('cart/checkout')
    }
  }
}
</script>
<style scoped>
.cart_navigation {
  text-align: left;
  font-size: 25px;
}

.checkout {
  float: right;
}

</style>