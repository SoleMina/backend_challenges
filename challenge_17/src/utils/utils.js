import { fileURLToPath } from "url";
import { dirname } from "path";
import { hashSync, genSaltSync, compareSync } from "bcrypt-nodejs";

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(filename));

export const authMiddleware = (req, res, next) => {
  if (!req.auth) res.status(403).send({ error: -2, message: "NO AUTORIZADO" });
  else next();
};

export const createHash = (password) => {
  return hashSync(password, genSaltSync());
};

export const isValid = (password, hasedPassword) => {
  let compare = compareSync(password, hasedPassword);
  console.log(compare);
  return compare;
};
export default __dirname;
