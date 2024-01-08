import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "../App";

function Home() {
  // const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    (function () {
      const data = localStorage.getItem("currentUserIn");
      console.log(data);
      if (!data) {
        navigate("/");

        return;
      }
    })();
  }, []);

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
