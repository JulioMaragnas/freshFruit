import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
import "./CardProduct.css";
import carIcon from "../../Assets/carIcon.png";
import { CartContext } from '../../PerformaceHooks/useCart'
import format from 'format-number'

function CardProduct({ product }) {
  const { productos: { imagen } } = product;
  const [cart, setCart] = useContext(CartContext);
  const [quantity, setQuantiy] = useState(1);
  const navigate = useNavigate();
  var myFormat = format({ prefix: '$' });

  const handleCart = () => {
    const productAdded = cart.products.find(p => p.id === product.id);
    let newCart = cart.products.map(p => ({ ...p }));
    if (productAdded && (quantity + productAdded.cantidadAgregada) <= product.existencias) {
      newCart = cart.products.map(p => p.id === productAdded.id ? { ...p, cantidadAgregada: quantity + p.cantidadAgregada } : p)
    }

    if (productAdded && (quantity + productAdded.cantidadAgregada) > product.existencias) {
      message.warning('has superado la cantidad maxima de existencias');
      return;
    }

    if (!productAdded) {
      newCart = [...cart.products, { ...product, cantidadAgregada: quantity }]
    }

    setQuantiy(1);
    setCart({ ...cart, products: newCart });
    message.success('El producto se ha agregado al carrito', 0.6);

    // if(window.confirm(`la ${product.productos.descripcion} se ha agregado al carrito, Quieres ir al carrito?`) === true){
    //   navigate('shoppingCart')
    // }
  };

  return (
    <section className="card-product" key={product.id}>
      <img
        className="w-100 image--br-5 card-product_image--height"
        src={`${imagen}`}
        alt=""
      />
      <h3 className="card-product_code">COD {product.id}</h3>
      <p className="product-price">
        {
          myFormat(product.productos.precio)
        }
      </p>
      <p>{product.productos.descripcion}</p>
      <div className="w-100 mt-10 display-flex-row card-product_button-container">
        <div className="">
          <button
            onClick={() => quantity < product.existencias ? setQuantiy(quantity + 1) : null}
            className="container_button card-product-buy_button--circle"
          >
            ➕
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => quantity !== 1 ? setQuantiy(quantity - 1) : null}
            className="container_button card-product-buy_button--circle"
            style={{ marginLeft: "5px" }}
          >
            ➖
          </button>
        </div>
        <button
          className="card-product_button--add container_button"
          onClick={handleCart}
        >
          <img src={carIcon} alt="" />
          <span>Agregar</span>
        </button>
      </div>
    </section>
  );
}
export default CardProduct;
