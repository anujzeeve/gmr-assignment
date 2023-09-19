const express = require('express');
const { router, swaggerSpec } = require('./routes/tasks');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

// Serve Swagger documentation using swagger-ui-express
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add your other routes and middleware here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
