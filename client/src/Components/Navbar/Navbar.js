import "./Navbar.css";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h1>DaysOff</h1>
        </div>
        <div className="selections">
          <div>Individuals</div>
          <div>Teams</div>
          <div>Enterprise</div>
          <div>Product</div>
          <div>Pricing</div>
          <div>Resources</div>
        </div>
        <div className="account">
          <div className="box">
            <div>My account</div>
          </div>
        </div>
      </div>
    </>
  );
}
