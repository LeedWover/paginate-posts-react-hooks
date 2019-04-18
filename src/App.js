import React, { useState, useEffect, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from './components/Header'
import Spinner from "./components/utils/Spinner";

export default () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, [count]);

  const url = `http://jsonplaceholder.typicode.com/posts?_start=${count}&_limit=5`;

  const getData = () => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  };

  const showPosts = posts.map(post => {
    return (
      <Fragment key={post.id}>
        <div className="media m-3">
          <div className="media-body">
            <h5 className="mt-0">{post.title}</h5>
            {post.body}
          </div>
        </div>
        <hr />
      </Fragment>
    );
  });
  console.log(posts);
  console.log(count);

  const backButton =
    count <= 0 ? (
      <button className="btn btn-dark float-left" disabled>
        back
      </button>
    ) : (
      <button
        className="btn btn-dark float-left"
        onClick={() => setCount(count - 5)}
      >
        back
      </button>
    );

  const content = loading ? (
    <div className="container">
      <div className="text-center">
        <Spinner />
      </div>
    </div>
  ) : (
    <div className="container">
      {showPosts}
      {backButton}

      <button
        className="btn btn-dark float-right"
        onClick={() => setCount(count + 5)}
      >
        next
      </button>
    </div>
  );
  return (
    <Fragment>
      <Navbar />
      {content}
    </Fragment>
  );
};
