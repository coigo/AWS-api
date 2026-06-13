import { Elysia } from "elysia";
import { db } from "./db";
import { usersTable } from "./db/schema";

const app = new Elysia()

app.get("/", () => "Nova versao v2")

app.get("/users", async () => {
try {
  await db.insert(usersTable).values({
     name: "Teste"
   })
}
catch (err) {
  console.log(err)
} 
  

  return await db.select().from(usersTable)
})

app.listen(3000);

console.log(
  `> Servidor ligando...`
);



