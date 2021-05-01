<template>
  <div class="container" id="telaCadPess">
    <div class="row">
      <div class="col-lg-12 col-sm-12 col-xs-12">
        <div class="card">
          <div class="card-header">
            <b>Lista de Produtos</b>
          </div>
          <div class="card-body">
            <div class="row" v-for="produto in produtos" :key="produto.idprodutos" style="margin-top: 10px; border-bottom: 1px solid #484848;">
                <div class="col-sm-2 col-xs-6">
                  <img class="img-thumbnail" v-if="produto.prod_foto" v-bind:src="'http://localhost:3333/files/' + produto.prod_foto" alt="" width="150px">
                </div>
                <div class="col-sm-3 col-xs-6">
                  Nome: {{produto.prod_nome}}
                </div>
                <div class="col-sm-2 col-xs-6">
                  Preço: {{produto.prod_preco}}
                </div>
                <div class="col-sm-4 col-xs-6">
                  Criado por: {{produto.pess_nome}}
                </div>
                <div class="col-sm-1 col-xs-12">
                   <router-link :to="'/produtos/' + produto.idprodutos">
                   Editar
                   </router-link>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'AppCadastroProdutos',
   data() {
    return {
      produtos: []
    }

  },
  beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
    }
  },
  mounted: function(){
    this.buscaProdutos()
  },
  methods: {
    buscaProdutos(){
      var self = this;

      const axios = require('axios');
      axios.get('http://localhost:3333/produtos')
      .then(function (response) {
        // console.log(response.data)   
        
        for (let e = 0; e < response.data.length; e++) {
          self.produtos.push({
            idprodutos: response.data[e].idprodutos,
            prod_nome: response.data[e].prod_nome,
            prod_preco: response.data[e].prod_preco,
            prod_foto: response.data[e].prod_foto,
            pess_nome: response.data[e].pessoas.pess_nome
          });
        }
        // console.log(self.produtos)
        //
      }).catch(function (error) {
        self.$swal(error.response.data.msg);
      })
      .then(function () {
        // always executed
      });
    }
  }
}
</script>

<style scoped>
  #telaCadPess{
    padding-top: 10px;
  }
  input[type=number]::-webkit-inner-spin-button {      
    -webkit-appearance: none;      
  } 
  input[type=number] {     
    -moz-appearance: textfield;    
    appearance: textfield;  
  }
</style>
