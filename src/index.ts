import { Client } from "pg";
import e, { express } from "express";  
import type{Request,Response} from "express";

const app = express();
app.use(express.json());

const pgClient = new Client({
  connectionString:
    "postgresql://neondb_owner:npg_xoLhCbnf24FU@ep-late-union-ahbwqvj6-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

app.post("signup", async (req: Request, res:Response) => {
   const { username, email, password } = req.body; 
   try {
    const query = `INSERT INTO users (username,email,password) VALUES ($1 ,$2, $3);`
    const response = await pgClient.query(query,[username,email,password]);
       res.json({
        message: "You have signed up"
       })
    
   } catch (e) {
    console.log(e);
    res.json({

    })
   }
});

app.port(3000);
// const insertQuery = `INSERT INTO  todo (username, email,password) VALUES ('${username}','${email}','${password}')`;
// const response = await pgClient.query(insertQuery); 