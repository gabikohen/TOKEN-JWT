
const express = require("express");

const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    mensaje: "Node and JWT",
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    nombre: "Gabriel",
    email: "gab@gmail.com",
  };
jwt.sign({user},'secretkey',(err,token)=>{

    res.json({
        token
    })
})

});

app.post("/api/posts", verifytoken, (req , res) => {
  
    jwt.verify(req.token,'secretkey',{expiresIn: '30s'},(error , authData)=>{
if(error){
    res.sendStatus(403);
}else{
    res.json({
        mensaje:'Post fue creado',
        authData
    })
}
  })
});

/* Authorization: Bearer <token> */
function verifytoken(req,res,next) {

  const bearerHeader =  req.headers['authorization']

  if( typeof bearerHeader !== undefined){
    const bearerToken =  bearerHeader.split(" ")[1];
    req.token  = bearerToken;
        next()
}else{
    res.sendStatus(403)
}

}

app.listen(3030, () => {
  console.log("Web levantada puerto 3030");
});
