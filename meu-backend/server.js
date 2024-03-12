const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lun121107#',
  database: 'crud',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Rota de exemplo para obter ffis
app.get('/perfis', (req, res) => {
  console.log('Rota /perfis acessada.');
  // Lógica para obter perfis do banco de dados
  const query = 'SELECT * FROM usuarios';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      res.json(result);
    }
  });
});

// Rota para registrar um novo usuário
app.post('/registro', (req, res) => {
  const { email, senha } = req.body;

  // Verifique se email e senha estão presentes
  if (!email || !senha) {
    return res.status(400).send('Email e senha são obrigatórios');
  }

  // Realize validações adicionais, como verificar se o email é único, etc.

  const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
  db.query(query, [email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao registrar usuário:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      res.json({ message: 'Usuário registrado com sucesso!', id: result.insertId });
    }
  });
});

// Rota para autenticar um usuário
app.post('/autenticacao', (req, res) => {
  const { email, senha } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
  db.query(query, [email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao autenticar usuário:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      if (result.length > 0) {
        // Usuário autenticado com sucesso, agora gera um token
        const token = jwt.sign({ email: result[0].email, userId: result[0].id }, 'secreto', { expiresIn: '1h' });
        res.json({ message: 'Autenticação bem-sucedida!', usuario: result[0], token });
      } else {
        res.status(401).send('Credenciais inválidas');
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
