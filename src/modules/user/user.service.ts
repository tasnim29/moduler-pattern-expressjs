import { pool } from "../../config/db";

// routes--->controller--->service
// so here we handle the service part only means all the logics
const createUser = async (name: string, email: string) => {
  const result = await pool.query(
    `INSERT INTO users(name,email) VALUES($1,$2) RETURNING* `,
    [name, email]
  );
  return result;
};
export const userServices = {
  createUser,
};
