import { Diaries } from "../types";

const DiaryList = ({ diaries }: Diaries) => (
  <div>
    <h2>Diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <div><strong>{diary.date}</strong></div>
          <div>Weather: {diary.weather}</div>
          <div>Visibility: {diary.visibility}</div> <br />
        </div>
      ))}
  </div>
)
export default DiaryList;