import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'BE Test Case Eigen',
            version: '1.0.0',
            description: 'A simple Express API BE Eigen with Swagger documentation',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
        tags: [
            {
                name: 'Member',
                description: 'Show all members',
            },
            {
                name: 'Book',
                description: 'Operations related to books',
            },
        ],
    },
    apis: [join(__dirname, './routes/*.js')],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
