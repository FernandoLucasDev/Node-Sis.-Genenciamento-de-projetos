exports.index = async (req, res) => {
    try {
      const getUsers = require('../models/UserModel');
      console.log('Selecionando usuário');
      const x = await getUsers.all_users();
      const name = x[0].username;
      console.log(name);
      res.render('index', {
        title: 'Página inicial',
        message: 'Bem-vindo ao meu projeto Node.js usando o padrão MVC! AQUI',
        text: name,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao processar a solicitação');
    }
  };
  