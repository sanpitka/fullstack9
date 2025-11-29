import diagnoses from '../../data/diagnoses';

import { DgEntry } from '../types';

const getEntries = (): DgEntry[] => {
  return diagnoses;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getEntries,
  addDiagnosis
};