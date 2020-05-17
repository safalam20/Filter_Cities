const endPoint = "https://gist.githubusercontent.com"+
      "/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities=[];

      fetch(endPoint)
      .then(data=>data.json())
      .then(result=>cities.push(...result));

     function findOurMatches(wordToMatch,cities){
         if(wordToMatch==""){
             return [];
         }
        return cities.filter(place=>{
            const regex=new RegExp(wordToMatch,'gi');
            return place.city.match(regex) || place.state.match(regex);
        });
     }
     function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
     function displayValue(){
         const filtered=findOurMatches(this.value,cities);
         resultList.innerHTML='';
         
         const regex=new RegExp(this.value,'gi');

         for(let searched of filtered){
             const highlightedCity=searched.city.replace(regex,`<span class="bg-warning">${this.value}</span>`);
             const highlightedState=searched.state.replace(regex,`<span class="bg-warning">${this.value}</span>`);
             const row=document.createElement('li');
             row.className='list-group-item';
             row.innerHTML=`<span class="name">${highlightedCity}, ${highlightedState}</span>
                            <span class="population float-right">${numberWithCommas(searched.population)}</span>`;
             resultList.append(row);
            
         } 
     }


     const searchInput=document.querySelector('.search-input');
     const resultList=document.querySelector('.results');

     searchInput.addEventListener('keyup',displayValue);
     searchInput.addEventListener('change',displayValue);