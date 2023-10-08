document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
  }
const searchInput = document.getElementById("search");
const searchButton = document.getElementById("searchButton");
const resultsContents = document.getElementById("results");
const apiUrl="https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";
let results ;
let error="";

function debounce(func, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
    };
}

function search() {
   const searchValue=searchInput.value;
    if(searchValue == "") {
        error='Search can not be empty .Please enter a search term  :)';
        errorMessage();
    }else {
    getResults(searchValue);
    }
   
}
async function getResults(searchValue){
    const request = await fetch(apiUrl+searchValue);
    results  = await request.json();
    results=results.query.search;
    if(results.length==0){
      error='No Search results :)';
      errorMessage();
    }
    else{
        displayResults();
    }}

function displayResults(){
    let data='';
    results.map((result)=>{
        const resultUrl=`https://en.wikipedia.org/?curid= ${result.pageid}`;
        data +=`  <div class="result p-2">
        <a href="${resultUrl}" target="_blank" class="fs-3 fw-bold">
            ${result.title}
        </a>
        <br />
        <a href="${resultUrl}"  target="_blank" class="fs-5 text-success">${resultUrl} </a>
        <p class="fs-5">${result.snippet}</p>
    </div>`;

    });
    resultsContents.innerHTML = data;

}

function errorMessage(){
   resultsContents.innerHTML = `<div class="alert alert-danger w-50 m-auto " > ${error}</div>`;
}

const debouncedSearch = debounce(search, 500);
searchButton.addEventListener('click', debouncedSearch);