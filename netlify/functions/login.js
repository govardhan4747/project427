const bcrypt = require('bcrypt');

exports.handler = async function(event) {
  const { name, password } = JSON.parse(event.body);

  const CORRECT_USER = process.env.ADMIN_USER;
  const HASHED_PASS = process.env.ADMIN_PASS_HASH;

  // Securely compare the submitted password with the stored hash
  const isPasswordCorrect = await bcrypt.compare(password, HASHED_PASS);

  // Check if the username (case-insensitive) and password hash both match
  if (name.toLowerCase() === CORRECT_USER && isPasswordCorrect) {
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({ success: false, message: "don't know password better leave" }),
    };
  }
};