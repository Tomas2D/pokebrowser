import { UserModel } from "@app/database/models/UserModel";
import { v4 as uuidv4 } from "uuid";

export async function getUser(id: string) {
  const user = await UserModel.query().findById(id);
  return user ?? null;
}

export async function createUser(): Promise<UserModel> {
  const id = uuidv4();
  await UserModel.query().insert({ id });

  const user = await getUser(id);
  return user!;
}
