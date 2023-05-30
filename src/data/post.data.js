import { db } from "../database/database.connection.js";

export async function insertPost(userid, photo, description) {
    const photobuffer = Buffer.from(photo);
    await db.query('INSERT INTO posts ("userid", photo, description) VALUES ($1, $2, $3);', [
      userid,
      photobuffer,
      description,
    ]);
  }
  export async function selectUserPost(id){
    return await db.query(`SELECT * FROM posts WHERE "userid" = $1 LIMIT 6;`, [id]);
}