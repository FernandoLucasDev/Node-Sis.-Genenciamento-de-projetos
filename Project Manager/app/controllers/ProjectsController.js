const { all_projects, add_project, select_project, delete_project } = require("../models/ProjectsModel");
const {all_spendins} = require('../models/SpendingModel')

exports.getAllProjects = async (req, res) => {
    try {
        const allProjects = await all_projects()
        res.render('projects', {projects:allProjects, msg: ''});
    } catch (error) {

    }
};

exports.createProjectView = (req, res) => {
    res.render('projectCreate')
}

exports.createProject = async (req, res) => {
    try {
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;

        const create = await add_project({
            name: name,
            description: description,
            price: price
        })
        const allProjects = await all_projects()

        res.render('projects', {projects:allProjects, msg:'Projeto criado com sucesso!'});
    } catch (error) {

    }
};

exports.showProject = async (req, res) => {
    try {
        const id = req.params.id
        const data = await select_project({id:id})
        const spendings = await all_spendins({id:id})

        let totalSpendings = 0
        for(let i = 0; i < spendings.length; i++){
            totalSpendings += spendings[i].spending_value
        }
        console.log(totalSpendings)
        res.render(
            'project', 
            {
                project:data[0],
                spendings:spendings,
                total:totalSpendings
            }
            )
    } catch (error) {

    }
};

exports.deleteProject = async(req, res) => {
    const id = req.body.id;
    const deleteProject = await delete_project({id:id});
    const allProjects = await all_projects()
    res.render('projects', {projects:allProjects, msg: ''});
};

exports.createSpending = async(req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const id = req.body.id;

    // const currentDate = new Date();
    // const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

    // console.log(formattedDate);
};