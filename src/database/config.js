import { config } from "dotenv";
import { Pool } from "pg";
config()

const pool = new Pool({
  user:process.env.DB_USER,
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  database:process.env.DB_DATABASE,
  password:process.env.DB_PASSWORD
})

async function connect_db() {
  try {
    await pool.connect()
    console.log('✅ db connected');
  } catch (error) {
    console.log(error.message);
  }
}
connect_db();
export default pool;