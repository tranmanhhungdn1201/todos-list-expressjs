// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const shortid = require('shortid');
const pug = require("pug");
const app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.set("view engine", "pug");
app.set("views", "./views");
var todos = [
  { id: 1, action: "Go to School" },
  { id: 2, action: "Go to Home" },
  { id: 3, action: "Seelping" },
  { id: 4, action: "Nấu cơm" }
];
// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/todos", (request, response) => {
  response.render("todos", {
    todos: todos
  });
});

app.get("/todos/search", (request, response) => {
  if (request.query.q) {
    todos = todos.filter(todo => {
      return (
        todo.action.toUpperCase().indexOf(request.query.q.toUpperCase()) !== -1
      );
    });
  }
  response.redirect("/todos");
});

app.post("/todos/create", (req, res) => {
  var id = shortid.generate();
  todos.push({
    id: id,
    action: req.body.todo
  });
  console.log(id);
    console.log(req.body)
    res.redirect('back');
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
