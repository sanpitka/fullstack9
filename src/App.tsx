interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group"
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "TypeScript in frontend",
    exerciseCount: 10,
    description: "a hard part",
    kind: "basic",
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  }
];


const App = () => {
  const courseName = "Half Stack application development";

  const Part = ({ part }: { part: CoursePart }) => {
    switch (part.kind) {
      case "basic":
        return (
          <div>
            <p>
              <strong>{part.name} {part.exerciseCount}</strong> <br />
              <em>{part.description}</em>
            </p>
          </div>
        );
      case "group":
        return (
          <div>
            <p>
              <strong>{part.name} {part.exerciseCount}</strong> <br />
              project exercises {part.groupProjectCount}
            </p>
          </div>
        );
      case "background":
        return (
          <div>
            <p>
              <strong>{part.name} {part.exerciseCount}</strong> <br />
              <em>{part.description}</em><br />
              submit to {part.backgroundMaterial}
            </p>
          </div>
        );
      case "special":
        return (
          <div>
            <p>
              <strong>{part.name} {part.exerciseCount}</strong> <br />
              <em>{part.description}</em><br />
              required skills: {part.requirements.join(", ")}
            </p>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  interface HeaderProps {
    name: string;
  }

  const Header = (props: HeaderProps) => {
    return <h1>{props.name}</h1>;
  };

  interface ContentProps {
    courseContents: CoursePart[];
  }

  const Content = ({ courseContents }: ContentProps) => (
    <>
      {courseContents.map(part => (
        <Part key={part.name} part={part} />
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