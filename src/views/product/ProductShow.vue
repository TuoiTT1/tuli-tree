<template>
  <div class="mainContent">
    <div class="product_list">
      <product-card
          v-for="product in products"
          :key="product.slug"
          :product="product"
      ></product-card>
    </div>
    <div class="product_paging">
      <button class="paging_pre" :disabled="!enablePrePage" @click="prePage"><i class="fa fa-angle-double-left"></i>
      </button>
      <button class="paging_next" :disabled="!enableNextPage" @click="nextPage"><i class="fa fa-angle-double-right"></i>
      </button>
      <span>Page {{ currentPage }} / {{ productList.length / pageSize }}</span>
    </div>
  </div>
</template>

<script>
import sourceData from "@/data.json"
import ProductCard from '@/components/product/ProductCard.vue';

export default {
  components: {
    ProductCard
  },
  props: {
    id: {
      type: Number,
      require: false
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 4,
    }
  },
  computed: {
    products() {
      return this.productList.filter((row, index) => {
        const start = (this.currentPage - 1) * this.pageSize
        const end = this.currentPage * this.pageSize
        return index >= start && index < end
      })
    },
    productList() {
      if (this.id) {
        return sourceData.categories.find(
            (category) => category.id === this.id
        ).products
      } else {
        const categories = sourceData.categories
        const productsList = []
        for (let i = 0; i < categories.length; i++) {
          const pros = categories[i].products
          for (let j = 0; j < pros.length; j++)
            productsList.push(pros[j])
        }
        return productsList
      }
    },
    enablePrePage() {
      return this.currentPage > 1
    },
    enableNextPage() {
      return this.currentPage * this.pageSize < this.productList.length
    }
  },
  methods: {
    prePage() {
      this.currentPage--
    },
    nextPage() {
      this.currentPage++
    }
  }
}
</script>

<style scoped>
.product_list {
  width: 100%;
  height: 95%;
}

.product_paging {

}

.paging_pre {
  font-size: 15px;
  margin-left: 31%;
  margin-right: 10px;
  float: left;
}

.product_paging {
  font-size: 15px;
}

.paging_next,
.paging_pre,
span {
  float: left;
  margin-right: 10px;
}

</style>