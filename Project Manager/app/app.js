const express = require('express');
const bodyParser = require('body-parser');
const { index } = require('./controllers/HomeController');
const { register, getRegisterData, logout } = require('./controllers/RegisterController');
const { getAllProjects, createProjectView, createProject, showProject, deleteProject, createSpending } = require('./controllers/ProjectsController');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './app/views');
app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', index);
app.get('/register', register);
app.get('/logout', logout)
app.get('/projects', getAllProjects)
app.get('/createView', createProjectView)
app.get('/projectvisualize/:id', showProject)

app.post('/login', getRegisterData);
app.post('/projectCreate', createProject)
app.post('/deleteproject', deleteProject)
app.post('/insertspending', createSpending)

  
app.listen(port, () => {
  console.log(`Servidor web rodando na porta ${port}`);
});
