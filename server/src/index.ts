import e from 'express';


const PORT = process.env.PORT || 3001;

const app = e();

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});