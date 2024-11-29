const signbtn = document.querySelector('.signbtn')
const logbtn = document.querySelector('.logbtn')
const login = document.querySelector('.login')
const signup = document.querySelector('.signup')
const logpagebtn = document.querySelector('.logpage')
const signpagebtn = document.querySelector('.signpage')
const inp = document.querySelectorAll('.signup input')
const pop = document.querySelector('.pop')
const poptxt = document.querySelector('.pop p')
const passtxt = document.querySelector('.passtxt')
const loginp = document.querySelectorAll('.login input')
// console.log(inp);

logpagebtn.addEventListener('click' , (_e)=>{
    signup.classList.remove('index')
   login.style.animation= 'animelog 2s forwards '
   signup.style.animation= ''
})

signpagebtn.addEventListener('click' , (_e)=>{
      signup.style.animation= 'animesign 2s forwards'
      setTimeout(() => {
        signup.classList.add('index')
        login.style.animation=''
      }, 1000);   
})
//////////////////////////////////////



signbtn.addEventListener('click', () => {
    let name = inp[0].value
    let email = inp[1].value
    let password = inp[2].value
    /////////////check////////////////////

    const url = new URL('https://67496f79868020296630fc29.mockapi.io/user');
    url.searchParams.append('email', email);
    url.searchParams.append('password', password);
    url.searchParams.append('name', name);
    

    fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(tasks => {
        // mockapi returns only incomplete tasks
        console.log(tasks);
        if (tasks == undefined || tasks.length == 0) {
            /////////////////////////////////////////////////
            const sendData = {
                name, email, password 
            }

            fetch('https://67496f79868020296630fc29.mockapi.io/user', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(sendData)
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(task => {
                // do something with the new task
                pop.style.background='#53f944'
                poptxt.innerHTML='Your account has been successfully added'
                pop.style.top='5%'
                setTimeout(() => {
                    pop.style.top='-100%'
                }, 2000);
                inp.forEach((val) => {
                    val.value = null
                })
                inp[0].focus()
            }).catch(error => {
                // handle error
            })
            ////////////////////////////
        } else {
            pop.style.background='red'
            poptxt.innerHTML='user by this email already exist!'
            pop.style.top='5%'
            setTimeout(() => {
                pop.style.top='-100%'
            }, 2000);
        }

    }).catch(_error => {
        // handle error
    })

})

inp[2].addEventListener('input', () => {
    let temp = inp[2].value
    let flag = 0
   
    temp.search(/[0-9]/)>=0 && flag++
    temp.search(/[a-z]/)>=0 && flag++
    temp.search(/[A-Z]/)>=0 && flag++
    temp.search(/[@#$%^&&**()]/) >= 0 && flag++
    temp.length>=5 && flag++

    console.log(flag);

    switch(flag){
        case 0 : passtxt.innerHTML='Your password must be at least 5 characters.';  break;
        case 1 :  passtxt.innerHTML='Your password must include a number.'; break;
        case 2 : passtxt.innerHTML='Your password must include an uppercase letter.'; break;
        case 3 : passtxt.innerHTML='Your password must include a special character.'; break;
        case 4 : passtxt.innerHTML='Your password is okey'; break;
    }

})




logbtn.addEventListener('click', () => {
    const url1 = new URL ('https://67496f79868020296630fc29.mockapi.io/user');
    url1.searchParams.append('name', loginp[0].value);
    url1.searchParams.append('password', loginp[1].value);

    fetch(url1, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(tasks => {
        console.log(tasks);

        // mockapi returns only incomplete tasks
        if (tasks == undefined) {
            pop.style.background='red'
            poptxt.innerHTML='your account not found!'
            pop.style.top='5%'
            setTimeout(() => {
                pop.style.top='-100%'
            }, 2000);
        } else {
            pop.style.background='#53f944'
            poptxt.innerHTML='You are successfully logged in'
            pop.style.top='5%'
            setTimeout(() => {
                pop.style.top='-100%'
            }, 2000);
        }
    }).catch(error => {
        // handle error
    })
})

