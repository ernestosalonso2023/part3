const express = require("express");
const morgan = require("morgan");
const app = express();
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(requestLogger);

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.get("/", (req, res) => {
  res.send("<h1>Welcome to our api</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/info", (req, res) => {
  const date = new Date();
  const info = `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`;
  res.send(info);
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
app.post("/api/persons", (req, res) => {
  const person = req.body;
  const result = persons.find(
    (p) => p.name.toLowerCase() === person.name.toLowerCase()
  );
  console.log(result);
  // Check if the name already exists in the persons array
  if (result) {
    return res.status(400).json({ error: "name must be unique" });
  }
  if (!person || !person.name || !person.number) {
    return res.status(400).json({ error: "name or number missing" });
  }

  const newId = Math.random() * 1000000;
  const newPerson = {
    id: newId,
    name: person.name,
    number: person.number,
  };
  persons = persons.concat(newPerson);
  res.json(newPerson);
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const PORT = 2222;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
