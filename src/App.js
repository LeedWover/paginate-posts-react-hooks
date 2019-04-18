import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default () => {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, [count]);

  const url = `http://jsonplaceholder.typicode.com/posts?_start=${count}&_limit=5`;

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const showPosts = posts.map(post => {
    return (
      <div className="media m-3">
        <div className="media-body">
          <h5 className="mt-0">{post.title}</h5>
          {post.body}
        </div>
      </div>
    );
  });
  console.log(posts);
  console.log(count);
  return (
    <div className="container">
      {showPosts}
      <button
        className="btn btn-primary float-left"
        onClick={() => (count > 0 ? setCount(count - 5) : null)}
      >
        back
      </button>
      <button
        className="btn btn-primary float-right"
        onClick={() => setCount(count + 5)}
      >
        next
      </button>
    </div>
  );
};
