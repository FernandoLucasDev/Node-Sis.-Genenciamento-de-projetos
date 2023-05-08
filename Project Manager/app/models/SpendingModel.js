const connect = async ()=> {
    if(global.connection && global.connection.state != 'disconected')
        return global.connection

    const mysql = require('mysql2/promise')
    const  con = mysql.createConnection('mysql://root:root@localhost:3306/projectmanager')
    console.log('Connected to database')
    global.connection = con
    return con
}

const all_spendins = async(spending)=> {
    const con = await connect()
    const sql = 'SELECT * FROM spending WHERE belongs_to = (?)'
    const values = [spending.id]
    const res = await con.query(sql, values)
    return res[0]
}

const add_spending = async(spending)=> {
    const con = await connect()
    const sql = 'INSERT INTO spending (spending_name, spending_value, spending_date, belongs_to) VALUES (?,?,?,?)'
    const values = [spending.name, spending.price, spending.date, spending.id]
    const res = await con.query(sql, values)
    return res[0]
}

module.exports = {all_spendins}