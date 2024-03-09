import mongoose, { Connection } from 'mongoose';

export const productsMongoUrl = 'mongodb://localhost:27017/products_database';
export const usersMongoUrl = 'mongodb://localhost:27017/users_database';

let sharedConnection: Connection | null = null;

async function connectToDatabase(dbUrl: string): Promise<Connection> {
  try {
    if (!sharedConnection) {
      sharedConnection = await mongoose.createConnection(dbUrl);
    }
    return sharedConnection;
  } catch (error) {
    console.error(`Error de conexión a la base de datos en ${dbUrl}: ${error}`);
    throw error;
  }
}

export const productsDB = connectToDatabase(productsMongoUrl);
export const usersDB = connectToDatabase(usersMongoUrl);

productsDB.then((connection) => {
  connection.on('error', (error) => {
    console.error('Error de conexión a la base de datos de productos:', error);
  });

  connection.once('open', () => {
    console.log('Conectado a la base de datos de productos');
  });
});

usersDB.then((connection) => {
  connection.on('error', (error) => {
    console.error('Error de conexión a la base de datos de usuarios:', error);
  });

  connection.once('open', () => {
    console.log('Conectado a la base de datos de usuarios');
  });
});
