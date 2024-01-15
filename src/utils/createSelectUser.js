import { v4 as uuidv4 } from "uuid";

const createSelectUser = (user, source) => {
  return {
    ...user,
    source,
    isSelected: false,
    id: uuidv4(),
  };
};

export default createSelectUser;
