import { randomBytes } from "crypto"
import { Options, diskStorage } from "multer"
import { resolve } from "path"

export const multerConfig = {
    dest: resolve(__dirname, '..', 'uploads'),
    storage: diskStorage({
        destination: (resquest, file, callback) =>{
            callback(null, resolve(__dirname, '..', 'uploads'))
        },
        filename: (resquest, file, callback) =>{
            randomBytes(16, (error, hash) => {
                if(error){
                    callback(error, file.filename)
                }
                const filename = hash.toString('hex') + ".png"
                callback(null, filename)
            })
        }
    }),
    limits:{
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (resquest, file, callback) => {
        const formats = [
            'image/jpeg',
            'image/jpg',
            'image/png'
        ];

        if(formats.includes(file.mimetype)){
            callback(null, true)
        }else{
            callback(new Error('Formato de imagem incorreto'))
        }
    }
} as Options