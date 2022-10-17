import { useNavigate } from "react-router-dom";
import Button from "./Button";

const About = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };
  return (
    <div>
      <h4> Version 1.0.0</h4>
      <Button text={"Go back"} color={"black"} onClick={onClick} />
    </div>
  );
};

export default About;

//<Link to="/notes"> Go back </Link>
//<button onClick = {() =>toNavigate(-1)}> Go back </button>
