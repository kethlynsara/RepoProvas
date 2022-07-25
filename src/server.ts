import app from "./app/index.js";
import dotenv from "dotenv";
dotenv.config();

const port = +process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`Server is up and running on port ${port}`)
});