import { GetPreview } from './ProjectFuncs.js';
import GetTimeline from './Timeline.js';
import './styles/FrontPage.scss';

import { useState, useEffect } from 'react';






function FrontPage(props) {

  const [filters, setfilters] = useState([false, false])
  let renderedProjects = props.projects 

  console.log("START")



  
  //On creer la variable modifiable newFilters
  let newFilters = []
  filters.forEach(m => newFilters.push(m))



  let filter_fullPages = false
  let filter_equip = false







//Charger les filters depuis la session storage 
    const loadFilter = JSON.parse(sessionStorage.getItem("filters"))
   // console.log("LOAD:")
   // console.log(loadFilter)
    if (loadFilter != null) {
      for (let i = 0; i < newFilters.length; i++)         
        newFilters[i] = loadFilter[i];
    }

    const projDatas = (sessionStorage.getItem("renderedProjects"));
    if(projDatas != null){
        renderedProjects = (JSON.parse(projDatas));
       // console.log(projDatas)
    }
      
      UpdateVariables(newFilters)//Saving des cookies pour la premiere fois



//Appelé quand les filtres sont changés via les toggles
  function changeFilter(id, value) {
    console.log(value)
    console.log(id)


    newFilters[id] = value
    setfilters(newFilters)

    console.log("new filters : " + newFilters)
    //localStorage.setItem("filters", newFilters);
    sessionStorage.setItem("filters", JSON.stringify(newFilters));
    UpdateVariables(newFilters)    
  }

  function UpdateVariables(filterArray) {
    filter_fullPages = filterArray[0]
    filter_equip = filterArray[1]

    renderedProjects = GetModifiedProjectArray(props.projects)
    sessionStorage.setItem("renderedProjects", JSON.stringify(renderedProjects));
    console.log(renderedProjects)
  }


  
  let prevId = 0


  ///Obtenir la liste des projets, avec des filtres et modifications appliqués
  function GetModifiedProjectArray(projects){
let res = []

    projects.forEach(proj => {

          if (filter_fullPages && (!proj.hasMdFile || !proj.hasPreview))
            return

          if (filter_equip && (proj.membersCount <= 1))
            return


          res.push(proj)
    })

    return res
}
  




  return (

    <div>


      <h1>Projets Unity</h1>


      <p>Filtres</p>

      <form className='Filters'>


        <div>
          <span>Pages complètes seulement </span>
          <label className="switch" >
            <input type="checkbox"
              onChange={m => { }}
              onClick={w => {
                changeFilter(0, !filter_fullPages);
              }
              }

              checked={filter_fullPages}
            />
            <span className="slider round"></span>
          </label>
        </div>


        <div>
          <span>Projet en équipe </span>
          <label className="switch" >
            <input type="checkbox"
              onChange={m => { }}
              onClick={w => {
                changeFilter(1, !filter_equip);
              }
              }

              checked={filter_equip}
            />
            <span className="slider round"></span>
          </label>
        </div>

      </form>



      <h2>Timeline</h2>

            
            <GetTimeline renderedProjects={renderedProjects} key={"timelineKey0"}></GetTimeline>


      <h2>Unity Projects</h2>

      <div className="BoxArea">

        {renderedProjects.map(proj => <GetPreview project={proj} renderedProjects={props.renderedProjects} key={"preview" + prevId++}></GetPreview>)}

      </div>


    </div>

  );
}

export default FrontPage;

