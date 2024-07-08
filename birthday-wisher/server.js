// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://127.0.0.1:27017/birthday-wisher', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const userSchema = new mongoose.Schema({
//   name: String,
//   relationship: String,
// });

// const User = mongoose.model('User', userSchema);

// app.post('/users', async (req, res) => {
//   const { name, relationship } = req.body;
//   const user = new User({ name, relationship });
//   await user.save();

//   let wish = `Happy Birthday, ${name}!`;

//   switch (relationship.toLowerCase()) {
//     case 'brother':
//       wish = `Happy Birthday, Brother ${name}!`;
//       break;
//     case 'sister':
//       wish = `Happy Birthday, Sister ${name}!`;
//       break;
//     case 'mother':
//       wish = `Happy Birthday, Mother ${name}!`;
//       break;
//     case 'father':
//       wish = `Happy Birthday, Father ${name}!`;
//       break;
//     case 'friend':
//       wish = `Happy Birthday, Friend ${name}!`;
//       break;
//   }

//   res.status(201).send({ user, wish });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  relationship: String,
});

const User = mongoose.model('Post', userSchema); // Use 'Post' for the collection name

app.post('/users', async (req, res) => {
  const { name, relationship } = req.body;
  const user = new User({ name, relationship });
  await user.save();

  let wish = `Happy Birthday, ${name}!`;

  switch (relationship.toLowerCase()) {
    case 'brother':
      wish = `Happy Birthday, Brother ${name}!`;
      break;
    case 'sister':
      wish = `Happy Birthday, Sister ${name}!`;
      break;
    case 'mother':
      wish = `Happy Birthday, Mother ${name}!`;
      break;
    case 'father':
      wish = `Happy Birthday, Father ${name}!`;
      break;
    case 'friend':
      wish = `Happy Birthday, Friend ${name}!`;
      break;
  }

  res.status(201).send({ user, wish });
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.status(200).send(users);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
