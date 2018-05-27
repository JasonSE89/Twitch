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
function divClass(userStream)
{
  if(userStream.stream == null)
  {
    return "<div class= "+"streamerOfline"+">";
  }
  else{
    return "<div class= "+"streamerOnline"+">";
  }
}
//determine div class
function backgroundImage(userStream)
{
  if(userStream.stream == null)
  {
    return "<div class= "+"streamerOfline"+">";
  }
  else{
    return "<div class= "+"streamerOnline"+">";
  }
}

function determineImage(userStream){
  if(userStream.stream == null)
  {
    return "<img src= "+"gameuiOffline.png"+">";
  }
  else{
    return "<img src= "+"gameuiImage.png"+">";
  }
}

//Add user to webpage
function appendUser(user, stream)
{
  userStatus = gameStatus(stream);
  streamerClass = divClass(stream);
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
function getText(){
  $("#submit").click(function(){
    if(checkStreamerList($("#userId").val())==false)
    {
    getUser($("#userId").val());
    streamers.push($("#userId").val());
    console.log("user successfully added");
    }
    else{
      console.log("streamer already added exist");
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
getText();


});
