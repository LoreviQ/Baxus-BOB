import express from 'express';
import helloWorldRouter from '@routes/helloworld';

const app = express();
const port = 3000;

app.use(helloWorldRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});