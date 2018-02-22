<template>
  <div>

    <div class="row p-4">
      <div class="col-md-12">
        <h1 class="d-inline">Bienvenido a TwitterApp</h1>
        <router-link :to="{ name: 'Create' }" class="btn btn-primary float-right mt-2">
          Crear Publicacion
        </router-link>
      </div>
    </div><br />

    <form v-on:submit.prevent="login">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" class="form-control" v-model="item.name">
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Correo Electronico:</label>
            <input type="email" class="form-control col-md-6" v-model="item.email">
          </div>
        </div>
      </div>
       <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Contraseña:</label>
            <input type="password" class="form-control col-md-6" v-model="item.password">
          </div>
        </div>
      </div>
      <br />
      <div class="form-group">
        <button class="btn btn-primary">Login</button>
      </div>
    </form>

  </div>
</template>

<script>
export default {
  data(){
    return{
      item: {}
    }
  },

  created: function() {
    // this.fetchItems();
  },

  methods: {
    fetchItems() {
      let uri = 'http://localhost:4000/items';
      this.axios.get(uri).then((response) => {
        this.items = response.data;
      })
    },
    login() {
        let uri = 'http://localhost:3000/api/register';
        this.axios.post(uri, this.item).then((res) => {
          console.log(res);
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteItem(id) {
      const response = confirm('are you sure you want to delete?');
      if (response) {
        let uri = 'http://localhost:3000/items/delete/'+id;
        this.items.splice(id, 1);
        this.axios.get(uri);
      }
    }
  }
}
</script>
