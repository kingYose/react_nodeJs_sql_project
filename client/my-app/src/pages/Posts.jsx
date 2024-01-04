import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../App";

export default function Posts() {
  // const {id}=useParams()

  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [todosFilter, setTodosFilter] = useState([]);
  const [render, setRender] = useState(0);
  const [renderFilter, setRenderFilter] = useState(0);
  const [json, setJson] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(
        `http://localhost:4080//api/users/${currentUser[1]}/posts/getAll`
      );
      const json = await response.json();
      setPosts(json);
      setJson(json);
    };
    fetchPosts();
  }, [render]);

  useEffect(() => {
    setPosts(todosFilter);
  }, [renderFilter]);

  function add() {
    let content = prompt();
    if (content == null) {
      return;
    }
    fetch(`http://localhost:4080/api/users/${currentUser[1]}/posts/add`, {
      method: "POST",
      body: JSON.stringify({
        userId: currentUser[1],
        title: content,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function toApDate() {
    let content = prompt();
    if (content == null) {
      alert("Please enter a date");
      {
        return;
      }
    }
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/posts/update/${currentUser[1]}`,
      {
        method: "PUT",
        body: JSON.stringify({
          userId: currentUser[1],
          title: content,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function deletePost() {
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/posts/delete/${currentUser[1]}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  function getComments() {
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/get/${currentUser[1]}/comments`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function addComment() {
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/${currentUser[1]}/addComment`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
  function deleteComment() {
    fetch(
      `http://localhost:4080/api/users/${currentUser[1]}/:postId/deleteComment/:id`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  function showPost(post) {
    setSelectedPost(post);
  }

  function SortingTitleVal() {
    <input type="text" />;
  }

  return (
    <section>
      <div className="butLinkToHome">
        <Link to="/Home">Home</Link>
      </div>
      <br />
      <button onClick={SortingTitleVal}>Search by title</button>
      <br />
      <button
        onClick={() => {
          add();
          setRender(1);
        }}
      >
        add
      </button>

      <br />
      {selectedPost && (
        <div className="SelectedPostDetails">
          <h2>Selected Post Details:</h2>
          <p>Title: {selectedPost.title}</p>
          <p>Body: {selectedPost.body}</p>
        </div>
      )}
      <div>
        {posts.map((post) => (
          <div className="PresentationOfInformation" key={post.id}>
            <ul>
              <li>{post.id}</li>
              <li>{post.title}</li>
              <li>{post.body}</li>
              <button
                onClick={() => {
                  toApDate();
                  setRender(render + 1);
                }}
              >
                update
              </button>

              <button
                onClick={() => {
                  deletePost();
                  setRender(render + 1);
                }}
              >
                delete
              </button>

              <button
                onClick={() => {
                  showPost(post);
                }}
              >
                Show me
              </button>
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
