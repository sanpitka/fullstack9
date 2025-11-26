import express from 'express';
import { calculateBmi } from './bmicalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const bmi = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', express.json(), (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target || daily_exercises.length === 0) {
    res.status(400).json({ error: "parameters missing" });
    return;
  }
  if (!Array.isArray(daily_exercises) || isNaN(Number(target)) || daily_exercises.some((d: any) => isNaN(Number(d)))) {
    res.status(400).json({ error: "malformatted parameters" });
    return;
  }
  const result = calculateExercises(daily_exercises.map(Number), Number(target));
  res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});