import app from "./src/app.js";
import { connectToDB } from "./src/config/database.js";

connectToDB();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running at ${port}`)
})