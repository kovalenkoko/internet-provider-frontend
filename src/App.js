import {Route, Routes} from "react-router";
import {ROUTES} from "./routes";
import "./App.css"



function App() {
  return (
    <div className="App">
       <Routes>
         {ROUTES.map((route) => (
             <Route key={route.path} path={route.path} element={route.element} />
         ))}
       </Routes>
    </div>
  );
}

export default App;
