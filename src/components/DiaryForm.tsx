import { useState } from "react";
import { NewEntry } from "../types";

const DiaryForm = ({ onSubmit }: { onSubmit: (entry: NewEntry) => void }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<NewEntry['weather']>('Sunny');
  const [visibility, setVisibility] = useState<NewEntry['visibility']>('Great');
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ date, weather, visibility, comment });
    setDate('');
    setWeather('Sunny');
    setVisibility('Great');
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          Weather:
          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value as NewEntry['weather'])}
          >
            <option value="" disabled hidden>Select...</option>
            <option value="sunny">Sunny</option>
            <option value="rainy">Rainy</option>
            <option value="cloudy">Cloudy</option>
            <option value="windy">Windy</option>
            <option value="stormy">Stormy</option>
          </select>
        </div>
        <div>
          Visibility:
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value as NewEntry['visibility'])}
          >
            <option value="great">Great</option>
            <option value="good">Good</option>
            <option value="ok">Ok</option>
            <option value="poor">Poor</option>
          </select>
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