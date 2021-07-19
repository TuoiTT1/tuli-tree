<template>
  <div class="nav">
    <span><b>Danh mục sản phẩm</b></span>
    <ul>
      <li>
        <router-link :to="{name: 'product_show_all'}">
          <i class="fa fa-leaf"></i> Các loại cây
        </router-link>
      </li>
      <li
          v-for="category in categories"
          :key="category.id"
      >
        <router-link
            :to="{name: 'product_show', params: {id: category.id, slug: category.slug}}"
        >
          <i class="fa fa-leaf"></i> {{ category.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  computed: {
    ...mapState('product', {
      categories: state => state.categories
    })
  },
  methods: {
    ...mapActions({
      fetchData: 'product/fetchCategories'
    })
  },
  created() {
    this.fetchData()
  }
}
</script>

<style scoped>
ul {
  list-style-type: none;
  text-align: left;
  border: 2px solid #dddddd;
}

ul li {
  padding-top: 20px;
  padding-right: 10px;
  border-top: 1px solid #dddddd;
}

a {
  color: gray;
}

a:hover,
a.router-link-active {
  color: green;
  cursor: pointer;
  text-decoration: none;
}

</style>