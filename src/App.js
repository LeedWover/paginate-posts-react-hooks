import React, { useState, useEffect, Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Header";
import Spinner from "./components/utils/Spinner";

export default () => {
  const [count, setCount] = useState({
    start: 0,
    limit: 5
  });
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getData();
  }, [count]);

  const url = `http://jsonplaceholder.typicode.com/posts?_start=${
    count.start
  }&_limit=${count.limit}`;

  const getData = async () => {
    if (count.start < 0) {
      setCount({
        ...count,
        start: 0
      });
    }

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      });
  };

  const handleChange = event => {
    setCount({
      ...count,
      limit: event.target.value
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
  console.log(count);

  const backButton =
    count.start <= 0 ? (
      <button className="btn btn-dark float-left" disabled>
        back
      </button>
    ) : (
      <button
        className="btn btn-dark float-left"
        onClick={() =>
          setCount({
            ...count,
            start: Number(count.start) - Number(count.limit)
          })
        }
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
      <div className="row">
        <div className="col-2">{backButton}</div>
        <form className="col-8">
          <div className="form-group">
            <select
              value={count.limit}
              onChange={handleChange}
              className="form-control"
              id="sel1"
            >
              <option value={5}>5 Posts</option>
              <option value={10}>10 Posts</option>
              <option value={15}>15 Posts</option>
            </select>
          </div>
        </form>
        <div className="col-2">
          <button
            className="btn btn-dark float-right"
            onClick={() =>
              setCount({
                ...count,
                start: Number(count.start) + Number(count.limit)
              })
            }
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <Fragment>
      <Navbar />
      {content}
    </Fragment>
  );
};
