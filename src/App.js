

import FrontPage from "./FrontPageUnity";
import ProjectPage from "./ProjectPage";
import ProfilePage from "./ProfilePage";
import PageNotFound from "./404";
import { DrawHeaderNav, DrawFooterNav } from './NavHeader.js';
import { useState, useEffect } from 'react';
import folders from "./projectList.json"
import { prettyFormat } from "@testing-library/react";
import ParralaxBackground from './jquerry/ParralaxBackground.js';
import { HashRouter, BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";







////Gere la liste des projets
const App = () => {
  



    function RepairHashtagLink() {

        console.log("broken link")
        //console.log(useParams())


        return <h1>Broken shit</h1>

        //  return (<Navigate to="/Jub_Biography/home" replace />)

    }






    function PreventHashtag() {
        let path = window.location.href
        // console.log(path)

        /*
          Jub_Biography/#projects/#Room505 => Jub_Biography/projects/Unity/Room505
        */

        if (path.includes("#")) {
            path = path.replace(origin, "").replaceAll("#", "")
            // console.log(path)
            return <Navigate to={path} replace />
        }
        return <></>
    }



    return (

        <div>
            <BrowserRouter >


                <div className="App">
                    <header className="App-header">



                        <div className="Body Body-Position">



                            <Routes>


                                <Route path="/*" element={<Navigate to="/Jub_Biography/home" replace />} /> {/* navigate to default route if no url matched */}





                            </Routes>

                            {/*Super important, permet de rectifier l'url de la page de l'ancien path avec des "#" vers des "/" */}
                            <PreventHashtag />






                        </div>

                    </header>
                </div>
            </BrowserRouter>




        </div>
    )
};

export default App;