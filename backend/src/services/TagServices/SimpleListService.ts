import { Op, Sequelize } from "sequelize";
import Tag from "../../models/Tag";
import Ticket from "../../models/Ticket";
import TicketTag from "../../models/TicketTag";

interface Request {
  companyId: number;
  searchParam?: string;
  kanban?: number; // Added kanban property to the interface
}

const ListService = async ({
  companyId,
  searchParam,
  kanban = 0 // Default value for kanban is set to 0
}: Request): Promise<Tag[]> => {
  let whereCondition = {};

  if (searchParam) {
    whereCondition = {
      [Op.or]: [
        { name: { [Op.like]: `%${searchParam}%` } },
        { color: { [Op.like]: `%${searchParam}%` } }
      ]
    };
  }

  if (kanban !== undefined && kanban !== null) {
    // Add kanban filter if provided
    whereCondition = {
      ...whereCondition,
      kanban
    };
  }

  const tags = await Tag.findAll({
    where: { ...whereCondition, companyId },
    order: [["name", "ASC"]]
  });

  return tags;
};

export default ListService;
