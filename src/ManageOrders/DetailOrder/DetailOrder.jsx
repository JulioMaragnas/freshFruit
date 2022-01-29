import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDetailPurchase } from '../../requestPurchase';
import "./DetailOrder.css";
import goBackIcon from "../../Assets/goBackIcon.png";
import sendIcon from "../../Assets/sendIcon.png";
import cancelIcon from "../../Assets/cancelIcon.png";
import DetailOrderCard from "./DetailOrderCard/DetailOrderCard";

function DetailOrder() {
  const { detailId } = useParams();
  const [purchaseDetail, setPurchaseDetail] = useState([]);
  useEffect(() => {
    async function init() {
      const detail = await getDetailPurchase(detailId);
      setPurchaseDetail(detail);
    }
    init()
  }, []);
  
  return (
    <section className="w-100 detail-order">
      <div className="w-100 detail-order_controls">
        <Link to="../listOrders">
          <button className="container_button">
            <img src={goBackIcon} alt="volver a la lista" />
            <span> volver a la lista </span>
          </button>
        </Link>
      </div>
      <div className="w-100 display-flex-row detail-order_list-products">
        { purchaseDetail.map(detail => (<DetailOrderCard detailData={detail} key={detail.id} />)) }
      </div>
    </section>
  );
}

export default DetailOrder;
