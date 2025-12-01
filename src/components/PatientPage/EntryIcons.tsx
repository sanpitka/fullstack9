import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Entry } from "../../types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled entry type: ${JSON.stringify(value)}`
  );
}

export const getEntryIcon = (type: Entry["type"]) => {
  switch (type) {
    case "Hospital":
      return <LocalHospitalIcon />;
    case "OccupationalHealthcare":
      return <BusinessCenterIcon />;
    case "HealthCheck":
      return <HealthAndSafetyIcon />;
    default:
      return assertNever(type);
  }
};

const getHealthIconColor = (rating: number): string => {
    switch (rating) {
      case 0:
        return "green";
      case 1:
        return "yellow";
      case 2:
        return "orange";
      case 3:
        return "red";
      default:
        return "black";
    }
  };

  export const getHealthIcon = (rating: number) => {
    return <FavoriteIcon style={{ color: getHealthIconColor(rating) }} />;
  };