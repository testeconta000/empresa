import * as Yup from "yup";

import AppError from "../../errors/AppError";
import Tag from "../../models/Tag";

interface Request {
  name: string;
  color: string;
  companyId: number;
  kanban: number; // Adicionando a propriedade kanban ao Request
}

const CreateService = async ({
  name,
  color = "#A4CCCC",
  companyId,
  kanban = 0,
}: Request): Promise<Tag> => {
  const schema = Yup.object().shape({
    name: Yup.string().required().min(3),
    kanban: Yup.number().required(),
  });

  try {
    await schema.validate({ name, kanban }); // Validando a propriedade kanban
  } catch (err: any) {
    throw new AppError(err.message);
  }

  const [tag] = await Tag.findOrCreate({
    where: { name, color, kanban, companyId },
    defaults: { name, color, kanban, companyId },
  });

  await tag.reload();

  return tag;
};

export default CreateService;
