const express = require('express');
const routes = require("./routes");
const cors = require('cors');
const app = express();
app.use(cors({credentials: true, origin: true}));
app.use(express.json());

app.use(routes);

app.listen(3333);
