import { useState } from "react";
import { NewEntry } from "../types";

const DiaryForm = ({ onSubmit }: { onSubmit: (entry: NewEntry) => Promise<void> }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSubmit({ date, weather, visibility, comment });
      setDate('');
      setWeather('');
      setVisibility('');
      setComment('');
    } catch (error: unknown) {
  let errorMessage = '';
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as any).response?.data === 'string'
  ) {
    errorMessage = (error as any).response.data;
  } else if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  setError(errorMessage);
  setTimeout(() => { setError(null); }, 5000);
}
  };

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Date:
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Weather:
          <input
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <div>
          Visibility:
          <input
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <div>
          Comment:
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiaryForm;