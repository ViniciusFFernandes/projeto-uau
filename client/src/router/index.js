import Vue from "vue"
import Router from "vue-router"

import CadastroProdutos from "@/views/CadastroProdutos"
import Login from "@/views/Login";
import Inicio from "@/views/Inicio";
import CadastroPessoas from "@/views/CadastroPessoas";
import ListaProdutos from "@/views/ListaProdutos";

Vue.use(Router)

const routes = [    
    {
        name: 'login',
        path: "/",
        component: Login
    },
    {
        name: 'inicio',
        path: "/inicio",
        component: Inicio
    },
    {
        name: 'cadPess',
        path: '/pessoas',
        component: CadastroPessoas
    },
    {
        name: 'cadProd',
        path: '/produtos',
        component: CadastroProdutos
    },
    {
        name: 'buscaProd',
        path: '/produtos/:idprodutos',
        component: CadastroProdutos
    },
    {
        name: 'listaProd',
        path: '/produtosLista',
        component: ListaProdutos
    }
    
]

const router = new Router({ 
    mode: "history",
    routes 
})

export default router