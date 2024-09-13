<h1 align="center">Express JS with Prisma</h1>

> Base url of this service is: http://localhost:3000

## How to Install

#### 1. Clone repository with the following command:

```bash
git clone https://github.com/arisafriyanto/express-js-with-prisma.git
```

#### 2. Move to the repository directory with the command:

```bash
cd express-js-with-prisma
```

#### 3. Run the following command to install the depedency:

```bash
npm install
```

#### 4. Copy the `.env.example` file, rename it to `.env` and edit the `.env` file in the main directory, making sure the configuration values are appropriate:

```bash
DATABASE_URL="mysql://{username}:{password}@localhost:3306/{database_name}"
```

#### 5. Start the API:

```bash
npm run start
```

or

```bash
npm start
```

#### 6. Create mysql database:

```bash
create database express_with_prisma
```

#### 7. Run the following command to migrate the table :

```bash
npx prisma migrate dev
```

#### 8. Run the following command to seed the members and books table data :

```bash
npx prisma db seed
```

#### 9. Run the following command to run the unit-test :

```bash
npx jest test
```

   <br>
  
## Documentation

This API uses Swagger to documentation and test.

After start project, you can access path here:

> http://localhost:3000/api-docs

## Contact

Please contact [arisafriyanto1933@gmail.com](mailto:arisafriyanto1933@gmail.com).

#### Thank you !!
