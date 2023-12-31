import { useCallback, useEffect, Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { DefaultLayout } from "./layouts";
import { RequireAuth, PersistLogin } from "./components";


const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const ScrollToTop = () => {
  const { pathName = "" } = useLocation();

  const smoothScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const debouncedScrollToTop = debounce(smoothScrollToTop, 100);

  useEffect(() => {
    if (!pathName.includes("#")) {
      debouncedScrollToTop();
    }
  }, [pathName, debouncedScrollToTop]);

  return null;
};

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <div className="w-full overflow-hidden">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Page = route.component;
              // let PersistElement = PersistLogin
              let Layout = DefaultLayout;

              // if(route.path === '/login') PersistElement = null
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              return (
                <Route key={index}>
                  <Route                   
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                </Route>
              );
            })}
            <Route element={<PersistLogin />}>
              <Route element={<RequireAuth />}>
                {privateRoutes.map((route, index) => {
                  let Page = route.component;

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
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
