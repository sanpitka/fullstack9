import { useState } from "react";
import { NewEntry } from "../types";

const DiaryForm = ({ onSubmit }: { onSubmit: (entry: NewEntry) => void }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [visibility, setVisibility] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, weather, visibility, comment });
  };

  return (
    <div>
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