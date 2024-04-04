const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = 3001;

app.get('/numbers/:type', (req, res) => {
  const { type } = req.params;
  let numbers = [];

  if (type === 'even') {
    numbers = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]; 
  }
   else if (type === 'odd') {
    numbers = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]; 
  }
  else if (type === 'prime') {
    numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]; 
  }
  else if (type === 'fibonacci') {
    numbers = [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]; 
  }
  else if (type === 'random') {
    numbers = [3, 2, 1, 5, 8, 7, 21, 14, 10, 31, 13, 20]; 
  }
   else {
    return res.status(400).json({ error: 'Invalid number type' });
  }

  res.json({ numbers });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
