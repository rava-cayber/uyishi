import pool from "../database/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class userService {
  async register(payload) {
    const { username, password, email } = payload;
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return {
        status: 409,
        message: "User with this email already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );

    let id = result.rows[0].id;

    return {
      succes: true,
      message: "User registered successfully",
      accesToken: jwt.sign({ id, email }, "shaftoli", { expiresIn: "1h" }),
      status: 201,
    };
  }

    async login(payload) {
    const { email, password } = payload;
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return {
        status: 401,
        message: "Invalid email or password",
      };
    }
    console.log(user.rows[0].password);
    
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return {
        status: 401,
        message: "Invalid email or password",
      };
    }
    let id = user.rows[0].id;

    return {
      succes: true,
      message: "User logged in successfully",
      accesToken: jwt.sign({ id, email }, "shaftoli", { expiresIn: "1h" }),
      status: 200,
    };
  }
}
export default new userService();
