
const login = document.querySelector('form');
let email = document.querySelector('#email');
let pwd = document.querySelector('#pwd');
let suc = document.querySelector('.success')
const myFunction=()=> {
  setTimeout(()=>{
    location.reload()
  }, 3000);
}
login.addEventListener('submit', (e)=>{

    e.preventDefault()
    document.getElementById('subit').disabled = true;

    document.getElementById('subit').value='Loading...'
   
    const  raw = {
        "username": email.value,
        "password" : pwd.value  
    }
    console.log(JSON.stringify(raw))
    var toks = window.localStorage.getItem("token")
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(raw),
      headers: {
        'Content-Type': 'application/json',
        'authorization':toks,
    },
      redirect: 'follow'
    };
    
    fetch("https://david-rex.herokuapp.com/api/admin/login", requestOptions)
        .then(response => {
         console.log(response) 
         return response.json()
        })
        .then((data) => {
          console.log(data)
           console.log(data.message=='authorized')
           if (data.message=='authorized') {
            suc.style.color='green'
            suc.style.textAlign = 'center'
            suc.style.margin="10px 0"
            suc.textContent= 'Authentication Successful'
            window.localStorage.setItem("token",data.token);
            document.getElementById('subit').disabled = false;
            window.location.href="tributes.html"
           }
           else{
            suc.style.color='red'
            suc.style.textAlign = 'center'
            suc.style.margin="10px 0"
            suc.textContent= data.message
            myFunction()
            document.getElementById('subit').disabled = false;
           }
           
          
        //   else{
        //     suc.style.color='red'
        //     suc.textContent=data.response + " " + 'try again'
        //     document.getElementById('subit').disabled = false;

        //     document.getElementById('subit').textContent='Next'
            
        //   }

          
          
        } )
        .catch(error => console.log('error', error));
  

})






