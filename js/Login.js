username = document.querySelector(".username");
password = document.querySelector(".password");
btn= document.querySelector(".btn");
btn.addEventListener("click", function(e){
    e.preventDefault();
    console.log(username.value);
    console.log(password.value);
})

