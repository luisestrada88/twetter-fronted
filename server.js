const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Ruta estática a la carpeta de Angular
app.use(express.static(path.join(__dirname, 'dist/tweeter')));

// Redirige cualquier otra ruta a index.html (Angular routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/tweeter/index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor Angular corriendo en el puerto ${PORT}`);
});
