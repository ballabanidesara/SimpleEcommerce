// functions/signup.js

const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Read data from db.json
    const dbPath = path.resolve(__dirname, 'db.json');
    const dbData = fs.readFileSync(dbPath, 'utf8');
    let users = JSON.parse(dbData);

    // Assuming data sent from Angular form
    const newUser = JSON.parse(event.body);

    // Push the new user to the array
    users.push(newUser);

    // Write updated data back to db.json
    fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'User signed up successfully' }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Something went wrong' }) };
  }
};
