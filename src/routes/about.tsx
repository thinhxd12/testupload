import { createAsync, type RouteDefinition } from "@solidjs/router";
import { getUser, logout } from "~/lib";

export const route = {
  load: () => getUser(),
} satisfies RouteDefinition;

export default function Home() {
  const user = createAsync(() => getUser(), { deferStream: true });
  return <main class="w-full p-4 space-y-2">About {user()?.username}</main>;
}
