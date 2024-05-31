// import { useSession } from "vinxi/http";
import { useSession } from "vinxi/server";
import { db } from "./db";
import { getRequestEvent } from "solid-js/web";

const event = getRequestEvent();

export function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

export function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export async function login(username: string, password: string) {
  // const user = await db.user.findUnique({ where: { username } });
  // if (!user || password !== user.password) throw new Error("Invalid login");
  // return user;
  return {
    id: 1, username: "user"
  }
}

export async function logout() {
  const session = await getSession();
  await session.update(d => (d.userId = undefined));
}

export async function register(username: string, password: string) {
  // const existingUser = await db.user.findUnique({ where: { username } });
  // if (existingUser) throw new Error("User already exists");
  // return db.user.create({
  //   data: { username: username, password }
  // });
}

export function getSession() {
  return useSession(event!.nativeEvent, {
    password: process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace"
  });
}
