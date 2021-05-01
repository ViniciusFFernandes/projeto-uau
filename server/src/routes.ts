import { Router, Request, Response } from "express"
import { PessoasController } from "./controllers/pessoasController"
import { ProdutosController } from "./controllers/produtosController"
import { multerConfig } from './config/multer'
import multer from "multer";

const routes = Router();

const pessoasController = new PessoasController();
const produtosController = new ProdutosController();

routes.post("/pessoas", pessoasController.create)
routes.get("/pessoas", pessoasController.retornaPessoa)
routes.get("/pessoas/:idpessoas/produtos/", produtosController.showByPessoas)

routes.post("/produtos", produtosController.create)
routes.delete("/produtos/:idprodutos", produtosController.delete)
routes.put("/produtos/:idprodutos", produtosController.att)
routes.get("/produtos", produtosController.showProdutos)
routes.get("/produtos/:idprodutos", produtosController.showProduto)


routes.post("/upload", multer(multerConfig).single('file'), (request: Request, response: Response) => {
    return response.json({newName: request.file.filename})
})


export {routes};
