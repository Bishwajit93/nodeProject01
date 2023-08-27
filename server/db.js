import pkg from "pg";
const {Pool} = pkg

const pool = new Pool({
    user: "my_db",
    password: "1245",
    database: "perntodo",
    host: "localhost",
    port: 5432
})

export default pool