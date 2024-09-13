import { app } from './application/app.js';
import { specs, swaggerUi } from './swagger.js';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(3000, 'localhost', () => {
    console.info(`Server is running on http://localhost:3000`);
});
