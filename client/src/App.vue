<template>
  <div>
    <nav id="menu" class="navbar navbar-light bg-light" v-if="this.$session.exists()">
        <ul class="nav">
          <li class="nav-item">
            <img class="img-fluid img-logo" src="@/assets/min-logo.png" alt="Logomarca" width="30px">
          </li>
          <li class="nav-item">
            <router-link to="/inicio" class="nav-link">Inicio</router-link>
          </li>
          <li class="nav-item">
           <router-link to="/produtos" class="nav-link">Produtos</router-link>
          </li>
        </ul>
        
      <button class="btn btn-outline-danger my-2 my-sm-0" type="button" v-on:click="logout()">Sair</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>


export default {
  name: 'App',
  data(){
     return { menu:{} };
  },
  methods: {
    logout: function () {
      this.$session.destroy()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  .nav-link{
    color:rgb(46, 46, 46)
  }
</style>
