import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="panel">
      <br />
      <div
        className="butLinkToRegistration"
        onClick={() => localStorage.clear()}
      >
        <Link to="/">log Out</Link>
      </div>

      <div className="butLink" onClick={() => navigate("Albums")}>
        Albums
      </div>
      <div className="butLink" onClick={() => navigate("Todos")}>
        Todos
      </div>
      <div className="butLink" onClick={() => navigate("Posts")}>
        Posts
      </div>
      {/* <Outlet/> */}
    </section>
  );
}

export default Home;
