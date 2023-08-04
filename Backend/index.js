const express = require('express');
require("dotenv").config();


const PORT = process.env.port || 5000;
const app = express();

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})