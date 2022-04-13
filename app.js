const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors')

var corsOptions = {
  origin: "http://localhost:4200"
};
  
const app = express();
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors(corsOptions))

app.get('/', (req, res, err) => {
    res.send("Hello World!!!")
})

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
