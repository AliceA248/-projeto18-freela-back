import { db } from "../database/database.connection.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

export async function createUser(user) {
    const { name, username, email, password } = user;
    const hash = bcrypt.hashSync(password, 10);

    await db.query(`
            INSERT INTO users (name, "username", email, password)
            VALUES ($1, $2, $3, $4);`,
        [name, username, email, hash]
    );

    return;
}

export async function loginUser(user) {
    const token = uuid();
    const { idUser } = user;

    await db.query(`INSERT INTO sessions ("userid", token) VALUES ($1, $2);`, [idUser, token]);

    return token;
}

export async function validateSignUp(user) {
    const { email } = user;
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    return result;
}

export async function validateSignIn(user) {
    const { email } = user;
    const result = await db.query(`SELECT * FROM users WHERE email = $1;`, [email]);

    return result;
}