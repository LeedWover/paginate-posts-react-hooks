import React, { useState, useEffect } from "react";
import "./app.css";

export default () => {
  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, [count]);

  const url = `http://jsonplaceholder.typicode.com/posts?_start=${count}&_limit=5`

  const getData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const showPosts = posts.map((post) => {
    return (
      <div>
        <div>{post.title}</div>
      </div>
    )
  });
  console.log(posts)
  console.log(count)
  return (
    <div>
      {showPosts}
      <button onClick={() => count > 0 ? setCount(count - 5) : null}>back</button>
      <button onClick={() => setCount(count + 5)}>next</button>
    </div>
  );
};
