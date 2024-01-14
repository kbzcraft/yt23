import React, { useEffect, useState } from 'react';
import './styles/_main.scss'

function App() {
  // let title = "this is a title";
  // let vidUrl = "";
  // let audioUrl = "";
const surl = new URL(document.location);
const sharedDes = surl.searchParams.get("description");
const sharedText = surl.searchParams.get("link");
	
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '2fa0c4dd3cmshbfe07177af4568ep11e942jsn779ffd04635d',
		'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
	}
};

  const getYtData = (event) =>{
    event.preventDefault()
    const contextDiv = document.querySelector(".context")
    const titleDiv = contextDiv.querySelector('.title')
    const audioDownloadBtn = contextDiv.querySelector('#audio-download-btn')
    const thumbnailContainer = document.querySelector(".thumbnail-container")
    const thumbnail = thumbnailContainer.firstChild
    const availabilityDiv = document.querySelector(".loader--checking")
    // const vidD
    const enteredVidUrl = event.target.elements[0].value
    const vidId = getYoutubeVideoId(enteredVidUrl)
    const imgUrl = `https://img.youtube.com/vi/${vidId}/maxresdefault.jpg`
    thumbnail.setAttribute('src', imgUrl)

    availabilityDiv.classList.remove("hidden")
    // Call the async function
    const url = `https://youtube-mp3-download1.p.rapidapi.com/dl?id=${vidId}`;
    // fetchData(url, options);
    fetch(url, options)
      .then(res => res.json())
      .then(data =>{
        console.log(data)
        if(data.status == "ok"){
          availabilityDiv.classList.add('hidden')
          titleDiv.textContent = data.title
          audioDownloadBtn.setAttribute("href", data.link)
          event.target.classList.add("hidden")
          event.target.firstChild.classList.add("hidden")
          event.target.lastChild.classList.add("hidden")
          thumbnailContainer.classList.remove("hidden")
          contextDiv.classList.remove("hidden")
          audioDownloadBtn.textContent = "Download"
        } else{
          availabilityDiv.classList.add('hidden')
          titleDiv.textContent = "Invalid Video Url , please Try again"
          contextDiv.classList.remove("hidden")
          audioDownloadBtn.setAttribute("href", "/")
          audioDownloadBtn.textContent = "Refresh"
        }
      })

  }
  const getYoutubeVideoId = (url) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=)|youtu\.be\/)([^&?\/]+)/;
    const match = url.match(regex);
    
    if (match && match[1]) {
      return match[1];
    }
    
    return null;
  }
  
  return (
    <>
      <main>
        <div className="header container">
          <h1>YT23 | Convert Youtube Videos in2 MP3</h1>
          <form onSubmit={getYtData}>
            <input type='url' placeholder='enter your url here: ' required/>
            <button className='convert' >Convert</button>
          </form>
          <div className="thumbnail-container hidden">
            <img src="" alt="Thumbnail" />
            <iframe className='hidden' src="https://www.youtube.com/embed/EiNiSFIPIQE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
        <div className="context hidden">
          <h1 className="title"></h1>
            <a id='audio-download-btn' href="">Download</a>
        </div>
      </main>
      <div class="loader loader--checking hidden">
        <div className="box"></div>
        <p>Checking Availability</p>
      </div>
    </>
  )
}

export default App
