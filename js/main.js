
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  ev.dataTransfer.setData("image", ev.target.src);
  // console.log("moviendo -> " + ev.target.id, '==' , ev.dataTransfer.getData('text'));
}

// function onDrag(ev) {
//   console.log(ev);
// }

// Contenedor que recibe
function allowDrop(ev) {
  ev.preventDefault();
}

function drop(ev){
  // console.log("Ondrop");
  var playStopCont = $("#cover").find($(".img_cover").first()).remove();
  var rep = $("#reproduciendoAhora");
  rep.empty();
  ev.preventDefault();
  var titulo = "";
  var usuario = "";
  var id = ev.dataTransfer.getData("text");
  var src = ev.dataTransfer.getData("image");
  $("#cover").append("<img src='"+ src+ "' id='" + id + "' class='img_cover'>")

  // Escuchar la canción
  // Inicializa soundcloud
  SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
  });
  // Sacar un track por id
  SC.get('/tracks/'+id, ).then(function (tracks) {
    // console.log(tracks.title);
    titulo = tracks.title;
    usuario = tracks.user.username;
  });
  // Hacer sonar el track
  SC.stream('/tracks/'+id).then(function(player){
    player.play();
    rep.append("<h3>"+
      (usuario.length > 0 ? usuario : "Usuario desconocido") + ": " +
      (titulo.length > 0 ? titulo : "Sin título") + "</h3>");

    $(".fullCenter").first().empty();
    //TODO
    // $(".img_cover").first().on("mouseover", function () {
    //   if(player.isPlaying()){
    //     // var shit = $("#cover").find($(".fullCenter"));
    //     // console.log(shit);
    //     playStopCont.remove();
    //     $(".fullCenter").first().append('<span class="stop controles"></span>');
    //
    //   } else{
    //     playStopCont.remove();
    //     $(".fullCenter").first().append('<span class="play controles"></span>');
    //   }
    // })
  }).catch(function(err){
    conosole.error(err);
  })
  // SC.oEmbed(track_url, { auto_play: true }).then(function(oEmbed) {
  //   console.log('oEmbed response: ', oEmbed);
  // });
}

function onDragEnter(ev) {
  console.log("Ejecutando onDragEnter");
}

function search() {
  // Limpia la lista
  $('.lista').empty();
  // Saca el autor
  var autor = $('input').val();
  // Inicializa soundcloud
  SC.initialize({
    client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
  });
  // Busca canciones
  SC.get('/tracks', {
    q: autor}).then(function (tracks) {
    console.log(JSON.stringify(tracks));
    var numero = 0;
    if(tracks.length > 12){
      numero = 12;
    } else{
      numero = tracks.length;
    }

    for (var i = 0; i < numero; i++){
      if (tracks[i].artwork_url !== null){
        $('.lista').append("<div class='thumbnail'><img src='" + tracks[i].artwork_url+"' id= '"+ tracks[i].id +"' draggable='true' ondragstart='drag(event)'><div class='interprete'>" + tracks[i].title + "</div></div>");
      }
    }
  })
}