<template>
  <div class="header">
    <div class="header_banner">
      <span class="shop_phone">
        <i class="fa fa-phone"></i>
        0123-456-789
      </span>
      <div class="user_info">
        <router-link v-if="!auth" :to="{name: 'signup'}" > Đăng ký |</router-link>
        <router-link v-if="!auth" :to="{name: 'login'}" > Đăng nhập |</router-link>
        <div v-if="auth">
          {{user ? user.fullName : ""}} &nbsp;&nbsp;
          <a @click="logoutAcc" > Đăng xuất</a>
        </div>
      </div>
    </div>
    <div class="header_main">
      <div id="header_logo">
        <router-link :to="{name: 'Dashboard'}">
          <img class="logo_img" src="/images/logo_2.png" />
        </router-link>
      </div>
      <div id="search_block">
        <form class="search_box">
          <input type="text" placeholder="Tìm kiếm">
          <button type="submit" class="btn btn-default button-search"><i class="fa fa-search"></i></button>
        </form>
      </div>
      <div id="shopping_cart">
        <div class="icon_shopping_cart">
          <router-link :to="{name: 'ShoppingCart'}">
            <img class="icon_cart" src="../../../public/images/shopping_cart_icon.png"/>
          </router-link>
          <b>({{ totalItemsInCart }})</b>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters('cart', {
      totalItemsInCart: 'totalItemsInCart'
    }),
    ...mapGetters('auth', {
      auth: 'isAuthenticated',
      user: 'user'
    }),
  },
  methods: {
    ...mapActions('auth', {
      logout: 'logout'
    }),
    logoutAcc(){
      this.logout()
      this.$store.commit('cart/emptyCart')
    }
  }
}
</script>

<style scoped>

.header_banner {
  width: 100%;
  height: 35%;
  text-align: center;
  font-size: 22px;
  padding-top: 17px;
  color: gray;
  background-image: url("../../../public/images/banner_header_3.png");
  /*background-repeat: no-repeat;*/
  /*background-size: cover;*/
}

.shop_phone {
  float: left;
  padding-left: 80px;
}

.user_info {
  float: right;
  margin-right: 20px;
}
.user_info a,
.user_info button
{
  cursor: pointer;
  color: gray;
}

.user_info a:hover,
.user_info button:hover{
  color: #aad299;
  text-decoration: none;
}

.header_main {
  height: 60%;
  margin-top: 5px;
}

#header_logo {
  width: 30%;
  height: 100%;
  float: left;
}

.logo_img {
  display: block;
  max-width: 100%;
  height: 100%;
  padding-left: 160px;
  width: 90%;
}

#search_block {
  width: 50%;
  height: 100%;
  float: left;

}
.search_box {
  padding-top: 15px;
}
input{
  width: 60%;
  height: 45px;
  padding: 6px;
  margin-top: 8px;
  font-size: 17px;
  border: none;
}
button {
  height: 45px;
  margin-left: -43px;
  background: #ddd;
  font-size: 17px;
  cursor: pointer;
}
#shopping_cart {
  width: 20%;
  height: 100%;
  float: right;

}

.icon_cart {
  width: 20%;
  height: 40%;
}
.icon_shopping_cart{
  padding-top: 20px;
}

</style>