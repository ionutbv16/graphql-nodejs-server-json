const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/board', expressGraphQL({
    schema:schema,
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Server is running on port 4000..');
});

/*
// get record
{
  clientab( id: "3"){
    name,
    address
  }
}

// get all
{
  clientsab {
    name,
    address
  }
}

// edit
mutation {
  editClient(id:"2", age:90) {
    name,
    address,
    age
  }
}

///// add
mutation {
  addClient (name:"Added Name", email: "add@email.com", age:33, address:"Address") {
    name,
    address,
    age
  }
}




*/