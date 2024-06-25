import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment } from "react";
import { AuthProvider } from "./pages/authContext";

function App() {
  return (
    <AuthProvider>
      <div>
        <Router>
          <Routes>
            {routes.map((route, index) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
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
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
