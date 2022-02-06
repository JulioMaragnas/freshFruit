import React, { useState, useEffect } from "react";
import { getGoalsByUser } from "../../requestUser";
import "./Goals.css";
import { Progress } from "antd";

function Goals(props) {
  const [goalsUser, setGoalsUser] = useState([]);

  useEffect(() => {
    const islogged = JSON.parse(sessionStorage.getItem("userlogged")) || false;
    async function init() {
      const res = await getGoalsByUser();
      setGoalsUser(res);
    }
    islogged && init();
  }, []);

  return (
    <div className="page">
      {goalsUser.length && <div className="timeline">
        {
          goalsUser
          .sort((a,b)=> b.year - a.year)
          .map(x =>(
            <div className="timeline__group">
              <span className="timeline__year time" aria-hidden="true">
                {x.year}
              </span>
              <div className="timeline__cards">
                {
                  x.months.map(m =>(
                    <div className="timeline__card card">
                      <header className="card__header">
                        <time className="time" dateTime="2008-02-02">
                          <span className="time__month">{m.name}</span>
                        </time>
                      </header>
                      {
                        m.goals.map(g => (
                          <div className="card__content">
                            <p> {g.name} </p>
                            <Progress percent={g.percentage} size="small" />
                          </div>
                        ))
                      }
                    </div>
                  ))
                }
              </div>
            </div>    
          ))
        }
      </div>}
    </div>
  );
}

export default Goals;


// <div className="timeline__group">
//           <span className="timeline__year time" aria-hidden="true">
//             2022
//           </span>
//           <div className="timeline__cards">
//             <div className="timeline__card card">
//               <header className="card__header">
//                 <time className="time" dateTime="2008-02-02">
//                   <span className="time__month">Febrero</span>
//                 </time>
//               </header>
//               <div className="card__content">
//                 <p> Peras y manzanas </p>
//                 <Progress percent={1} size="small" />
//               </div>
//               <div className="card__content">
//                 <p> Cosecha de kiwi </p>
//                 <Progress percent={78} size="small" />
//               </div>
//             </div>
//             <div className="timeline__card card">
//               <header className="card__header">
//                 <time className="time" dateTime="2008-02-02">
//                   <span className="time__month">Enero</span>
//                 </time>
//               </header>
//               <div className="card__content">
//                 <p> Lluvia de fresas </p>
//                 <Progress percent={30} size="small" />
//               </div>
//               <div className="card__content">
//                 <p> Cosecha de kiwi </p>
//                 <Progress percent={78} size="small" />
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="timeline__group">
//           <span className="timeline__year time" aria-hidden="true">
//             2021
//           </span>
//           <div className="timeline__cards">
//             <div className="timeline__card card">
//               <header className="card__header">
//                 <time className="time" dateTime="2008-09-01">
//                   <span className="time__day"></span>
//                   <span className="time__month">Diciembre</span>
//                 </time>
//               </header>
//               <div className="card__content">
//                 <p> Fiesta de mango tommy </p>
//                 <Progress percent={100} size="small" />
//               </div>
//             </div>
//             <div className="timeline__card card">
//               <header className="card__header">
//                 <time className="time" dateTime="2008-09-01">
//                   <span className="time__day"></span>
//                   <span className="time__month">Noviembre</span>
//                 </time>
//               </header>
//               <div className="card__content">
//                 <p> Noviembre de la pi&ntilde;a </p>
//                 <Progress percent={90} size="small" status="exception" />
//               </div>
//             </div>
//           </div>
//         </div>
