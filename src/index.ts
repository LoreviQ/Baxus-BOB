import express from 'express';
import helloWorldRouter from '@routes/helloworld';
import bobRouter from '@routes/BOB';

const app = express();
const port = 3000;

// Add JSON middleware
app.use(express.json());

app.use(helloWorldRouter);
app.use(bobRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});