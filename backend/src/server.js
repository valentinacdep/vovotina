const express = require('express');
const cors = require('cors');
const connection = require('./db_config');
const app = express();

app.use(cors());
app.use(express.json());

const port = 2000;

// rota de cadastro
app.post('/cadastro', (req, res) => {
    const { name, email, senha } = req.body;
    const query = 'INSERT INTO users (name, email, senha) VALUES (?, ?, ?)';
    connection.query(query, [name, email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao cadastrar.'
            });
        }
        res.json({
            success: true,
            message: 'Você foi cadastrado',
            id: result.insertId
        });
    });
});

// rota de login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const query = 'SELECT * FROM users WHERE email = ? AND senha = ?';

    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Erro no login.'
            });
        }

        if (results.length > 0) {
            res.json({
                success: true,
                message: 'Login realizado com sucesso'
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Usuário ou senha inválidos'
            });
        }
    });
});



app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));