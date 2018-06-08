var streamers = ["savjz","freecodecamp","Magic","OgamingSC2","cretetion","storbeck","habathcx","RobotCaleb","noobs2ninjas", "OverwatchLeague","littlesiha"];


//Add user to webpage
function appendUser(user, streamer, logo, type)
{
  let divClass;
  let backgroundType;
  let gameStatus;
  if(streamer.stream == null)
  {
    divClass = "streamerOfline";
    backgroundType = "images/gameuiOffline.png";
    gameStatus = "<p class="+"streamStatus"+">User: offline</p>";
  }
  else {
    divClass = "streamerOnline";
    backgroundType = "images/gameuiImage.png";
    gameStatus = "<p class="+"streamStatus"+">User: online</p>"+"<p class= "+"gamePlayed"+">"+"Playing "+streamer.stream.game+"</p>";
  }
  $(".container").append("<div class= "+divClass+">"+"<img src= "+logo+" class="+"profileLogo>"+"<img src= "+backgroundType+">"+"<a"+" href="+ "https://www.twitch.tv/"+user+ " class="+ "name"+">"+user+"</a>"+
  "<p class=type>"+"Type: "+type+"</p>"+gameStatus+"</div>");
}


//Access user api
function getUser(user)
{
  $.getJSON('https://wind-bow.glitch.me/twitch-api/users/'+user+'/?callback=?', function(userData)
{

  $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+user+'/?callback=?', function(streamData){
    appendUser(userData.name, streamData, userData.logo, userData.type);
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

/*showMenu()
hideMenu();
submitButton();
*/
});
