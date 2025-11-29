import express from 'express';
import dgService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(dgService.getEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diagnosis!');
});

export default router;