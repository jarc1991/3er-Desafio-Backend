const fs = require('fs')

class Contenedor {

    constructor(file){

        this.file = file

    }

    // Métodos a realizar:

    //1er método SAVE:

    async save(obj){

        try{

            const objects = await this.getAllObjects() //este método se desarrolla más adelante.

            let lastId; /* TAMBIEN SE PODRÍA HACER CON OPERADOR TERNARIO const lastId = objects.length > 0 ? objects[objects.length - 1].id : 0*/
            
            if(objects.length > 0) {

                lastId = objects[objects.length - 1].id

            }else {

                lastId = 0
            }
            
            

            const newId = lastId + 1

            const newObj = {id: newId, ...obj}

            objects.push(newObj)

            await this.saveObjects(objects) //este método se desarrolla más adelante.

            return newId 

        }catch{

            console.error ('No se pudo guardar el objeto')

        }

    }

        //Método Obtener por ID:
    async getById(id) {

        try {

            const objects = await this.getAllObjects()

            const obj = objects.find ((e) => e.id === id)

            return obj || 'NO SE ENCONTRÓ NADA'
            
        } catch {

            console.error ('Error al obtener ID')
            
        }

    }

        //Método obtener todo:
    async getAll() {

        try {

            const objects = await this.getAllObjects()

            return objects
            
        } catch {

            console.error ('No es posible obtener los objetos')
            
        }
    }

        //Método eliminar por ID:
    async deleteById(id) {

        try {

            let objects = await this.getAllObjects()

            objects = objects.filter((e) => e.id !== id)

            await this.saveObjects(objects)
            
        } catch {

            console.error ('Error al eliminar')
            
        }

    }

        //Método eliminar todo:

    async deleteAll() {

        try {
            
            await this.saveObjects([])


        } catch {

            console.error('Error al eliminarlos')
            
        }
    }

    //Método obtener todos los objetos:

    async getAllObjects() {

        try {
            
            const dt = await fs.promises.readFile(this.file, 'utf-8')
            return dt ? JSON.parse(dt) : []

        } catch {

            console.error('Error al obtener información de los objetos') //también se puede colocar return []
            
        }
    }

    //Método guardar objetos:

    async saveObjects(objects) {

        try {
            
            await fs.promises.writeFile(this.file, JSON.stringify(objects, null, 2))

        } catch {

            console.error('Error al escribir objetos')
            
        }
    }
}

const main = async() => {

    const productos = new Contenedor('productos.txt')

    //Guardar objeto:

    const id = await productos.save(

        {title: `Producto 1`, price: 1000, thumbnail: 'http://coderhouse.com'},

    )

    console.log('Objeto guardado, ID:', id)

    //Obtener objetos:

    const allObjects = await productos.getAll()

   console.log('Objetos guardados', allObjects)

    //Eliminar todos los objetos

    //await productos.deleteAll();
    //console.log ('objetos eliminados')

    //Eliminar objeto por ID:

    await productos.deleteById(1)
    console.log ('Eliminado objeto')

}

main().catch((error) => console.error(error))

module.exports = Contenedor;