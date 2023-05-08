const connect = async ()=> {
    if(global.connection && global.connection.state != 'disconected')
        return global.connection

    const mysql = require('mysql2/promise')
    const  con = mysql.createConnection('mysql://root:root@localhost:3306/projectmanager')
    console.log('Connected to database')
    global.connection = con
    return con
}

const all_projects = async()=> {
    const con = await connect()
    const sql = 'SELECT * FROM project WHERE project_owner = (?)'
    const values = ['lucasnando21@outlook.com']
    const res = await con.query(sql, values)
    return res[0]
}

const add_project = async(project)=> {
    const con = await connect()
    const sql = `INSERT INTO project (project_name, project_description, project_price, project_owner) VALUES (?,?,?,?)`
    const values = [project.name, project.description, project.price, 'lucasnando21@outlook.com']
    await con.query(sql, values)
}

const select_project = async(project)=> {
    const con = await connect()
    const sql = `SELECT * FROM project WHERE id = (?)`
    const values = [project.id]
    const res = await con.query(sql, values)
    return res[0]
}

const delete_project = async(project)=> {
    const con = await connect()
    const sql = 'DELETE FROM project WHERE id = (?)'
    const values = [project.id]
    await con.query(sql, values)
}


module.exports = {all_projects, add_project, select_project, delete_project}