
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/HeaderNavStyle.scss';
import { useNavigate } from "react-router-dom";


const DrawHeaderNav = () => {

    const navigate = useNavigate();

    function handleClick(path) {
        navigate(path);
      }
    


    return (




  <nav className="Body-Position">
  <div className="logo">

<a > Jub Portfolio </a >   


  </div>
  <ul className="nav-links">
      <li><a onClick={() => handleClick("/Jub_Biography/profile")}>Profil</a></li>
      <li><a onClick={() => handleClick("/Jub_Biography/home")}>Projets Unity</a></li>

  
</ul>


</nav>

    )


}



const DrawFooterNav = () => {

    return (

       

<footer className="Body-Position">

<p>2025</p>   


</footer>


    );
}



export {DrawHeaderNav, DrawFooterNav}






