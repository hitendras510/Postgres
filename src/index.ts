import { Client } from "pg";
import  express  from "express";  
import type{Request,Response} from "express";

const app = express();
app.use(express.json());

const pgClient = new Client({
  connectionString:
    "",
});
pgClient.connect();

app.post("signup", async (req: Request, res:Response) => {
   const { username, email, password } = req.body; 

   const {city,country,street,pincode} = req.body;

   try {

    const query = `INSERT INTO users (username,email,password) VALUES ($1 ,$2, $3) RETURNING id;`
    const addressQuery = `INSERT INTO address (city,country,street,pincode,user_id) VALUES ($1 ,$2, $3,$4,$5);`;


  //TRANSCATION :  
    await pgClient.query("BEGIN;")

    const response = await pgClient.query(query,[username,email,password]);
    const userId = response.rows[0].id;
    
    const addressQueryResponse = await pgClient.query(addressQuery,[city,country,street,pincode,userId]);

    await pgClient.query("COMMIT;") //COMMIT -> TAKE BOTH QUERY AND COMMIT IT 

       res.json({
        message: "You have signed up"
       })

   } catch (e) {
    console.log(e);
    res.json({ 
 message: "Error while signinup"
    })
   }
});





app.listen(3000);
