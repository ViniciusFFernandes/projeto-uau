<template>
  <div >
    <div class="container">
      <p class="text-center">
        <span class="font-weight-bold">Seja bem vinda ao sistema de cadastro de produtos!</span><br>
        Aqui você poderá cadastrar e excluir produtos e visualizar produtos cadastrasdos por outros usuarios.<br>
        Espero que você tenha uma bao experiência
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Inicio',
  data() {
    return{}
  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  methods: {
   
  }
}
</script>

<style scoped>

</style>
