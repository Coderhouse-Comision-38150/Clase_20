// Importar nuestras dependencias
import admin from 'firebase-admin'
import fs from 'fs'

// Leemos nuestra private key
const serviceAccount = JSON.parse(fs.readFileSync('./db/ejemplofirestore-260b6-firebase-adminsdk-csexk-32ff330c7f.json', 'utf8'))

// Inicializamos nuestra aplicación
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https:ejemplofirestore-260b6.firebaseio.com'
})

const asObj = doc => ({id: doc.id, ...doc.data()})

console.log('Base de datos conectada con exito!')

// Conectamos el administrador de Firestore y nos posicionamos en la collection nombres
const db = admin.firestore();
const dbNombres = db.collection('nombres')

// Ingresar datos a la collection nombres
const guardado = await dbNombres.add({ nombre: 'Juan'})
console.log(guardado.id)

const doc = await dbNombres.doc(guardado.id).get();
console.dir(asObj(doc))

const result = []
const snapshot = await dbNombres.get()
snapshot.forEach(doc => {
    result.push(asObj(doc))
})
console.dir(result)

await dbNombres.doc(guardado.id).set({nombre: 'Tomas'})
console.dir(asObj(await dbNombres.doc(guardado.id).get()))

await dbNombres.doc(guardado.id).delete();