const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",function(req,res){

  res.sendFile(__dirname +"/signup.html")
});
app.post("/",function(req,res){
  const firstName=req.body.fname;
  const LastName=req.body.lname;
  const EM=req.body.ename;
  const data={
    members:[
      {
        email_address:EM,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:LastName
        }
      }
    ]


  };
  const jsonData=JSON.stringify(data);
  const url="https://us6.api.mailchimp.com/3.0/lists/4271627d90";
  const options={
    method:"POST",
    auth:"danish:03c23917e0be975b9c575b7f5c47ab55-us6"

  }
const request= https.request(url,options,function(response)
{
  if(response.statusCode===200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();
});
app.post("/failure", function(req,res){
  res.redirect("/");
})






app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
//audience id:4271627d90
//03c23917e0be975b9c575b7f5c47ab55-us6
