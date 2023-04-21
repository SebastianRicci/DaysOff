import "./User.css";
import Avatar from "@mui/material/Avatar";

export default function User() {
  return (
    <div className="UserContainer">
      <Avatar
        alt="Sebastian Ricci"
        src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        sx={{ width: 100, height: 100 }}
      />
      <div className="UserName">
        <div className="Name">John Doe</div>
        <div className="Email"> johndoe@gmail.com</div>
      </div>
      <div className="ProButton">Upgrade to Pro</div>
    </div>
  );
}
