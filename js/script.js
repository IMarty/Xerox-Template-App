$(function(){
  // Create a native looking button
  $("h1").xrxbutton();

  //Handle the click event as usual in jQuery
  $("h1").on("click", function(){
    alert("Bye");
    //Use function from the helper.js
    exit();
  })
})
