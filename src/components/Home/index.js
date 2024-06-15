import { useEffect, useState } from "react";
import NewBookItem from "../NewBookItem";
import Header from "../Header";
import { CirclesWithBar } from 'react-loader-spinner'
import "./index.css";

const apiConstants = {
  initial: "initial",
  loading: "loading",
  success: "success",
  failure: "failure",
};

const Home = () => {
  const [newCollection, setNewCollection] = useState([]);
  const [apiResponse, setApiResponse] = useState({
    status: apiConstants.initial,
    data: null,
    error: null,
  });

  useEffect(() => {
    const fetchNewCollection = async () => {
      setApiResponse((prev) => ({ ...prev, status: apiConstants.loading }));
      const url = "https://api.itbook.store/1.0/new";
      const options = {
        method: "GET",
      };

      try {
        const response = await fetch(url, options);
        const responseData = await response.json();
        if (response.ok) {
          setNewCollection(responseData.books);
          setApiResponse((prev) => ({ ...prev, status: apiConstants.success, data: responseData.books }));
        } else {
          setApiResponse((prev) => ({ ...prev, status: apiConstants.failure, error: "Failed to fetch data" }));
        }
      } catch (error) {
        setApiResponse((prev) => ({ ...prev, status: apiConstants.failure, error: error.message }));
      }
    };

    fetchNewCollection();
  }, []);

  const renderSuccess = () => (
    <ul className="book-list">
      {newCollection.map((eachNewBook) => (
        <NewBookItem key={eachNewBook.isbn13} BookDetail={eachNewBook} />
      ))}
    </ul>
  );

  const renderLoading = () => (
    <div className="loader">
      <CirclesWithBar
        height="100"
        width="100"
        color="red"
        outerCircleColor="red"
        innerCircleColor="red"
        barColor="red"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        />
    </div>
  );

  const renderFailure = () => (
    <div>
      <p>Failed Fetching</p>
    </div>
  );

  const renderApiStatus = () => {
    const { status } = apiResponse;
    switch (status) {
      case apiConstants.success:
        return renderSuccess();
      case apiConstants.loading:
        return renderLoading();
      case apiConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <h1 className="new-collection-head">New Collection</h1>
      <div>{renderApiStatus()}</div>
    </div>
  );
};

export default Home;
