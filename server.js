const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Import route modules
const userRoutes = require('./routes/user'); // Ensure this file exists
const noteRouter = require('./routes/notes'); // Ensure this file exists

// Import API documentation
const apiDocs = require('./api-docs.json');

// Initialize Express app
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Swagger API documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));

// Test route to verify server is running
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Register routes
app.use('/api/user', userRoutes);
app.use('/api/notes', noteRouter);

// Start the server
app.listen(port, () => {
  console.log(`................SERVER is listening on http://localhost:${port}...`);
});






