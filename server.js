const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./api-docs.json');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/notes');
const userPersist = require('./models/userPersist');
const notesPersist = require('./models/notesPersist');

require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRoutes);

// Swagger Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Log database connections
console.log('Databases initialized: usersDataBase.db and notesDataBase.db');






