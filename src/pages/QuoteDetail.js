import React, { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
// const DUMMY_QUOTES = [
//   {
//     id: "q1",
//     author: "JM",
//     text: "Learning React is fun!",
//   },
//   {
//     id: "q2",
//     author: "CJM",
//     text: "Learning React is great!",
//   },
// ];

const QuoteDetail = () => {
  const match = useRouteMatch();
  //주소가 바뀔시 다른 라우터들도 일일이 변경할 필요없이 동적으로 사용하기 위해 사용.
  const params = useParams();

  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);
  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if(status === 'error'){
    return <div className="centered">{error}</div>
  }
  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
