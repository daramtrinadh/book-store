import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

import NewBookItem from "../NewBookItem";
import Header from "../Header";
import { CirclesWithBar } from 'react-loader-spinner';
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

  const [searchResults, setSearchResults] = useState([]);
  const [searchApiResponse, setSearchApiResponse] = useState({
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

  const [titleQuery,setTitleQuery]=useState('')
  const onTitle=(e)=>setTitleQuery(e.target.value)

  useEffect(() => {
    if (titleQuery) {
      const fetchSearchResults = async () => {
        setSearchApiResponse((prev) => ({ ...prev, status: apiConstants.loading }));
        const url = `https://api.itbook.store/1.0/search/${titleQuery}`;
        const options = {
          method: "GET",
        };

        try {
          const response = await fetch(url, options);
          const responseData = await response.json();
          if (response.ok) {
            setSearchResults(responseData.books);
            setSearchApiResponse((prev) => ({ ...prev, status: apiConstants.success, data: responseData.books }));
          } else {
            setSearchApiResponse((prev) => ({ ...prev, status: apiConstants.failure, error: "Failed to fetch data" }));
          }
        } catch (error) {
          setSearchApiResponse((prev) => ({ ...prev, status: apiConstants.failure, error: error.message }));
        }
      };

      fetchSearchResults();
    }
  }, [titleQuery]);

  const renderSearchSuccess = () => (
    <ul className="book-list">
      {searchResults.map((eachNewBook) => (
        <NewBookItem key={eachNewBook.isbn13} BookDetail={eachNewBook} />
      ))}
    </ul>
  );

  const renderSearchApiStatus = () => {
    const { status } = searchApiResponse;
    switch (status) {
      case apiConstants.success:
        return renderSearchSuccess();
      case apiConstants.loading:
        return renderLoading();
      case apiConstants.failure:
        return renderFailure();
      default:
        return null;
    }
  };

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
      <div className="input-section">
        <input
            className="input-bar"
            placeholder="Search your Book Title"
            value={titleQuery}
            onChange={onTitle}
            aria-label="Search for book title"
        />
        <FaSearch fontSize={18} className="search-icon" />
      </div>
      <div>{renderSearchApiStatus()}</div>
      <h1 className="new-collection-head">New Collection</h1>
      <div>{renderApiStatus()}</div>
    </div>
  );
};

export default Home;
