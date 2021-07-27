<template>
  <div class="mainContent">
    <h2>Đăng ký tài khoản</h2>
    <div v-if="msgError" class="alert alert-danger">
      <strong>{{ msgError }}</strong>
    </div>
    <div class="container">
      <form class="form-horizontal" @submit.prevent="signup">
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="name">Họ tên:</label>
            </div>
            <div class="col-sm-4">
              <input id="name" v-model="fullName" class="form-control" type="text"/>
            </div>
            <div v-if="fullNameValidity === 'invalid'"
                 class="col-sm-4 invalid-feedback">Không được bỏ trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="email">Email:</label>
            </div>
            <div class="col-sm-4">
              <input id="email" v-model="email" class="form-control" type="email"/>
            </div>
            <div v-if="emailValidity === 'invalid'"
                 class="col-sm-4 invalid-feedback">Không được để trống.
            </div>
            <div v-if="emailValidity === 'invalidEmail'"
                 class="col-sm-4 invalid-feedback">Email không hợp lệ.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="phone">Số điện thoại:</label>
            </div>
            <div class="col-sm-4">
              <input id="phone" v-model="phone" class="form-control" type="text"/>
            </div>
            <div v-if="phoneValidity === 'invalid'"
                 class="col-sm-4 invalid-feedback">Không được để trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="userName">Tên tài khoản:</label>
            </div>
            <div class="col-sm-4">
              <input id="userName" v-model="userName" class="form-control" type="text"/>
            </div>
            <div v-if="userNameValidity === 'invalid'"
                 class="col-sm-4 invalid-feedback">Không được để trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="password">Mật khẩu:</label>
            </div>
            <div class="col-sm-4">
              <input id="password" v-model="password" class="form-control" type="password"/>
            </div>
            <div v-if="passwordValidity === 'invalid'"
                 class="col-sm-4 invalid-feedback">Không được để trống.
            </div>
            <div v-else-if="passwordValidity === 'invalidLength'"
                 class="col-sm-4 invalid-feedback">Nhập password có tối thiểu 6 ký tự.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="confirm_password">Nhập lại mật khẩu:</label>
            </div>
            <div class="col-sm-4">
              <input id="confirm_password" v-model="confirmPassword" class="form-control" type="password"/>
            </div>
            <div v-if="confirmPasswordValidity === 'invalid'"
                 class="col-sm-4 invalid-feedback">Không được để trống.
            </div>
            <div v-else-if="confirmPasswordValidity === 'notMatch'"
                 class="col-sm-4 invalid-feedback">Mật khẩu không khớp.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-4">
              <button :disabled="!formValidity" class="btn btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      fullName: '',
      email: '',
      phone: '',
      userName: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    fullNameValidity() {
      return this.checkValidity(this.fullName);
    },
    emailValidity() {
      if (this.checkValidity(this.email) === 'invalid') {
        return 'invalid';
      }
      if (!this.validEmail(this.email)) {
        return 'invalidEmail';
      }
      return 'valid';
    },
    phoneValidity() {
      return this.checkValidity(this.phone);
    },
    userNameValidity() {
      return this.checkValidity(this.userName);
    },
    passwordValidity() {
      if (this.checkValidity(this.password) === 'invalid') {
        return 'invalid';
      }
      if (this.password.length < 6) {
        return 'invalidLength'
      }
      return 'valid'
    },
    confirmPasswordValidity() {
      if (this.checkValidity(this.confirmPassword) === 'invalid') {
        return 'invalid';
      }
      if (this.confirmPassword !== this.password) {
        return 'notMatch'
      }
      return 'valid'
    },
    formValidity() {
      return this.fullNameValidity === 'valid'
          && this.emailValidity === 'valid'
          && this.phoneValidity === 'valid'
          && this.userNameValidity === 'valid'
          && this.passwordValidity === 'valid'
          && this.confirmPasswordValidity === 'valid';
    },
    ...mapState('auth', {
      msgError: state => state.messageError
    })
  },
  methods: {
    checkValidity(inputName) {
      if (inputName.trim() === '') {
        return 'invalid';
      }
      return 'valid'
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    signup() {
      const formData = {
        fullName: this.fullName,
        email: this.email,
        phone: this.phone,
        userName: this.userName,
        password: this.password
      }
      this.$store.dispatch('auth/signup', formData)
    }
  }
}
</script>

<style scoped>
form {
  padding-left: 30px;
  /*padding-top: 30px;*/
}

.form-group.required,
.control-label:after {
  content: "*";
  color: red;
}

.invalid-feedback {
  display: inline-block;
}
</style>