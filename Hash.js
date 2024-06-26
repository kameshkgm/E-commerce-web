const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
  console.log(hashedPassword);
}

hashPassword('admin1234');
