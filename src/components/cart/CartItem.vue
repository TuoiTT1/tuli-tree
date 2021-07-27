<template>
  <base-dialog v-if="isOpenConfirmDelete" title="Xác nhận xóa">
    <template #default>
      <h4>Bạn có chắc chắn muốn loại bỏ sản phẩm "<b>{{ cartItem.title }}"</b> trong giỏ hàng không?</h4>
    </template>
    <template #actions>
      <button class="btn btn-primary" type="button" @click="deleteItem(cartItem)">Có</button>
      &nbsp; &nbsp;
      <button class="btn btn-warning" type="button" @click="notDelete">Không</button>
    </template>
  </base-dialog>

  <td class="cart_item_img">
    <router-link
        :to="{name: 'ProductDetail', params: {productSlug: cartItem.slug}}"
    >
      <img :alt="cartItem.title" :src="imgUrl(cartItem.image)">
    </router-link>
  </td>
  <td class="cart_item_title">{{ cartItem.title }}</td>
  <td class="cart_item_price">{{ formatPrice(cartItem.price) }}</td>
  <td class="cart_item_qty">
    <div class="input-group">
        <span class="input-group-btn">
            <button :disabled="cartItem.quantity === 1" class="btn btn-danger btn-number" data-type="minus"
                    type="button"
                    @click="decrementQty(cartItem)"
            >
              <span><i class="fa fa-minus"></i></span>
            </button>
        </span>
      <input :value="cartItem.quantity" class="text" disabled="true" name="qty" type="text">
      <span class="input-group-btn">
            <button :disabled="!productInStock" class="btn btn-success btn-number" data-type="plus"
                    type="button"
                    @click="incrementQty(cartItem)"
            >
                <span><i class="fa fa-plus"></i></span>
            </button>
        </span>
    </div>
  </td>
  <td class="cart_item_price">{{ formatPrice(cartItem.price * cartItem.quantity) }}</td>
  <td class="cart_item_delete">
    <span @click="openConfirmDelete"><i class="fa fa-trash-o"></i></span>
  </td>
</template>
<script>
import BaseDialog from '@/components/UI/BaseDialog.vue';

export default {
  components: {
    BaseDialog
  },
  props: [
    'cartItem'
  ],
  data() {
    return {
      isOpenConfirmDelete: false
    }
  },
  computed: {
    product() {
      return this.$store.getters['product/getProductBySlug'](this.cartItem.slug)
    },
    productInStock() {
      return this.$store.getters['product/productInStock'](this.product)
    }
  },
  methods: {
    imgUrl(img) {
      return '/images/' + img
    },
    formatPrice(price) {
      return price ? price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) : "";
    },
    incrementQty(item) {
      this.$store.dispatch('cart/incrementQty', item)
    },
    decrementQty(item) {
      this.$store.dispatch('cart/decrementQty', item)
    },
    openConfirmDelete() {
      this.isOpenConfirmDelete = true
    },
    notDelete() {
      this.isOpenConfirmDelete = false
    },
    deleteItem(item) {
      this.$store.dispatch('cart/deleteItemFromCart', item)
      this.isOpenConfirmDelete = false
    }
  }
}
</script>

<style scoped>
input {
  width: 40px;
  padding: 0 6px;
  float: left;
  border: 1px solid #d6d4d4;
  line-height: 27px;
  margin-left: 3px;
  margin-right: 3px;
}

.cart_item_img {
  width: 150px;
}

.cart_item_img img {
  max-width: 100px;
  max-height: 100px;
  width: 100%;
  height: 100%;
}

.cart_item_title {
  text-align: left;
  width: 220px;
  vertical-align: middle;
}

.cart_item_price {
  text-align: right;
  width: 110px;
  vertical-align: middle;

}

.cart_item_qty {
  width: 150px;
  vertical-align: middle;
}

.cart_item_delete {
  vertical-align: middle;
  font-size: 23px;
}
</style>