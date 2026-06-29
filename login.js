<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Login</title>

<link rel="stylesheet" href="login.css">
</head>

<body>

<div class="login-box">

<h2>VIP Number Bazar</h2>

<input
type="text"
id="username"
placeholder="Username">

<input
type="password"
id="password"
placeholder="Password">

<button id="loginBtn">
Login
</button>

<p id="msg"></p>

</div>

<script src="login.js"></script>

</body>
</html>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Poppins,sans-serif;
}

body{
display:flex;
justify-content:center;
align-items:center;
height:100vh;
background:#f5f7fb;
}

.login-box{
width:350px;
background:#fff;
padding:30px;
border-radius:15px;
box-shadow:0 10px 25px rgba(0,0,0,.15);
text-align:center;
}

.login-box h2{
margin-bottom:20px;
color:#ff9800;
}

.login-box input{
width:100%;
padding:14px;
margin:10px 0;
border:1px solid #ccc;
border-radius:8px;
font-size:16px;
}

.login-box button{
width:100%;
padding:14px;
background:#ff9800;
color:#fff;
border:none;
border-radius:8px;
font-size:17px;
font-weight:bold;
cursor:pointer;
}

.login-box button:hover{
background:#111;
}

#msg{
margin-top:15px;
color:red;
font-weight:bold;
}
