const express = require("express");
const userRoutes = require('./routes/userRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const app = express();
const port = 3000

app.use(express.json())

app.use('/users',userRoutes)
app.use('/recipes',recipeRoutes)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
