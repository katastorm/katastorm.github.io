



import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/FrontPage.scss';
import './styles/FunkyTextButton.scss';
import ReactDOMServer from 'react-dom/server'
import { useState, useEffect } from 'react';
import { GetMonthName } from "./ProjectFuncs"
import rehypeRaw from "rehype-raw";
import { Link } from "react-router-dom";


const draw404Project = () => {
  return (
    <h1>{'404 project not found !\n'}</h1>
  )

}

const errorWhenLoadingProject = () => {
  return (
    "## Error when loading the project page."
  )

}


const initialState = {
  projectTitle: undefined,//L'image Titre ou le texte du titre
  projectNameLocker:"",
  projectTitleIsImage: false,//Est ce que c'est une image ?
  projectMd: "",//La page Md chargée
  historyDisplay: false,//afficher les infos supplémentaire des pages
}

const ProjectPage = (props) => {


  //Setter pour les infos du projet
  const [state, setState] = useState(initialState)



  function setProjectMd(md, project) {
    //Dupplication de l'ancien state
    const m = { ...state }
    m.projectMd = md

    if (project != undefined) {
      m.projectTitle = <h1>{project.name}</h1>
      m.projectTitleIsImage = false
      m.projectNameLocker = project.folderName
      
    }
    

   // console.log("Refresh project MD, sending :")
   // console.log(m)

    //Application
    setState(m)
    return m
  }

  function setHistoryState(historyEnabled) {
    const m = { ...state }
    m.historyDisplay = historyEnabled
    m.projectNameLocker = ""//Pour faire un force reload du markdown

   // console.log("Refresh history display = " + historyEnabled)    
    setState(m)
 

  }

  //Modifier le titre en haut de page du projet. On passe le state en paramètre car à cause du fucking asynchrone ont sait jamais quand State(usestate) sera update
  function setProjectImageTitle(stateGenerated, title) {
    //Dupplication de l'ancien state
    const m = { ...stateGenerated }

    if (!m.projectTitleIsImage) {
    //  console.log("Refresh image title")
      m.projectTitle = title
      m.projectTitleIsImage = true
      setState(m)
    }
  }


  //Liste des projets précédents/suivants, actualisé dynamiquement avec le choix du menu principal
  let nextPreviousProjects = undefined


  //faire une loadbar svp

  //console.log(props)

  if (props?.project == undefined) {
    //console.log("Classic error")
    return draw404Project()
  }



  const project = props.project
  const projectMdFilePath = project.mainMarkdownPath






  //Le use Effect n'est pas appelé au changement de routes, c'est chiant (seulement au reload de la page)
  /* 
    useEffect(() => {  }, [projectMd]);
  
  
  useEffect(() => {
      console.log("TEST")
      console.log(props)
      console.log(props.project)
  
      
  
      if(project != undefined)
        refreshMd(project);
      }, []);
  */


  async function refreshMd() {

    //const content = await (await fetch(folder + '/index.md')).text();


    //console.log("Reading project " + projectMdFilePath)


    if (projectMdFilePath == null) {

      setProjectMd(draw404Project, undefined)
      return
    }


    try {



      const fet = await fetch(projectMdFilePath);

      //console.log(fet)
      let content = await fet.text();



      if (content.includes("<!DOCTYPE html>")) {
        setProjectMd(errorWhenLoadingProject(), project)
        return
      }

      content = ChangeNextPreviousProjects(content) // Modification des balises <nextprojects>
      content = ShowHistoryMode(content, state.historyDisplay)//Supression / affichage des balises <history>





      const stateGenerated = setProjectMd(content, project)
      findProjectTitleCallBack(project, stateGenerated)//Déclenchera une update de la page si une image est trouvée

      //console.log("Md loaded!" + content)



    } catch (error) {
      console.error(error);
      setProjectMd(errorWhenLoadingProject(), project)
      return
    }
  }




  if (state.projectNameLocker.localeCompare(project.folderName) != 0) {
    console.log("Trying to load " + project.folderName)
    refreshMd();
  }






  function ChangeNextPreviousProjects(content) {
    //On cherche le projet suivant et précédent
    const projects = JSON.parse(window.sessionStorage.getItem("renderedProjects"));

    if (projects != null) {
      let index = projects.findIndex(findProj => findProj.folderName === project.folderName);

      nextPreviousProjects = "\n\n"
      if (index > 0)
        nextPreviousProjects += `> Projet suivant -  [${projects[index - 1].name}](/Jub_Biography/projects/${projects[index - 1].folderName})\n\n`
      if (index < projects.length - 1)
        nextPreviousProjects += `> Projet précédent - [${projects[index + 1].name}](/Jub_Biography/projects/${projects[index + 1].folderName})\n\n`

      // console.log("Generating previous & next projects " + index)
      //On applique les modifications du texte
      if (nextPreviousProjects != null)
        content = content.replace(/(<nextprojects>)[\s\S]*(<\/nextprojects>)/g, `</br>${nextPreviousProjects}`);


    } else
      console.log("Projects array is null !")

    return content
  }




  ///Afficher ou non le contenu des balises <history> en fonction du bool historyMode
  function ShowHistoryMode(content, historyMode) {

    //console.log(historyMode)

    if (historyMode) {
      content = content.replace(/(<history>)([\s\S]*?)(<\/history>)/g, "$1$3\n\n$2\n\n");
    } else {

      const photoRegex = /\!\[.*\].*\(.*\)/g
      content = content.replace(/(<history>)[\s\S]*?(<\/history>)/g, RemHistory);

      function RemHistory(text, capture1, capture2) {

        const photos = [...text.matchAll(photoRegex)];
        return capture1 + capture2 + photos.join("\n")
      }

    }

    //console.log(content)

    return content;
  }









  /*<p> Créer en {GetMonthName(project.creation.month)} {project.creation.year}</p>*/


  ///Chercher l'image ou le texte de titre du projet
  function findProjectTitleCallBack(project, stateGenerated) {

    //Pour le project title, si une image existe, on la prend, sinon on met juste le titre du projet

    let projectImage = `/Jub_Biography/Projects/${project.folderName}/./medias/title.png`

    const img = new Image();
    img.onload = () => setProjectImageTitle(stateGenerated,<img src={projectImage} alt="Project title" id="TitleImage" ></img>);
    img.onerror = () => console.log("No title image found");
    img.src = projectImage;



    /*
        const onFailed = () => {
          console.log("IMAGE NOT FOUND")
          return <h1>{project.name}</h1>
        }
    
        const onSuccess = () => {
          console.log("IMAGE FOUND")
          return <img src={projectImage} alt="Project title" id="TitleImage" ></img>
        }
    
        const img = new Image();
        img.src = projectImage;
    
        if (img.width == 0)
          return onFailed()
        else
          return onSuccess()
    */
  }




  return (
    <div>

      <div>
      {state.projectTitle}
      </div>

      <div className="ReactMarkdown">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          transformImageUri={uri =>
            uri.startsWith("http") ? uri : `${project.folderPath + "/"}${uri}`
          }
          
          components={{
            // @ts-ignore
            history: () => {
              return (
                <history><button className="funky_text_button" onClick={() => setHistoryState(!state.historyDisplay)}>{!state.historyDisplay && "Voir plus d'infos" || "Voir moins d'infos"}</button></history>
              );
            },
            imagegroup: (m) => {
              return (
                <div className="imagegroup"></div>
              );

            },
            //Changement de la navigation a travers les pages
            a: (props) => {
              console.log(props)
             return <Link to={props.href}>{props.children}</Link>
            },




          }}




        >{state.projectMd}</ReactMarkdown>

      </div>
    </div>
  )



}



export default ProjectPage


