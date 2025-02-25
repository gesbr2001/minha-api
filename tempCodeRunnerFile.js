const express = require('express');
const db = require ('./database');
const { RGB_BPTC_UNSIGNED_Format } = require('three');

const router = express.Router();

// CRIAR UM NOVA TASK (CREATE)
router.post('/tasks', (req, res) => {
    const {title} = req.body;
        if (!title) return res.status(400).json({error:'O titulo é obrigatorio'});

        db.run('INSERT INTO tasks (title) VALUES (?)', [title], function(err){
            if (err) return res.status(500).json({error: err.message});

            res.status(201).json({id: this.LastID, title, completed: 0});
        });
});

// listar as tarefas (READ)
router.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [],(err,rows)=>{
        if (err) return res.status(500).json({error: err.message});

        res.json(rows);
    });
});

// Atualizar tarefa (UPDATE)
router.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    db.run('UPDATE tasks SET title = ?, completed = ? WHERE id = ?', [title, completed, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ updated: this.changes });
    });
});

// Deletar uma tarefa (DELETE)
router.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        res.json({ deleted: this.changes });
    });
});

module.exports = router;