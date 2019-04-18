import React, { useState, useEffect, Fragment } from "react";
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
    count <= 0 ?
    (
      <button className="btn btn-primary float-left" disabled>
        back
      </button>
    )
    :
    (
      <button
        className="btn btn-primary float-left"
        onClick={() => setCount(count - 5)}
      >
        back
      </button>
    )

  return (
    <div className="container">
      {showPosts}
      {backButton}
      
      <button
        className="btn btn-primary float-right"
        onClick={() => setCount(count + 5)}
      >
        next
      </button>
    </div>
  );
};
