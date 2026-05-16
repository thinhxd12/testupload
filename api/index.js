import Fastify from 'fastify'
import cors from '@fastify/cors'

const app = Fastify({
  logger: true,
})

const corsOptions = {
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname;
    if (hostname === "localhost" || hostname === "https://vocabs1.vercel.app") {
      //  Request from localhost will pass
      cb(null, true);
      return;
    }
    // Generate an error on other origins, disabling access
    cb(new Error("Not allowed"), false);
  },
};

await app.register(cors, corsOptions);

app.get("/", async (req, reply) => {
  return reply.status(200).type("application/json").send({ hello: "world" });
});

export default async function handler(req, reply) {
  await app.ready();
  app.server.emit("request", req, reply);
}
