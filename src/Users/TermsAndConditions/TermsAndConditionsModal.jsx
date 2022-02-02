import React from "react";
import { Modal, Button } from "antd";
import "./TermsAndConditions.css";

function TermsAndConditions({ visible, setVisible }) {
  return (
    <Modal
      title="Política de tratamiento de datos del usuario"
      centered
      visible={visible}
      width={"50%"}
      footer={[
        <Button key="back" type="primary" onClick={()=> setVisible(false)}>
          OK
        </Button>
      ]}
    >
      <div className="w-100 terms">
        <p>
          La ley colombiana establece el habeas data en la ley 1581 del 2012 la
          cual tiene por objeto desarrollar el derecho constitucional que tienen
          todas las personas a conocer, actualizar y rectificar las
          informaciones que se hayan recogido sobre ellas en bases de datos o
          archivos, y los demás derechos, libertades y garantías
          constitucionales a que se refiere el artículo 15 de la Constitución
          Política; así como el derecho a la información consagrado en el
          artículo 20 de la misma.
        </p>
        <p>
          El objetivo de dicha ley es velar por el buen uso de los datos ya sean
          personales o comerciales registrados en una base de datos pública o
          privada teniendo en cuenta las siguientes definiciones:
          <ul>
            <li>
              <h4> Autorizaci&oacute;n: </h4>
              <span>
                se refiere al consentimiento previo, expreso e informado del
                titular para llevar a cabo el tratamiento de datos personales.{" "}
              </span>
            </li>
            <li>
              <h4> Dato personal: </h4>
              <span>
                es cualquier información vinculada o que pueda asociarse a una o
                varias personas naturales.{" "}
              </span>
            </li>
            <li>
              <h4> Encargado del tratamiento: </h4>
              <span>
                persona natural o jurídica, pública o privada que por sí misma
                decida sobre la base de datos y/o el tratamiento de los datos.{" "}
              </span>
            </li>
            <li>
              <h4> Titular: </h4>
              <span>
                persona natural o jurídica cuyos datos personales sean objeto de
                tratamiento.{" "}
              </span>
            </li>
          </ul>
        </p>
      </div>
    </Modal>
  );
}
export default TermsAndConditions;
