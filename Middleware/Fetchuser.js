const jwt = require('jsonwebtoken');
const tokenkey="mynamrisrohit"
const fetchuser = (req, res, next) => {
   // Get the user from the jwt token and add id to req object
   const token = req.header('Authorization');
   if (!token) {
      return  res.status(200).send({ error: "Please authenticate using a valid token",success:false })
   }
  try {
   
   const data = jwt.verify(token, tokenkey)
   //    req.user = id
      req.user = data.user
      next();
  } catch (error) {
   console.error(error);
        return res.status(401).json({ error: "Invalid token. Please authenticate using a valid token", success: false });
  }
      
   
   
   
      
//    } catch (error) {
//        res.status(401).send({ error: "Please authenticate using a valid token" })
//    }

}
module.exports = fetchuser