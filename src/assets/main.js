const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCAolsolgHiURrQBuZ4qe0lg&part=snippet%2Cid&order=date&maxResults=9';

const mainVideosList = document.getElementById("mainVideosList"); //referencia a el html donde se llenará la data

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd65a447b6bmsh24df9427b1fd332p1340e7jsnc645fdb67a34',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

async function fetchData(urlApi) {
    const response = await fetch(urlApi,options);
    const data = await response.json();
    return data;
}

(async () => { //funcion IIFE: aquella que se ejecuta sin necesidad de invocarse al cargarse la página
    try {
        const videos = await fetchData(API); //recibe la lista de videos del url
        let view =
        `
        ${videos.items.map(video => //las variables siguientes dependen de la estructura del resultado del test de respuesta de la API, en este caso de Youtube
            `
            <a href="https://youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <div class="main-videos-list-card">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}">
                    <h2>${video.snippet.title}</h2>
                </div>
            </a>
            `
        ).join("")}
        `;
        mainVideosList.innerHTML=view;
    } catch (error) {
        console.log(error);
    }
})()