import MyNav from "./components/navbar";
import Home from "./components/homepage";
import Search from "./components/search";
import Login from "./components/login";
import User from "./components/user";
import Result from "./components/result";
import Item from "./components/item";
import UserResult from './components/userResult';
import UserDetail from './components/userDetail';

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <header>
        {/* <h1> lab11</h1> */}
      </header>
      <MyNav />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/search" element = {<Search />} />
        <Route path="/login" element = {<Login />} />
        <Route path="/user" element = {<User />} />
        <Route path="/result" element= {<Result />} />
        <Route path="/item" element= {<Item />} />
        <Route path="/user-result" element= {<UserResult />} />
        <Route path="/user-detail" element={<UserDetail />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
