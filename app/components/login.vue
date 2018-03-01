<template>
  <div>

    <form v-on:submit.prevent="login">
        <router-link :to="{ name: 'Home' }" class="btn btn-primary float-right mt-2">
          Regresar a Inicio
        </router-link>
      <h1 class="d-inline">Iniciar Sesion</h1>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Correo Electronico:</label>
            <input type="email" class="form-control col-md-6" v-model="user.email" />
          </div>
        </div>
      </div>
       <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Contraseña:</label>
            <input type="password" class="form-control col-md-6" v-model="user.password" />
          </div>
        </div>
      </div>
      <br />
      <div class="form-group">
        <button type="submit" class="btn btn-primary">Iniciar Sesion</button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  data(){
    return{
      user: {}
    }
  },

  created: function() {
  },

  methods: {
    login() {
      let uri = 'http://localhost:3000/api/login';
      this.$http.post(uri, this.user)
     .then(res => {
       let usuario = JSON.stringify(res.body.user)
       localStorage.setItem('identity', usuario)
       this.$router.push({name: 'Home'})
      }, err => {
        console.log(err);
      });
    },
  }
}
</script>
