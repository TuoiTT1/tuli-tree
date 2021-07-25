<template>
  <div class="mainContent">
    <h2>Đăng nhập</h2>
    <div v-if="msgError" class="alert alert-danger">
      <strong>{{msgError}}</strong>
    </div>
    <div class="container">
      <form class="form-horizontal" @submit.prevent="login">
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
              <label class="control-label" for="password">Mật khẩu:</label>
            </div>
            <div class="col-sm-4">
              <input class="form-control" id="password" type="password" v-model="password"/>
            </div>
            <div class="col-sm-4 invalid-feedback"
                 v-if="passwordValidity === 'invalid'">Không được để trống.
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="row">
            <div class="col-sm-3">
            </div>
            <div class="col-sm-4">
              <button class="btn btn-primary" :disabled="!formValidity">Đăng nhập</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    emailValidity() {
      if (this.checkValidity(this.email) === 'invalid') {
        return 'invalid';
      }
      if (!this.validEmail(this.email)) {
        return 'invalidEmail';
      }
      return 'valid';
    },
    passwordValidity() {
      return this.checkValidity(this.password);
    },
    formValidity() {
      return this.emailValidity === 'valid'
          && this.passwordValidity === 'valid';
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
    login() {
      const formData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('auth/login', formData)
    }
  }
}
</script>

<style scoped>
form {
  padding-left: 100px;
  padding-top: 80px;
}
h2 {

  padding-top: 30px;
  text-align: center;
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