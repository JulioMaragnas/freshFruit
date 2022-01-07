import React from "react";
import './Goals.css'

function Goals(props) {
  return (
    <div className="page">
      <div className="timeline">
        <div className="timeline__group">
          <span className="timeline__year time" aria-hidden="true">
            2008
          </span>
          <div className="timeline__cards">
            <div className="timeline__card card">
              <header className="card__header">
                <time className="time" dateTime="2008-02-02">
                  <span className="time__day">2</span>
                  <span className="time__month">Feb</span>
                </time>
              </header>
              <div className="card__content">
                <p>
                  Attends the Philadelphia Museum
                </p>
              </div>
            </div>
            <div className="timeline__card card">
              <header className="card__header">
                <time className="time" dateTime="2008-09-01">
                  <span className="time__day">1</span>
                  <span className="time__month">Sept</span>
                </time>
              </header>
              <div className="card__content">
                <p>
                  Started from University of Pennsylvania.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline__group">
          <span className="timeline__year time" aria-hidden="true">
            2014
          </span>
          <div className="timeline__cards">
            <div className="timeline__card card">
              <header className="card__header">
                <time className="time" dateTime="2008-07-14">
                  <span className="time__day">14</span>
                  <span className="time__month">Jul</span>
                </time>
              </header>
              <div className="card__content">
                <p>
                  Travels to France, Italy, Spain, and Peru. 
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="timeline__group">
          <span className="timeline__year time" aria-hidden="true">
            2016
          </span>
          <div className="timeline__cards">
            <div className="timeline__card card">
              <header className="card__header">
                <time className="time" dateTime="2008-08-18">
                  <span className="time__day">28</span>
                  <span className="time__month">Aug</span>
                </time>
              </header>
              <div className="card__content">
                <p>
                  Upon moving to Brooklyn that summer, I began photographing
                  weddings in Chicago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Goals
