const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./firebase_key.json');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); // referência ao Firestore

// ---------- Rotas ----------

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Filmes com Firebase!');
});

// Listar todos os filmes
app.get('/filmes', async (req, res) => {
  try {
    const snapshot = await db.collection('filmes').get();
    const filmes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(filmes);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar filmes', detalhe: error.message });
  }
});

// Criar novo filme
app.post('/filmes', async (req, res) => {
  const { nome, nota_imdb, avaliacao_rotten_tomatoes, diretor, duracao, genero, descricao, imagem } = req.body;

  if (!nome || nota_imdb === undefined || avaliacao_rotten_tomatoes === undefined || !diretor || !duracao || !genero || !descricao || !imagem) {
    return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios: nome, nota_imdb, avaliacao_rotten_tomatoes, diretor, duracao, genero, descricao, imagem' });
  }

  try {
    const docRef = await db.collection('filmes').add({ nome, nota_imdb, avaliacao_rotten_tomatoes, diretor, duracao, genero, descricao, imagem });
    res.status(201).json({ id: docRef.id, nome, nota_imdb, avaliacao_rotten_tomatoes, diretor, duracao, genero, descricao, imagem });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar filme', detalhe: error.message });
  }
});

// Editar filme
app.put('/filmes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, nota_imdb, avaliacao_rotten_tomatoes, diretor, duracao, genero, descricao, imagem } = req.body;

  try {
    const filmeRef = db.collection('filmes').doc(id);
    const doc = await filmeRef.get();

    if (!doc.exists) {
      return res.status(404).json({ mensagem: 'Filme não encontrado.' });
    }

    const updates = {};
    if (nome) updates.nome = nome;
    if (nota_imdb !== undefined) updates.nota_imdb = nota_imdb;
    if (avaliacao_rotten_tomatoes !== undefined) updates.avaliacao_rotten_tomatoes = avaliacao_rotten_tomatoes;
    if (diretor) updates.diretor = diretor;
    if (duracao) updates.duracao = duracao;
    if (genero) updates.genero = genero;
    if (descricao) updates.descricao = descricao;
    if (imagem) updates.imagem = imagem;

    await filmeRef.update(updates);
    res.status(200).json({ id, ...updates });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar filme', detalhe: error.message });
  }
});

// Deletar filme
app.delete('/filmes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const filmeRef = db.collection('filmes').doc(id);
    const doc = await filmeRef.get();

    if (!doc.exists) {
      return res.status(404).json({ mensagem: 'Filme não encontrado' });
    }

    await filmeRef.delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar filme', detalhe: error.message });
  }
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
