import express from "express";
import postgresql from "./adapters/postgresql";
import {isEmpty, trim} from "lodash";

const app = express();
const port = process.env.PORT || 3000;
const pg = postgresql();

app.get("/postgresql", (request, response) => {
  const {models: {Product}} = pg;

  const query = {
    order: ["name"],
    limit: parseInt(req.query.limit) || 10
  };

  if (!isEmpty(request.query.nameColumn) || !isEmpty(request.query.valueColumn)) {
    const attributes = [];
    if (!isEmpty(request.query.nameColumn)) {
      attributes.push(request.query.nameColumn);
    }
    if (!isEmpty(request.query.valueColumn)) {
      attributes.push(request.query.valueColumn);
    }
    query.attributes = attributes;
  }

  if (!isEmpty(request.query.term)) {
    query.where = {
      name: {
        $ilike: '%' + trim(request.query.term) + '%'
      }
    };
  }
  return Product.findAll(query)
  .then(products => {
    if (!isEmpty(request.query.callback)) {
      response.type('application/javascript');
      return response.send(`${request.query.callback}(${JSON.stringify(products)})`);
    }

    return response.json(products);
  });
});


pg.initialize()
.then(() => {
  app.listen(port, (err) => {
    if (err) {
      return console.log("something bad happened", err)
    }

    console.log(`server is listening on ${port}`)
  });
});
