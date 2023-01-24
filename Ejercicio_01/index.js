// Importar nuestras dependencias
import mongoose from 'mongoose'

// Apagar el modo estricto
mongoose.set('strictQuery', false)

// Definir el esquema del documento y del modelo
const usuarioSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    dni: {
        type: String, unique: true
    }
})
const usuarioModel = mongoose.model('usuarios', usuarioSchema)

// Conectar a la base de datos ecommerce en MongoDB Atlas
// localhost:27001/colegio ---> siempre hay que pasar el nombre de la base de datos sino se inserta mal
try {
    await mongoose.connect('mongodb+srv://coderhouse:coderhouse@comision38150.c9ezzoa.mongodb.net/ecommerce?retryWrites=true&w=majority', {
        serverSelectionTimeoutMS: 5000,
    })
    console.log('Base de datos conectada')

    // Escritura en la base de datos ecommerce dentro de la collection usuarios.
    try {
        const usuarioNuevo = new usuarioModel({nombre: 'Federico', apellido: 'Perez', dni: '320118321'})
        await usuarioNuevo.save()
        console.log('Usuario agregado con exito')

        // Listar los usuarios representandolos en consola
        let usuarios = await usuarioModel.find({})
        usuarios.forEach(usuario => {
            console.log(JSON.stringify(usuario))
        })
    } catch (error){
        console.log('Error en operacion de base de datos: ' + error)
    }

} catch (error) {
    console.log('Error en la conexión a la base de datos: ' + error)
}