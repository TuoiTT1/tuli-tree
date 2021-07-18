<template>
  <div class="mainContent">
    <h2>Đăng ký tài khoản</h2>
    <div v-if="msgError" class="alert alert-danger">
      <strong>{{msgError}}</strong>
    </div>
    <div class="container">
      <form class="form-horizontal" @submit.prevent="signup">
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="name">Họ tên:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="name" type="text" v-model="fullName"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="fullNameValidity === 'invalid'">Không được bỏ trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="email">Email:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="email" type="email" v-model="email"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="emailValidity === 'invalid'">Không được để trống.
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="emailValidity === 'invalidEmail'">Email không hợp lệ.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="phone">Số điện thoại:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="phone" type="text" v-model="phone"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="phoneValidity === 'invalid'">Không được để trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="userName">Tên tài khoản:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="userName" type="text" v-model="userName"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="userNameValidity === 'invalid'">Không được để trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="password">Mật khẩu:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="password" type="password" v-model="password"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="passwordValidity === 'invalid'">Không được để trống.
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-else-if="passwordValidity === 'invalidLength'">Nhập password có tối thiểu 6 ký tự.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
              <label class="control-label" for="confirm_password">Nhập lại mật khẩu:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="confirm_password" type="password" v-model="confirmPassword"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="confirmPasswordValidity === 'invalid'">Không được để trống.
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-else-if="confirmPasswordValidity === 'notMatch'">Mật khẩu không khớp.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-4">
              <button class="btn btn-primary" :disabled="!formValidity">Đăng ký</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from  'vuex'
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
      if (this.password.length < 6 ) {
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
    signup(){
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