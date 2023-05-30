import { db } from "../database/database.connection.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const session = await db.query(`SELECT * FROM sessions WHERE token = $1;`, [token]);

    if (session.rowCount === 0) {
      return res.status(401).send("Sem autorização");
    }

    res.locals.session = session.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao validar autenticação");
  }
  
}
