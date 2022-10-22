const authenticator = require('express').Router();
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /login:
 *  post: 
 *    parameters:
 *      - name: user
 *        in: path
 *        description: nome do usuário
 *        required: true
 *        type: string
 *      - name: password
 *        in: path
 *        description: senha do usuário
 *        required: true
 *        type: string
 *    description: Login para pegar o token
 *    content-type: "applicattion/json"
 */
authenticator.post('/', (req, res, next) => {
    console.log(process.env)
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === process.env.user && req.body.password === process.env.password){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})
module.exports = authenticator;