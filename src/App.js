import './App.css';
import Navbar from './Shared/Navbar/Navbar';
import Container from './Shared/Container/Container';
import CardProduct from './ShoppingCart/CardProduct/CardProduct'
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Container />}></Route>
        <Route path="detail" element={<CardProduct />}></Route>
      </Routes>
    </>
  );
}

export default App;
