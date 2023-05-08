const { add_user, select_user } = require("../models/UserModel");
const { all_projects } = require("../models/ProjectsModel");

exports.register = async (req, res) => {
    try {
      res.render('register', {
        msg: '',
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao processar a solicitação');
    }
  };

exports.getRegisterData = async (req, res) => {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const pass = req.body.pass;

        const verify = await select_user({
            email: email
        })

        if(verify.length > 0){
            if(verify[0].pass === pass){
                global.userEmail = verify[0].email
                global.userId = verify[0].id
                global.userName = verify[0].name
                const allProjects = await all_projects()
                res.render('projects', {projects:allProjects, msg: ''});
            } else {
                res.render('register', {msg: "Senha incorreta!"});
            }
        } else {
            const insert = await  add_user({
                name: name,
                email: email,
                pass: pass
            })
            const allProjects = await all_projects()
            res.render('projects', {projects:allProjects, msg: ''});
        }
      } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao processar a solicitação');
      }
};


exports.logout = () => {
    global.userEmail = null
    global.userId = null
    global.userName = null
}