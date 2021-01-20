
let form = document.querySelector('form')


form.addEventListener('submit',(e)=>{
    e.preventDefault()  
  
    let button = document.querySelector('.tri')
    button.textContent = 'Addind ...'
    button.disabled = true;
    const loaderprofile = ()=>{
  
      const  raw = {
        "name": form.firstName.value,
        "tribute_message" : form.message.value
    }
      console.log(JSON.stringify(raw),)
      var requestOptions = {
        method: 'POST',
        body: JSON.stringify(raw),
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow'
        };
      
      fetch(`https://david-rex.herokuapp.com/api/submittribute`, requestOptions)
        .then(response => response.json())
        .then(result => {
             console.log(result)
             button.textContent = 'Added Successfully'
            myFunction()
          
        })
        .catch(error => console.log('error', error));

        }
    loaderprofile()
    const myFunction=()=> {
      setTimeout(()=>{
        location.reload()
      }, 2000);
  }

})
