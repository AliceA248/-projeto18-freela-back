import { createUser, loginUser } from "../data/user.data.js";

export async function signUp(req, res) {
  try {
    const user = req.body;
    await createUser(user);
    res.status(201).json({ message: "Usuário cadastrado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
}

export async function signIn(req, res) {
  try {
    req.locals.session = await loginUser(session);
    const token = await generateToken(req.locals.session);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}
