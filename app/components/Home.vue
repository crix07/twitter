<template>
  <div>

    <div v-if="userStored" class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Bienvenido a TwitterApp {{userStored.nombre}}</h1>
      <div class="col-md-12 row" style="margin-top: 30px;">

          <div class="col-md-6">
            <h6>Usuarios conectados:</h6>
      </div>

    <div class="col-md-6">
        <form v-on:submit.prevent="publication">

          <div class="form-group">
            <textarea class="form-control" v-model="post.text" name="text" placeholder="Escribir publicacion" cols="20" rows="3"></textarea>
          </div>      
            <button type="submit" class="btn btn-success pointer">Publicar</button>
      
        </form> 
      </div>

    
</div>

      </div>
   
    </div><br />

     <div v-if="!userStored" class="row p-4">
      <div class="col-md-2">
        <router-link :to="{ name: 'Login' }" class="btn btn-primary float-right mt-2">
          Iniciar Sesion
        </router-link>
      </div>
         <router-link :to="{ name: 'Register' }" class="btn btn-primary float-right mt-2">
          Registro
        </router-link>
    </div><br />
  </div>
</template>

<script>
export default {
  data(){
    return{
      post: {},
      userStored: null
    }
  },

  created: function() {
    
    this.userStored = JSON.parse(localStorage.getItem('identity'))
    console.log(this.userStored.nombre);
    
  },

  methods: {
    publication() {
      let posts = {
        id: this.userStored.id,
        text: this.post.text
      }
      let uri = 'http://localhost:3000/api/create-post';
      this.$http.post(uri, posts)
     .then(res => {
       console.log(res);
      }, err => {
        console.log(err);
      });
    },
  }
}
</script>
