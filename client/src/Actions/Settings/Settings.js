import "./Settings.css";
import User from "../../Components/User/User";
import UserInputs from "../../Components/UserInputs/UserInputs";
export default function Settings() {
  return (
    <>
      <div className="settingsContainer">
        <User />
        <UserInputs />
      </div>
    </>
  );
}
