const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = 3000;

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});

app.use(cors());
app.use(bodyParser.json());

// Rota de exemplo para obter perfis
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
  const { nome, email, senha } = req.body;

  // Verifique se email e senha estão presentes
  if (!nome || !email || !senha) {
    return res.status(400).send('Nome, Email e senha são obrigatórios');
  }

  // Realize validações adicionais, como verificar se o email é único, etc.

  const query = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, senha], (err, result) => {
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

  const query = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?' ;
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

// Rota para salvar uma nova entrada no banco de dados
app.post('/adicionar-entrada', (req, res) => {
  const { descricao, valor, tipo } = req.body;

  // Verifique se todos os campos estão presentes
  if (!descricao || !valor || !tipo) {
    return res.status(400).send('Descrição, Valor e Tipo são obrigatórios');
  }

  // Realize validações adicionais, se necessário

  // Realize a inserção no banco de dados
  const query = 'INSERT INTO entradas (descricao, valor, tipo) VALUES (?, ?, ?)';
  db.query(query, [descricao, valor, tipo], (err, result) => {
    if (err) {
      console.error('Erro ao adicionar entrada:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      res.json({ message: 'Entrada adicionada com sucesso!', id: result.insertId });
    }
  });
});

// Rota para obter todas as entradas do banco de dados
app.get('/entradas', (req, res) => {
  const query = 'SELECT * FROM entradas';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erro ao buscar entradas:', err);
      res.status(500).send('Erro interno no servidor');
    } else {
      res.json(result);
    }
  });
});



app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
