import Sequelize from "sequelize";
import Promise from "bluebird";
import Product from "./models/Product";
import {values} from "lodash";

export default () => {
  const connection = new Sequelize(process.env.POSTGRESQL_DATABASE_URI, {
    dialectOptions: {ssl: true}
  });

  const isSyncRequired = process.env.POSTGRESQL_SYNC_STRUCTURE == 'true';

  connection.initialize = () => {
    return connection.authenticate()
    .then(function() {
      return connection.defineModels();
    });
  };

  connection.defineModels = () => {
    //TODO: replace your table here
    connection.models.Product = Product(connection);

    return Promise.resolve()
    .then(() => {
      if (isSyncRequired) {
        return connection.syncModelStructures()
        .then(() => connection.models);
      }

      return connection.models
    })
    .then(() => {
      //TODO: replace this to load initial data
      if (isSyncRequired) {
        const promises = [];
        promises.push(connection.models.Product.bulkCreate([
          {name: "Computer", price: 660},
          {name: "Mouse", price: 14.99},
          {name: "Keyboard", price: 20.99},
          {name: "Monitor", price: 220},
          {name: "Headphone", price: 50.49}
        ]));

        return Promise.all(promises);
      }
    })
  };

  connection.syncModelStructures = () => Promise.each(values(connection.models), (model) => model.sync({force: true}));

  return connection;
}