const MongoClient = require("mongodb").MongoClient;

//Connect to mongo
function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017,
    dbName = "testing";
  const user = process.env.MONGO_USER,
    pwd = process.env.MONGO_PWD;

  mu.connect = () => {
    let url = `mongodb://${hostname}:${port}`;
    if (user === undefined) {
      url = process.env.MONGODB_URI;
    } else {
      url = `mongodb://${user}:${pwd}@${hostname}:${port}`;
    }

    const cliente = new MongoClient(
      url,
      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    );

    return cliente.connect();
  };

  mu.getAllTestsTotal = () => {
    return mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("test")
        .count()
        .finally(() => client.close())
    );
  };

  mu.getAllTests = (page) => {
    return mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("test")
        .find()
        .skip((page - 1) * 5 + 1)
        .limit(5)
        .toArray()
        .finally(() => client.close())
    );
  };

  mu.getBaseTest = () => {
    const query = { base: true };
    return mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("test")
        .find()
        .find(query)
        .limit(1)
        .toArray()
        .finally(() => client.close())
    );
  };

  mu.newTest = (test) => {
    return mu.connect().then((client) => {
      console.log(client);
      client
        .db(dbName)
        .collection("test")
        .insertOne(test)
        .catch((err) => console.log(err))
        .finally(() => client.close());
    });
  };

  mu.newAnswer = (answer) => {
    return mu.connect().then((client) => {
      console.log(client);
      client
        .db(dbName)
        .collection("testans")
        .insertOne(answer)
        .catch((err) => console.log(err))
        .finally(() => client.close());
    });
  };

  //Es necesario incluir algún tipo de seguridad en esta request, para que los otros usuarios no puedan ver los test de los otros usuarios
  mu.getAllTestsUser = (id) => {
    const query = { user: id };
    return mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("test")
        .find(query)
        .limit(15)
        .toArray()
        .finally(() => client.close())
    );
  };

  mu.getTestUrl = (url) => {
    const query = { anonUrl: url };
    return mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("test")
        .findOne(query)
        .finally(() => client.close())
    );
  };

  mu.getAllAnswersTest = (id) => {
    const query = { test: id };
    return mu.connect().then((client) =>
      client
        .db(dbName)
        .collection("testans")
        .find(query)
        .limit(15)
        .toArray()
        .finally(() => client.close())
    );
  };

  return mu;
}
const mu = MongoUtils();
module.exports = mu;
