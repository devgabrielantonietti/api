// const express = require('express');
// const cors = require('cors');
// const admin = require('firebase-admin');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(express.json());

// // ---------- Inicializando Firebase Admin ----------

// admin.initializeApp({
//   credential: admin.credential.cert({
//     "type": "service_account",
//     "project_id": "filmes-72944",
//     "private_key_id": "5ef8f774c1e03819b6b87c2433d12cfb64a57",
//     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWuVCWLO3z2n+Q\nBE9rplPHgEOCUaBgSWf40xStKC/lGDt3AFcev56PRaO2HR9l/594ne0MDxT92Scp\nwFxDfE6VVpVBj8MvaMjp1NFwVuEMEG52JayCZk4F7404EvWPI8LzUM7m9IfzfaCX\nza6eO4pbxZSv3G1au4njY3Ea8BW3dzPCc3v5Z+ysH+GpkhHRfP0OIALt1AnjoCaJ\nASMcOfoE0osDmChFa0fRXMNErD+dVycmO2IFf071vpj24A+b7nv0eFhfc40QuZQ1\n/EXd0p/syST4pdnmBSBEkC+bJ3d/biiHli+fYawdOdRMpIIFGhU8t+XUg9xYi2Kk\nJpLgNipJAgMBAAECggEAAsXrhh6YB1Y2RfEVG+bO0WMurzguqHYXCarWnlKui6uy\n2Ogzawo+gGTKpuEPzr/TNDn8UPONtqZfT+kg4YSkq/kT5GZ4g6kIYm/rl7yhG27H\nsaIhU23O0PTPD7JVYyV34+L44rK1yGDbxubsVZufP2z5Bp+dXSNrthJ96EMn6wtw\n/iAvYY6dPS0xbO5j8tE2G1iX6mYxLi6XblB2377fbbHw66r00eB8q+0PO2e0mZDO\nqoboVu15w38O6PNYdk1yRCAvVmfBZCMe7MCv0A6t93ty6iOzZMRYMEKicxXqti7n\nZMJ/x7iXkSyFSmidsRC4HY3Lfxd1eWTiPLHOWevyIQKBgQD9s2sAleGXYR5RyyYh\nutLO03pJoTs51WDhBVDsvD1KzFYY7LQlJiqPOKO6EiHasB3UQ3ii1S3Wwv4YH7S5\nvq64nI9MBCJiZ4CxTi0pwRFKM07CppKPwZqgvHKCL7Fu5XzVypN/1nkGpczlr2eX\n2pj83j2XLmCPnt1fXd+MpOKepwKBgQDYq3iKWQAqC1v/A710zfdUiHg3LypchlTN\nd58oRwUpPeEJzKT0HDIogHyOn0NBNxT1ckEnZ6nR6mXDntW8cXsdXPnoARibsQ1f\nzFemSrNqHyjXrXktcuRm6QQtYifRpRGC/cTScLh37TyE9PqV7/H6Z1YttyZGLRw4\nB5hfHZh9jwKBgEQ7bvnXVbb6/caN1pGXx36szeTjoiQpyUZ7wYoKDooBbt6BOuoK\n28NtPkua+NPyLfOaueVBZHSwONqQHHEgYalxIfEV45GHuMr29ZqXPGkyZ2pelmhn\nb4jvZfSxkwz6V5rAQu9M5XvuN69Gf5wNxLutoe75ICtAVNWDT85pwjFdAoGBAKts\nRstWjR22rQt/Xwap6lQUQOCQTXi0wyVoziBkyD2P+prxMVT9deW7elCwytovBUMI\nKWpOxvoQ9ICoCzyzoA9kP0iCjYCovQcdOf+UPIzqqDqzwhrmOrT9CNQLQ6vHaKp1\nsqI4koo3xVkAJb44//74gSNcM0j0ac4enDwswzgbAoGBAPOIodCJ+1e6oVUrrATN\n8sksTT4Y18Dt2Trd8T85iKXZwVLWYEDFru9AfbP59yKPm9mSyKw/3oRpFF6JnfAi\nStq3+5I2bX9wdzZmPSlyfV88jwEfkMhWAnMTgLUgFas8iSOKoMHAMK0wr5IIwwxt\nT4gpbqiDI25lQP+ZJHnROyPF\n-----END PRIVATE KEY-----\n",
//     "client_email": "firebase-adminsdk-fbsvc@filmes-72944.iam.gserviceaccount.com",
//     "client_id": "115734308881581091472",
//     "auth_uri": "https://accounts.google.com/o/oauth2/auth",
//     "token_uri": "https://oauth2.googleapis.com/token",
//     "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
//     "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40filmes-72944.iam.gserviceaccount.com"
//   })
// });
// require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ---------- Inicializando Firebase Admin ----------
admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.FIREBASE_TYPE,
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // necessário para que quebras de linha funcionem
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    client_id: process.env.FIREBASE_CLIENT_ID,
    auth_uri: process.env.FIREBASE_AUTH_URI,
    token_uri: process.env.FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
  })
});

// ---------- Firestore ----------
const db = admin.firestore();

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
