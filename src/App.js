import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/UI/LoadingSpinner";
// import AllQuotes from "./pages/AllQuotes";
// import NewQuote from "./pages/NewQuote";
// import QuoteDetail from "./pages/QuoteDetail";
// import NotFound from "./pages/NotFound";

//페이지 분할하기 위해 lazy loading 사용 
//사용하는 이유는 나중에 앱을 배포하고서 사용자가 접속했을때 처음부터 모든 양의 코드를
//다운받고 사이트가 열리게 되면 느릴 수 있어 불편하므로 해당 사이트 경로에 들어갔을 때
//코드를 다운하고 열리게 하여 초기 코드 번들을 가볍게 하기 위해 사용
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <QuoteDetail />
          </Route>
          <Route path="/new-quotes">
            <NewQuote />
          </Route>
          {/* 위의 경로와 일치하지 않는 모든 URL과 아래의 라우트가 일치되며
         Not Found페이지를 렌더링 하게 된다. */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
