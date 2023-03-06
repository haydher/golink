import { Routes, Route } from "react-router-dom";
import Commits from "./components/Commits/Commits";
import Header from "./components/Header";
import Repositories from "./components/Repositories/Repositories";

function App() {
  return (
    <div className="font-roboto w-11/12 sm:w-3/4 lg:w-1/2 m-auto">
      <Header />

      <Routes>
        <Route path="/" element={<Repositories />} />
        <Route path="/:org" element={<Repositories />} />
        <Route path="/:org/commits/:repository" element={<Commits />} />
      </Routes>
    </div>
  );
}

export default App;
