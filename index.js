const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

const taskRoutes = require('./routes');

app.use('/api', taskRoutes);

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API está Online');
});

app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}');
});

