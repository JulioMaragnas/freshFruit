import './App.css';
import Navbar from './Shared/Navbar/Navbar';
import Container from './Shopping/Container/Container';
import ShoppingCartContainer from './ShoppingCart/ShoppingCartContainer';
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Container />}></Route>
        <Route path="shoppingCart" element={<ShoppingCartContainer />}></Route>
      </Routes>
    </>
  );
}

export default App;
