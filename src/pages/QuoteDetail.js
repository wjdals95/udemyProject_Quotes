import React, { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";

import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
const DUMMY_QUOTES = [
  {
    id: "q1",
    author: "JM",
    text: "Learning React is fun!",
  },
  {
    id: "q2",
    author: "CJM",
    text: "Learning React is great!",
  },
];
const QuoteDetail = () => {
  const match = useRouteMatch();
  //주소가 바뀔시 다른 라우터들도 일일이 변경할 필요없이 동적으로 사용하기 위해 사용.
  const params = useParams();

  console.log(match);
  const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return <p>No quote found!</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route to={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
