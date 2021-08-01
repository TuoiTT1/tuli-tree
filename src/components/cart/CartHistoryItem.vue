<template>
  <td>{{ order.cartId }}</td>
  <td>{{ order.userId }}</td>
  <td>
    <button class="btn btn-primary" @click="downloadCSV">Lịch sử mua hàng</button>
  </td>
</template>
<script>

export default {
  props: [
    'order'
  ],
  methods: {
    async downloadCSV() {
      let csv = 'Cart ID,' + this.order.cartId + '\r\n';
      csv = csv + 'UserID,' + this.order.userId + '\r\n'
      csv = csv + 'ProductID, Action, Quantity\r\n'
      //merge the data with CSV
      csv = csv + this.convertJon2Csv(this.order.cartHistory)
      let csvFile = new Blob([csv], {type: 'text/csv'});
      let downloadLink = document.createElement("a");
      downloadLink.download = this.order.cartId + ".csv";
      downloadLink.href = window.URL.createObjectURL(csvFile);
      downloadLink.style.display = "none";

      document.body.appendChild(downloadLink);
      downloadLink.click();
    },
    convertJon2Csv() {
      let str = ""
      for (let i = 0; i < this.order.cartHistory.length; i++) {
        str = str + this.order.cartHistory[i].productId + "," + this.order.cartHistory[i].action + "," + this.order.cartHistory[i].quantity + "\r\n"
      }
      return str
    },
  }
}
</script>