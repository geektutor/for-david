let select = document.querySelector('.selector')
let page = 1
let limit = 2
select.addEventListener('change',()=>{
  console.log(select.value)
  page = select.value
  loaderprofile(page)
})

let fillselect = (page)=>{
  
  select.innerHTML = ''
  for (let i = 0; i <= page; i++) {
    const opt = document.createElement( "option" );
    opt.textContent = i;
    opt.value = i;
    select.append(opt)
    
  }

}

  let tbody = document.querySelector('tbody')
  const loaderprofile = (page)=>{

    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': retrieveToken()
      },
      redirect: 'follow'
    };
    
    fetch(`https://kuizuapp.herokuapp.com/v1/questions/page/${page}`, requestOptions)
      .then(response => response.json())
      .then(result => {
      
        loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
 
      fillselect(data.data.noofPages)
      tbody.innerHTML = "";
        let eachdata2 = data.data.questions
        console.log(eachdata2)
        let eachdata = eachdata2.filter((item)=>{
          return !item.is_approved
        })
        console.log(eachdata)

      
        
        for (let i = 0; i < eachdata.length; i++) {

           let tr = `
           <tr class="studrow row1">
                <td class="studname">${i+1}</td>
                <td class="studcontact">${eachdata[i].question}</td>
                <td class="studmail">${eachdata[i].anime_name}</td>
                <td class="action"> <a href=eachquestion.html?questionid=${eachdata[i]._id}><button>View Details</button></a> </td>
           
           </tr>
           `
   
           tbody.innerHTML += tr
        
        }
   
        
      }
      
  
}


loaderprofile(page)










