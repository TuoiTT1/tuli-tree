<template>
  <div class="mainContent">
    <h1>Danh sách order</h1>
    <hr>
    <table class="table table-bordered">
      <thead>
      <tr>
        <th>Mã order</th>
        <th>UserID</th>
        <th>History</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="order in orders"
          :key="order.id"
      >
        <cart-history-item
            :order="order"
        ></cart-history-item>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
import CartHistoryItem from '@/components/cart/CartHistoryItem.vue';

export default {
  components: {
    CartHistoryItem
  },
  data() {
    return {
      orders: []
    }
  },
  async created() {
    this.orders = await this.fetchOrders()
  },
  methods: {
    async fetchOrders() {
      try {
        const res = await axios.get('https://tuli-trees-store-default-rtdb.firebaseio.com/cart.json?auth=' + this.$store.state.auth.idToken)
        const data = res.data
        const orders = []
        for (let key in data) {
          orders.push(data[key])
        }
        return orders
      } catch (err) {
        console.log(err)
        return []
      }
    }
  }
}
</script>
