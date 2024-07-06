const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
  name: String,
  relationship: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/users', async (req, res) => {
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

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
