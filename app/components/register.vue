<template>
  <div>
   
    <form v-on:submit.prevent="register">
        <router-link :to="{ name: 'Home' }" class="btn btn-primary float-right mt-2">
          Regresar a Inicio
        </router-link>
      <h1 class="d-inline">Favor registrate</h1>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" class="form-control" v-model="user.name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Correo Electronico:</label>
            <input type="email" class="form-control col-md-6" v-model="user.email">
          </div>
        </div>
      </div>
       <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Contraseña:</label>
            <input type="password" class="form-control col-md-6" v-model="user.password">
          </div>
        </div>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary">Registro</button>
      </div>
    </form>

  </div>
</template>

<script>
  import toastr from 'toastr';

export default {
  data(){
    return{
      user: {}
    }
  },

  created: function() {
  },

  methods: {
    register() {
      let uri = 'http://localhost:3000/api/register';
      this.$http.post(uri, this.user)
        .then(res => {
       console.log(res.body);
      }, err => {
        console.log(err.body.message);
      });
    },
  }
}
</script>
