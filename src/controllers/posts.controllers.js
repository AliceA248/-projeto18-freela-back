import { insertPost, selectUserPost } from "../data/post.data.js";

export async function addPost(req, res) {
  if (!req.body.hasOwnProperty('photo') || !req.body.hasOwnProperty('description')) {
    return res.status(400).send('Os campos photo e description são obrigatórios');
  }

  const { photo, description } = req.body;
  const { userid } = req.locals.session;
  
  try {
    const photo = Buffer.foto;
    await insertPost(userid, photo, description);
    res.status(201).send('Sucesso!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao adicionar o post');
  }
}

export async function getUserPostsById(req, res) {
  const { id } = req.params;

  try {
    const userPosts = await selectUserPost(id);
    const formatedUserPosts = userPosts.rows.map(u => {
      return {
        image: `data:image/jpeg;base64,${u.photo.toString('base64')}`,
        description: u.description
      };
    });

    res.send(formatedUserPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao obter os posts do usuário');
  }
}
