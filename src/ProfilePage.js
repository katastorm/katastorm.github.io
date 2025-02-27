import { GetPreview } from './ProjectFuncs.js';
import GetTimeline from './Timeline.js';
import './styles/FrontPage.scss';

import { useState, useEffect } from 'react';






function ProfilePage(props) {


  const exp1 = {
    post: "PROFESSEUR OPTION NSI (contractuel)",
    place: "LYCEE PUBLIQUE TALMA – BRUNOY",
    date: "2023-2024",
    desc: "Enseignement des sciences de l’informatique en classe de terminale",
    subdesc: [
      "Soutien des élèves en difficulté",
      "Préparation des élèves au BAC, contrôles continus..."]
  }

  const exp2 = {
    post: "DEVELOPPEUR MR/XR UNITY (alternance)",
    place: "R&D EDF LAB – SACLAY",
    date: "2020-2023",
    desc: "Conception de prototypes innovants pour les opérateurs de centrales nucléaires",
    subdesc: [
      "Veille puis conception de démonstrateurs des différentes technologies existantes, VR WEB, XR multi-utilisateur en réseau...",
      "Comptes-rendus et exposés durant les avancés des projets, brainstormings, déplacements sur le terrain..."]
  }

  const exp3 = {
    post: "DEVELOPPEUR UNITY AR (alternance) ",
    place: "MAREBIZ – CHAMPS SUR MARNE",
    date: "2019-2020",
    desc: "Participation à une solution AR/VR d’aide à la vente de produits volumineux",
    subdesc: [
      "Intégration de frameworks, optimisations, tests et développement pour tablettes et smartphones",
      "Développement d’une feature complète en autonomie"]
  }


  const boxShiftStyle = {
    marginLeft : `50px`,
    "margin-bottom": `50px`
  }

  const greyText = {
    "opacity": `0.5`,
  }
  const ulShift = {
    marginLeft : `30px`,
    
  }





function WriteWorkBundle(job) {


  const li = []

  job.subdesc.forEach(element => {
    li.push(<li>{element}</li>)
  });

  const content = (
    <div>
      <h3>{job.post}</h3>
      <div style={boxShiftStyle}>
      <p><a style={greyText}>{job.place}, {job.date}</a><br/>
        {job.desc}
          <ul style={ulShift}>
            {li}
          </ul>
        </p>
      </div>
    </div>
  )



  return [content]
}



return (

  <div>


    <h1>Julien Faidide</h1>


    <img src='/Jub_Biography/images/julienFace.jpg' alt='Photo de moi'></img>


    <h2>A propos de moi</h2>

    <p>Passionné d'informatique depuis mes 10 ans, j'ai acquis de grandes connaissances aux travers de mes études, mes projets persos et mes expériences professionelles. J'adore la nature, les vidéos en stop motion, la cueillette des champignons... Mais tout ça, ce n'est pas le plus important :
    </p>


    <h2>Diplômes</h2>


    <table><thead>
      <tr>
        <th>Niveau</th>
        <th>Filière</th>
        <th>Années</th>
        <th>Ecole</th>
        <th>Lieu</th>
      </tr>
    </thead>
      <tbody>
        <tr>
          <td>Diplôme d'ingénieur</td>
          <td>Informatique & Applications en alternance</td>
          <td>2020-2023</td>
          <td>ESIEE PARIS</td>
          <td>Champs sur Marne</td>
        </tr>
        <tr>
          <td>DUT informatique</td>
          <td>Informatique en alternance</td>
          <td>2018-2020</td>
          <td>UNIVERSITE GUSTAVE EIFFEL</td>
          <td>Champs sur Marne</td>
        </tr>
        <tr>
          <td>BAC S</td>
          <td>Sciences de l'ingénieur option Physique-chimie</td>
          <td>2018</td>
          <td>Lycée coubertin</td>
          <td>Meaux</td>
        </tr>
      </tbody>
    </table>



    <h2>Experiences pro</h2>

    {WriteWorkBundle(exp1)}
    {WriteWorkBundle(exp2)}
    {WriteWorkBundle(exp3)}







    <p>Je vous invite à <a href="/Jub_Biography/">constuler mes projets !</a></p>



  </div>

);
}


export default ProfilePage;

