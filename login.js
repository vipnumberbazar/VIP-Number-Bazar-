/* ===========================================
   VIP Number Bazar V4 Professional
   login.css
=========================================== */

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}

body{

    font-family:'Poppins',sans-serif;

    background:#0b0b0b;

    min-height:100vh;

    display:flex;

    justify-content:center;

    align-items:center;

    padding:20px;

    color:#fff;

}

.login-container{

    width:100%;

    display:flex;

    justify-content:center;

    align-items:center;

}

.login-box{

    width:100%;

    max-width:430px;

    background:#151515;

    border:1px solid rgba(212,175,55,.25);

    border-radius:20px;

    padding:35px;

    box-shadow:0 15px 40px rgba(0,0,0,.45);

}

.login-box h1{

    color:#d4af37;

    text-align:center;

    font-size:32px;

    margin-bottom:10px;

}

.login-box h2{

    text-align:center;

    margin-bottom:10px;

    font-size:22px;

}

.subtitle{

    text-align:center;

    color:#bdbdbd;

    margin-bottom:30px;

    font-size:14px;

}

.input-group{

    margin-bottom:20px;

}

.input-group label{

    display:block;

    margin-bottom:8px;

    font-size:14px;

    color:#d4af37;

}

.input-group input{

    width:100%;

    padding:14px 16px;

    background:#0f0f0f;

    color:#fff;

    border:1px solid #333;

    border-radius:10px;

    outline:none;

    transition:.3s;

}

.input-group input:focus{

    border-color:#d4af37;

}

.login-btn{

    width:100%;

    padding:15px;

    border:none;

    border-radius:10px;

    background:#d4af37;

    color:#000;

    font-size:16px;

    font-weight:700;

    cursor:pointer;

    transition:.3s;

}

.login-btn:hover{

    transform:translateY(-2px);

    box-shadow:0 10px 25px rgba(212,175,55,.35);

}

#loginMessage{

    margin-top:20px;

    text-align:center;

    font-size:14px;

    color:#ff6b6b;

    min-height:20px;

}

@media(max-width:480px){

    .login-box{

        padding:25px;

    }

    .login-box h1{

        font-size:28px;

    }

}
