import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Photos(props) {
  const { currentUser } = useContext(UserContext);
  const [photos, setPhotos] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render, setRender] = useState(0);
  const [renderFilter, setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);
  let { albumId } = useParams();
  const navigate = useNavigate();

  const chekUserIn = () => {
    const data = localStorage.getItem("currentUserIn");
    if (!data) {
      navigate("/");
      return;
    }
  };
  chekUserIn();

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await fetch(
        `http://localhost:4080/api/users/${currentUser[0]}/photos/get`
      );
      const json = await response.json();
      setPhotos(json);
      setJson(json);
    };
    fetchPhotos();
  }, [render]);
  return (
    <section>
      <div className=" butLinkToHome">
        <Link to={`/User/${currentUser.id}/Home/`}>Home</Link>
      </div>
      <div className=" butLinkToHome">
        <Link to={`/User/${currentUser.id}/Home/Albums`}>Albums</Link>
      </div>
      <h1> photos</h1>
      <div>
        {photos.map((photo) => (
          <div className="PresentationOfInformation" key={photo.id}>
            <ul>
              <li>{photo.title}</li>
              <li>
                <img src={photo.thumbnailUrl} alt="Girl in a jacket"></img>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
