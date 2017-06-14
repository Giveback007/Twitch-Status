function toggleNav() {
 document.getElementById("nav-bar").classList.toggle("open");
 document.getElementById("nav-open-div").classList.toggle("open");
}

function cardGen(data, chnl, onOff) { 
 // set var for edge cases
 var onOffClass = 'card-online';
 var status = data.status;
 if (data.game === null || data.game === undefined) {data.game = '<br>'} 
 if (data.logo === undefined) {data.logo = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/404ghost.gif'} 
 if (data.logo === null) {data.logo = 'https://static-cdn.jtvnw.net/jtv_user_pictures/twitches-profile_image-7a8ad177b044a464-300x300.png'}
 if (data.display_name === null || data.display_name === undefined) {data.display_name = chnl}
 if (status === 404) {status = 'Error 404<br>Channel Closed or Never Existed'; onOffClass = 'card-offline';} else if (onOff === 'off') {
  status = 'OFFLINE'; onOffClass = 'card-offline';}
 var a = document.createElement("a");
 a.href = data.url;
 a.target= '_blank';
 a.className = onOffClass+'-a';
 a.innerHTML = '<div class="card '+onOffClass+'"><div class="card-title">'+data.display_name+'</div><div class="game">'+data.game+'</div><div class="card-inner"><img src="'+data.logo+'"><div class="card-info">'+status+'</div></div></div>';
 //
 document.getElementById("main-div").appendChild(a);
}

function twichAPI(type, chnl, pass) {
 var onOff = 'on';
 $.ajax({
  url: "https://wind-bow.glitch.me/twitch-api/"+type+"/"+chnl,
  type: "get",
  dataType: "jsonp",
  success: function(data) {
   if (type === "channels") {
    twichAPI('streams', chnl, data)
   } 
   if (type === "streams") {
    if (data.stream === null) {onOff = 'off'}
    console.log(pass,chnl,onOff);
    cardGen(pass, chnl, onOff);
   }
  }
 });
} 

var channels = [
 "ESL_SC2",
 "OgamingSC2",
 "cretetion",
 "freecodecamp",
 "storbeck",
 "habathcx",
 "RobotCaleb",
 "mister404",
 "noobs2ninjas"
];

function chnlLoop(arr) {
  for (var i = 0; i < arr.length; i++) {
   twichAPI("channels", arr[i]);
 }
}
chnlLoop(channels);

function allOn() {
 var on = document.getElementsByClassName("card-online-a");
 for (var i = 0; i < on.length; i++) {on[i].removeAttribute("style");}

 var off = document.getElementsByClassName("card-offline-a");
 for (var i = 0; i < off.length; i++) {off[i].removeAttribute("style");}
}

function online() {
 var on = document.getElementsByClassName("card-online-a");
 for (var i = 0; i < on.length; i++) {on[i].removeAttribute("style");}

 var off = document.getElementsByClassName("card-offline-a");
 for (var i = 0; i < off.length; i++) {
  off[i].style.display = "none";
 }
}

function offline() {
  var off = document.getElementsByClassName("card-offline-a");
 for (var i = 0; i < off.length; i++) {off[i].removeAttribute("style");}

 var on = document.getElementsByClassName("card-online-a");
 for (var i = 0; i < on.length; i++) {
  on[i].style.display = "none";
 }
}