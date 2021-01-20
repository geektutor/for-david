
  let tbody = document.querySelector('.flexDivtwo')
  console.log(tbody)
  const loaderprofile = (page)=>{

    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        
      },
      redirect: 'follow'
    };
    
    fetch(`https://david-rex.herokuapp.com/api/tributes`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
        let eachdata = data
       
        console.log(eachdata)

      
        
        for (let i = 0; i < 3; i++) {
           
           let eachTribute = `
               <div class="eachTribute">
                   <div class="message">
                      <p>${eachdata[i].tribute_message}</p>
                   </div>
                   <div class="line"></div>
                   <div class="name">
                       
                       <div class="namedate">
                        <p class="namer">${eachdata[i].name}</p>
                        <p class="date">Posted ${eachdata[i].date}</p>

                       </div>
                       
                   </div>
               </div>
           `
         
           tbody.innerHTML += eachTribute
        
        }
   
        
      }
      
  
}


loaderprofile()



