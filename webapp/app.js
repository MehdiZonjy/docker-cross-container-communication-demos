const PromiseMysql = require('promise-mysql')
const express = require('express')




const {
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DB_DATABASE
} = process.env


const start = async () => {
  const pool = await PromiseMysql.createPool({
    host: DB_HOST,
    database: DB_DATABASE,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD
  });



  const app = express()

  app.get('/', async (req, res) => {
    try {
      const conn = await pool.getConnection()
      await conn.query(`CREATE TABLE IF NOT EXISTS users(
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL
        );`)
      await conn.query(`
        INSERT INTO users (name) VALUES ('user${Date.now()}') , ('user${Date.now()}'), ('user$${Date.now()}')
      `)

      const users = await conn.query('SELECT * FROM users')
      res.status(200)
      res.send(users)
      conn.release()
    }
    catch (err) {
      console.error('Failed to run query', err)
      res.send(500)
    }
  })
  app.listen(3000, () => {
    console.log('listening')
  })
}

start().catch(err => {
  console.error('failed to start server', err)
})