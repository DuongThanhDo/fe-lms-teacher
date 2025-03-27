import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import { Fragment, useEffect, useState } from "react";
import { publicRoutes } from "./routes/publicRoutes";
import { privateRoutes } from "./routes/privateRoutes";
import { useSelector } from "react-redux";

function App() {
  const authState = useSelector((state) => state.auth);
  const login = authState.isLoggedIn;

  const [allRoutes, setAllRoutes] = useState([]);

  useEffect(() => {
    const tempPrivateRoutes = login ? privateRoutes : [];
    const routes = [...publicRoutes, ...tempPrivateRoutes];
    setAllRoutes(routes); 
  }, [login]);

  return (
    <Router>
      <div className="App">
        <Routes>
          {allRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

