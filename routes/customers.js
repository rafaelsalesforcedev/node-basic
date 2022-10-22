/**
 * Rotas de customers.
 * Os endereços definidos para o objeto Router
 * são relativos a /customers,
 * assim, não temos (e nem deve-se) repetir
 * tal endereço. Se for preciso mudar,
 * isso é feito de forma centralizada no index.js
 */

const customers = require('express').Router();


const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET, (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user

    next()
  })
}

const customersData = [
  { id: 0, name: "Manoel" },
  { id: 1, name: "João" },
  { id: 2, name: "Maria" },
];

/**
 * @swagger
 * /customers:
 *  get: 
 *    parameters:
 *        - name: Authorization
 *          in: header
 *          description: token da aplicação
 *          required: true
 *          type: string
 *    description: Obtém a lista de clientes
 */
customers.get('/', authenticateToken, (req, res) => {
  
  res.send(customersData);
});

/**
 * @swagger
 * /customers/{id}:
 *  get: 
 *    parameters:
 *      - name: Authorization
 *        in: header
 *        description: token da aplicação
 *        required: true
 *        type: string
 *      - name: id
 *        in: path
 *        description: id do cliente
 *        required: true
 *        type: integer
 *    description: Obtém um cliente pelo id
 *    responses:
 *      '200': 
 *        description: Cliente obtido com sucesso 
 */
customers.get('/:id', authenticateToken, (req, res) => res.json(customersData[req.params.id]));

module.exports = customers;