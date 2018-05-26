/*
function getStreamerStatus(){
  var twitchRequest = new XMLHttpRequest();
  let url = 'https://api.twitch.tv/kraken/freecodecamp';
  let data;
  twitchRequest.open('GET', url);
  twitchRequest.setRequestHeader('Access-Control-Allow-Origin', '*');
  twitchRequest.onload = function(){

    console.log(twitchRequest.responseText);
}
  twitchRequest.send()
}

window.onload = function (){
  getStreamerStatus();
};
*/
//determine if streamer is online and appends user status
function status(userStream){
    if(userStream.stream == null)
    {
      return "<p class="+"streamStatus"+">User: offline</p>";
    }
    else{
      return "<p class="+"streamStatus"+">User: online</p>"+"<p class= "+"gamePlayed>"+"Playing "+userStream.stream.game+""+"</p>";
    }
}



//Add user to webpage
function appendUser(user, stream)
{
  userStatus = status(stream);
  $(".container").append("<div class= "+"streamer"+"><img src="+""+user.logo+""+" class="+"profileLogo"+"><img src="+"gameuiImage.png"+" class= "+"streamerBackground"+">"+"<a"+" href="+ "https://www.twitch.tv/"+user.name+ " class="+ "name"+">"+user.name+"</a>"+
  "<p class=type>"+"Type:"+user.type+"</p>"+userStatus+"</div>");
}


//Access user api
function getUser(user)
{
  $.getJSON('https://wind-bow.glitch.me/twitch-api/users/'+user+'/?callback=?', function(userData)
{

  $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/'+user+'/?callback=?', function(streamData){
    appendUser(userData, streamData);
    console.log(userData);
    console.log(streamData);
    console.log(streamData.stream.game);
  });
});
}

$(document).ready(function(){
  getUser("savjz");
  getUser("freecodecamp");
  getUser("Magic");
});
