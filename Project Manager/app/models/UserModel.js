const connect = async ()=> {
    if(global.connection && global.connection.state != 'disconected')
        return global.connection

    const mysql = require('mysql2/promise')
    const  con = mysql.createConnection('mysql://root:root@localhost:3306/projectmanager')
    console.log('Connected to database')
    global.connection = con
    return con
}

const all_users = async()=>{
    const con = await connect()
    const [linhas] = await con.query('SELECT * FROM all_users')
    return await linhas
}

const add_user = async(user)=>{
    const con = await connect()
    const sql = `INSERT INTO all_users (username, email, pass) VALUES (?,?,?)`
    const values = [user.name, user.email, user.pass]
    await con.query(sql, values)
}

const select_user = async(user)=>{
    const con = await connect()
    const sql = `SELECT * FROM all_users WHERE email = (?)`
    const values = [user.email]
    const res = await con.query(sql, values)
    return res[0]
}

module.exports = {all_users, add_user, select_user}