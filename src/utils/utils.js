const utils = {
    formatDate(date) {
        return "" + date.getFullYear() + "" + ('0' + (date.getMonth() + 1)).slice(-2) + ""
            + ('0' + date.getDate()).slice(-2) + "" + ('0' + date.getHours()).slice(-2) + "" +
            ('0' + date.getMinutes()).slice(-2) + "" + ('0' + date.getSeconds()).slice(-2) + ""
    },
    formatPrice(price) {
        return price ? price.toLocaleString('vi-VN', {style: 'currency', currency: 'VND'}) : "";
    },
}

export default utils