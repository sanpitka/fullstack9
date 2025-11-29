const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };

  interface ContentProps {
    courseContents: {
      name: string;
      exerciseCount: number;
    } [];
  }

  const Content = ({ courseContents }: ContentProps) => (
    <>
      {courseContents.map(part => (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </>
  );

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  interface TotalProps {
    total: number;
  }

  const Total = ({ total }: TotalProps) => {
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header name={courseName} />
      <Content courseContents={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;