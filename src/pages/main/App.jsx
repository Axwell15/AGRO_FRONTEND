import './App.style.css';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/header/header";

const App = ({ hookNavigate }) => {
  const [ShowNavBar, setShowNavBar] = useState(false);
  const [category, setCategory] = useState(null);
  return (
    <>
      <Header Hook={setShowNavBar} Value={ShowNavBar} hookNavigate={hookNavigate} />
      <div className="app">
        <Outlet context={[category, setCategory]} />
      </div>
    </>
  );
}

export default App;