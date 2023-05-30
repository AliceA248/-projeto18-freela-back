import { validateSignIn, validateSignUp } from "../data/user.data.js";
import bcrypt from "bcrypt";

export async function userSignUp(req, res, next) {
  try {
    const user = await validateSignUp(req.body);
    if (user.rowCount) {
      return res.status(409).json({ message: "Usuário já cadastrado" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function userSignIn(req, res, next) {
  const { password } = req.body;
  try {
    const checkUser = await validateSignIn(req.body);
    if (!checkUser.rowCount) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const checkPassword = bcrypt.compareSync(password, checkUser.rows[0].password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    res.locals.idUser = checkUser.rows[0].id;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
