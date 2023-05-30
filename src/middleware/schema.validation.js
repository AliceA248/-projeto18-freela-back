import { schema } from '../schemas/post.schemas.js';

export default function validateSchema() {
  return (req, res, next) => {
    const { confirmPassword, ...data } = req.body; // Remover a propriedade confirmPassword dos dados

    const { error } = schema.validate(data, { abortEarly: false }); // Validar somente os dados (sem a propriedade confirmPassword)

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(422).send(errors);
    }
    next();
  };
}
