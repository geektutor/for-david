let modal=document.getElementById("myModal");
let idea=0;

let popModal=(ID)=>{
    let button= document.querySelector('.approve')
    button.textContent='approve'
    console.log(ID)
    idea=ID
    const loaderprofile2 = (id)=>{
        var requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': retrieveToken()
          },
          redirect: 'follow'
        };
        fetch(`https://david-rex.herokuapp.com/api/admin/tribute/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            loader(result)
         
          })
          .catch(error => console.log('error', error));
      
        const loader=(data) =>{
     
             console.log(data)
             let p = document.querySelector('.message')
             p.textContent=data. tribute_message
             modal.style.display = "block";
          }
          
      
    }
    loaderprofile2(ID)
   
       
    
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

}

let closeModal=()=>{
    modal.style.display = "none";
}

const loaderprofile = ()=>{
    var requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': retrieveToken()
      },
      redirect: 'follow'
    };
    fetch(`https://david-rex.herokuapp.com/api/admin/unapprovedtributes`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        loader(result)
     
      })
      .catch(error => console.log('error', error));
  
    const loader=(data) =>{
        if (data.length==0) {
            alert('No tribute to approve')
        }
        else{

            let tbody=document.querySelector('tbody')
        
            for (let i = 0; i < data.length; i++) {
    
               let tr = `
               <tr class="studrow row1">
                                    <td class="studname">${i+1}</td>
                                    <td class="studcontact">${data[i].name}</td>
                                    <td class="action"><button onclick="popModal('${data[i].id}')">View Details</button></td>
                               
               </tr>
               `
       
               tbody.innerHTML += tr
            
            }
       
            
          }

        }
 
      
      
  
}

loaderprofile()



// let approve=(id)=>{
//     console.log(id)
//     let button= document.querySelector('.approve')
//     const  raw = {
//         "approved":[id]
//     }
//       console.log(JSON.stringify(raw),)
//       var requestOptions = {
//         method: 'POST',
//         body: JSON.stringify(raw),
//         headers: {
//           'Content-Type': 'application/json',
//           'authorization': retrieveToken()

//         },
//         redirect: 'follow'
//         };
      
//       fetch(`https://david-rex.herokuapp.com//api/admin/approve`, requestOptions)
//         .then(response => response.json())
//         .then(result => {
//              console.log(result)
//              button.textContent = 'Added Successfully'
//             // myFunction()
//             closeModal()
//             loaderprofile()
          
//         })
//         .catch(error => console.log('error', error));

        
// }


let approval = document.querySelector('.approve')

approval.addEventListener('click',()=>{
        
        console.log(idea)
        let button= document.querySelector('.approve')
        const  raw = {
            "approved":[idea]
        }
          console.log(JSON.stringify(raw),)
          var requestOptions = {
            method: 'POST',
            body: JSON.stringify(raw),
            headers: {
              'Content-Type': 'application/json',
              'authorization': retrieveToken()
    
            },
            redirect: 'follow'
            };
          
          fetch(`https://david-rex.herokuapp.com/api/admin/approve`, requestOptions)
            .then(response => response.json())
            .then(result => {
                 console.log(result)
                 button.textContent = 'Added Successfully'
                myFunction()
              
              
            })
            .catch(error => console.log('error', error));
    
            const myFunction=()=> {
                setTimeout(()=>{
                  location.reload()
                }, 2000);
            }
    
})
