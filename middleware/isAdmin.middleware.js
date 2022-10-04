const { expressjwt: jwt } = require("express-jwt");
 
const isAdmin = jwt({
  secret: `${process.env.TOKEN_SECRET}`,
  algorithms: ["HS256"],
  requestProperty: 'payload', 
  getToken: getTokenFromHeaders
});
 
 
function getTokenFromHeaders (req) {
  console.log(req) 
  if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer" && req.body.user.isAdmin) {

    const token = req.headers.authorization.split(" ")[1];
    return token;
  } 

  return null;
}
 
 
module.exports = {
  isAdmin
}