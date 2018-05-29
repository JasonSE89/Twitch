var streamers = ["savjz","freecodecamp","Magic","OgamingSC2","cretetion","storbeck","habathcx","RobotCaleb","noobs2ninjas"];

function gameStatus(userStream){
    if(userStream.stream == null)
    {
      return "<p class="+"streamStatus"+">User: offline</p>";
    }
    else{
      return "<p class="+"streamStatus"+">User: online</p>"+"<p class= "+"gamePlayed>"+"Playing "+userStream.stream.game+""+"</p>";
    }
}

//determines which div class should be used within the container
function divClass(userStream, name)
{
  if(userStream.stream == null)
  {
    return "<div class= "+"streamerOfline"+" id= "+name+">";
  }
  else{
    return "<div class= "+"streamerOnline"+" id= "+name+">";
  }
}


function determineImage(userStream){
  if(userStream.stream == null)
  {
    return "<img src= "+"images/gameuiOffline.png"+">";
  }
  else{
    return "<img src= "+"images/gameuiImage.png"+">";
  }
}

//Add user to webpage
function appendUser(user, stream)
{
  userStatus = gameStatus(stream);
  streamerClass = divClass(stream, user.name);
  backgroundImage = determineImage(stream);
  $(".container").append(streamerClass+"<img src="+""+user.logo+""+" class="+"profileLogo>"+backgroundImage+"<a"+" href="+ "https://www.twitch.tv/"+user.name+ " class="+ "name"+">"+user.name+"</a>"+
  "<p class=type>"+"Type:"+user.type+"</p>"+userStatus+"</div>");
}


//Access user api
function getUser(user)
{
  $.getJSON('https://wind-bow.glitch.me/twitch-api/users/'+user+'/?callback=?', function(userData)
{

  $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+user+'/?callback=?', function(streamData){
    appendUser(userData, streamData);
  });
});
}


function showMenu(){

  $("#twitchLogo").click(function(){
    $(".modifyStreamers").css("visibility","visible");
  });
}

function hideMenu(){
  $("#close").click(function(){
    $(".modifyStreamers").css("visibility", "hidden");
  });
}

//checks to see if Streamer is already within the list
function checkStreamerList(id){
    for(var i=0; i<streamers.length; i++)
    {
      if(id == streamers[i])
      {
        return true;
      }
    }
    return false;
}

//adds streamer
function addStreamer(){
    if(checkStreamerList($("#userId").val())==false)
    {
    getUser($("#userId").val());
    streamers.push($("#userId").val());
    console.log(streamers);
    console.log("user successfully added");
    }
    else{
      console.log("streamer already added to list");
    }
}

//removes streamer
function removeStreamer()
{
   var user = $("#userId").val();
   var mainDocument = document.getElementById(thisthing);
   oliver.remove();
   streamers.splice(streamers.indexOf($("#userId").val()), 1);
   console.log(streamers);
}

//submit element
function submitButton(){
  $("#submit").click(function(){
  if($('input[name="user"]:checked').val()=="Add")
  {
    addStreamer();
  }
  else{
    removeStreamer();
  }
});
}

$(document).ready(function(){
for(var i=0; i<streamers.length; i++)
{
  getUser(streamers[i]);
}

showMenu();
hideMenu();
submitButton();
});
