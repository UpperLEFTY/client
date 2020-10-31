const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const SECRET_KEY = 'secret!';

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // eslint-disable-next-line no-undef
  const theUser = users.find((user) => user.email === email);
  if (!theUser) {
    res.status(404).send({
      success: false,
      message: `Could not find account: ${email}`,
    });
    return;
  }
  const match = await bcrypt.compare(password, theUser.password);
  if (!match) {
    //return error to user to let them know the password is incorrect
    res.status(401).send({
      success: false,
      message: 'Invaild credentials',
    });
    return;
  }
  const token = jwt.sign({ email: theUser.email, id: theUser.id }, SECRET_KEY);
  res.send({
    success: true,
    token: token,
  });
});

app.listen(3000, () => console.log('Server listening on port 3000'));
