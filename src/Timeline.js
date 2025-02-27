
import './styles/Timeline.scss';
import React, { useState } from 'react'

import { ProjectPopup } from "./ProjectFuncs.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useNavigate } from "react-router-dom";





const GetTimeline = (props) => {

  
  //const [location, setLocation] = useLocation();
  const [positionOffset, setPosition] = useState(0);

  const startYear = 2014;
  //const endYear = 2024;
  const endYear = new Date().getFullYear() + 2;

  const yearCount = endYear - startYear;

  const rendSize = "calc(100% / " + (yearCount) + ")";

  const navigate = useNavigate();


  ///////////////////////////Le css

  
  const timeline__item = {
    position: "relative",
    display: "inline-block",
    width: rendSize,
    marginLeft : `${positionOffset}px`,
    counterIncrement : "year -2",
  };


  

  const timeline__counter = {
    "counterReset": "year " + (endYear),
    marginLeft: `${positionOffset}px`
  }

  
  /*
  const timeline__item__bar = {
    width:"200px",
    height:"100px",
    background:"blue"
  };*/



  /////////////////////////

  let yearMonthPlacement = {}

  let projectList = props.renderedProjects
  let pointerDraw = []


  console.log(projectList)


  
  //Dessiner un pin
  
    //const DrawAPin = (project, hasPreview) => {

       /*
      {/*Petit rectangle d'indication de la durée du projet */
     /*
      return(

        
      )
    
  }
*/

let pixelSizeOfAYear = `calc(100% / ${yearCount})`
let pixelSizeOfAMonth = `calc(100% / ${yearCount * 12})`


    //On construit la liste des pins sur la timeline

  for (let i = 0; i < projectList.length; i++) {



    let p = projectList[i]

    if (p.ending.year == undefined || p.ending.month == undefined) continue

    let yearList = yearMonthPlacement[p.ending.year]

    let projectCssDuration = Math.max(1/12, (p.ending.year + p.ending.month/12 ) - (p.creation.year +  p.creation.month / 12))

    if (yearList == undefined) {
      yearMonthPlacement[p.ending.year] = {}
      yearList = yearMonthPlacement[p.ending.year]
    }

    if (yearList[p.ending.month] == undefined) {
      yearList[p.ending.month] = 0
    } else
      yearList[p.ending.month]++


    let offset = yearList[p.ending.month] / 2

    //1 - pour inverser (gauche = decembre)
    let monthLocalPosition = 1.0 - (offset + parseInt(p.ending.month)) / 13
    // Conversion en CSS
    let monthLocalPlacement = `calc( ${monthLocalPosition} * ${rendSize} - 15px)`

    //Placement au niveau de l'année
    let yearPlacementPercent = ((endYear - parseInt(p.ending.year) - 2) / yearCount) * 100 + "%"
    let totalCssPosition = `calc( ${monthLocalPlacement} + ${yearPlacementPercent})`




    pointerDraw.push(

<div>
      <OverlayTrigger trigger={["hover", "focus"]} key={"timePointTrigger" + i} placement="bottom" overlay={ProjectPopup(p, p.hasPreview)} offset={[0,45]}>

        {/*Pin de la timeline*/}
        <img src={require("./frontPage/timelinePin.gif")} className="timelinePoint"
          style={{
            // left:((endYear - p.creation.year)*100/yearCount)+"%"
            left: totalCssPosition,
            filter:
              `brightness(${(1 + (Math.cos(monthLocalPosition * 20000) * 0.5))})
               hue-rotate(${Math.cos(monthLocalPosition * 999999) * 20}deg) 
               drop-shadow(-2px 0px 0px    rgba(0, 0, 0, 1)) 
               drop-shadow(2px 0px 0px    rgba(0, 0, 0, 1))`,

            // bottom:Math.abs(Math.cos(monthPosition*1000))*20,
            //filter: "hue-rotate(" + monthPosition * 360 * 10 + "deg) brightness(2000%) saturate(200%)"
          }}
          key= {"timePoint" + i}
          onClick={() => navigate("/Jub_Biography/projects/" + p.folderName)}
        />

      </OverlayTrigger>

<div className='timelinePoint_bar'
style = {{
    left: totalCssPosition,
    transform: "translate(10px, 2px)",
    width: `calc(${pixelSizeOfAYear} * ${projectCssDuration})`,
   
}}
></div>


</div>
    );


  }








  let timelineDraw = []

  for (let pas = 0; pas < yearCount; pas++) {
    timelineDraw.push(<li className="base-timeline__item" key={"timeFrag" + pas} style={timeline__item}>
    </li>)
  }


  return (
    //<button onClick={() => setPosition(positionOffset+20) }>Next</button>

    <div>


      <ul className="base-timeline" style={timeline__counter}>

        {pointerDraw}

        {timelineDraw}


      </ul>

    </div>

  );
}




export default GetTimeline;
