/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const app = express();

app.use(bodyParser.json());

app.get('/todos', async (req, res) => {
  try {
    // Read todo items from the file
    const data = await readFileAsync('todos.json', 'utf8');
    const todos = JSON.parse(data);

    // Send the todo items as a JSON response
    res.status(200).json(todos);
  } catch (error) {
    console.error('Error retrieving todo items:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await readFileAsync('todos.json', 'utf8');
    const todos = JSON.parse(data);
    const foundTodo = todos.find((todo) => todo.id === id);
    if (!foundTodo) {
      res.status(404).send('Todo not found');
      return;
    }
    res.json(foundTodo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/todos', async (req, res) => {
  try {
    const newTodo = {
      id: Math.floor(Math.random() * 1000000).toString(), // Convert to string
      title: req.body.title,
      description: req.body.description,
    };
    let todos = [];
    try {
      const data = await readFileAsync('todos.json', 'utf8');
      todos = JSON.parse(data);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
    todos.push(newTodo);
    await writeFileAsync('todos.json', JSON.stringify(todos));
    res.status(201).send(newTodo);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let data = await readFileAsync('todos.json', 'utf8');
    data = JSON.parse(data);
    const foundIndex = data.findIndex((todo) => todo.id === id);
    if (foundIndex === -1) {
      res.status(404).send('Todo not found');
      return;
    }
    data[foundIndex].title = req.body.title || data[foundIndex].title;
    data[foundIndex].description =
      req.body.description || data[foundIndex].description;
    await writeFileAsync('todos.json', JSON.stringify(data));
    res.status(200).send(data[foundIndex]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/** 5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal */
app.delete('/todos/:id', async (req, res) => {
  let data = await readFileAsync('todos.json', 'utf8');
  data = JSON.parse(data);
  let delData = data.filter((ds) => ds.id !== req.params.id);
  if (delData === data) {
    res.status(404).send();
    return;
  }
  await writeFileAsync('todos.json', JSON.stringify(delData));
  res.status(200).send();
});
module.exports = app;
