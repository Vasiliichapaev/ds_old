Date.prototype.daysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

var players = {
  "Doctaaar": {"id": [254920273, 117990545]},
  "Neeeeeerf": {"id": [102756891]},
  "JohnGalt": {"id": [41528404]},
  "Megabit": {"id": [84502939]},
  "Alexfov": {"id": [313885294]},
  "BloOdTerrOr": {"id": [120491980]}
};

var heroes = {};

var months = ["Январь", 
              "Февраль", 
              "Март", 
              "Апрель", 
              "Май", 
              "Июнь", 
              "Июль", 
              "Август", 
              "Сентябрь", 
              "Октябрь", 
              "Ноябрь", 
              "Декабрь"];

var ranked_calc = true;
var unranked_calc = true;

players_data();
heroes_data();

var now = new Date();
var now_year = now.getFullYear();
var now_month = now.getMonth();
var now_day = now.getDate();
var now_seconds = new Date(now_year, now_month, now_day) / 1000;
var day_seconds = 86400;
var board = document.querySelector(".board");

var popup = document.querySelector('.popup');
popup.addEventListener("mouseleave", details_clear);
popup.addEventListener("mouseenter", e => popup.lastChild.style.display = "block");

for (var year=now_year; year>=2012; year--){

  var year_table = document.createElement('div');

  year_table.classList.add("year_table");
  if (year != now_year) year_table.classList.add("minimize");
  board.appendChild(year_table);

  var year_head = document.createElement('div');
  year_head.classList.add("year_head");
  year_head.addEventListener('click', mini_year);

  var year_number = document.createElement('div');
  year_number.classList.add("year_number");
  year_number.innerHTML = year;
  year_head.appendChild(year_number);

  year_table.appendChild(year_head);

  var year_end = 11;
  if (now_month < 11 && year == now_year) year_end = now_month;

  for (month=year_end; month>=0; month--){
    var month_table = document.createElement('div');

    month_table.classList.add("month_table");
    var month_start = new Date(year, month)/1000;
    month_table.attributes["start_time"] = month_start;
    year_table.appendChild(month_table);

    var month_head = document.createElement('div');
    month_head.classList.add("month_head");
    month_head.innerHTML = months[month];
    month_table.appendChild(month_head);

    var row = document.createElement('div');
    row.classList.add("row");
    month_table.appendChild(row);


    var column = document.createElement('div');
    column.classList.add("column", "border_right");
    var cell = document.createElement('div');
    cell.classList.add("player_name", "border_bottom");
    var player_name_head = document.createElement('div');
    player_name_head.classList.add("player_name_head");
    player_name_head.innerHTML = "Игроки";
    player_name_head.addEventListener('click', all_players);
    player_name_head.attributes["players"] = [];
    for (player in players){
      player_name_head.attributes["players"].push(player);
    };
    cell.appendChild(player_name_head);

    var ranked = document.createElement('div');
    ranked.classList.add("ranked");
    ranked.innerHTML = "Р";
    ranked.addEventListener('click', ranked_games);
    cell.appendChild(ranked);

    var unranked = document.createElement('div');
    unranked.classList.add("ranked");
    unranked.innerHTML = "О";
    unranked.addEventListener('click', unranked_games);
    cell.appendChild(unranked);



    column.appendChild(cell);
    row.appendChild(column);

    for (player in players){
      var cell = document.createElement('div');
      cell.classList.add("player_name");
      column.appendChild(cell);

      var player_name_container = document.createElement('div');
      player_name_container.classList.add("player_name_container");
      player_name_container.innerHTML = player;
      player_name_container.addEventListener('click', toggle);
      cell.appendChild(player_name_container);
    };


    for (day=1; day<=new Date(year, month).daysInMonth(); day++){
      var day_colymn = document.createElement('div');
      day_colymn.classList.add("day_colymn");
      row.appendChild(day_colymn);

      var cell = document.createElement('div');
      cell.classList.add("cell", "border_bottom");
      var day_number = document.createElement('div');
      day_number.classList.add("day_number");
      day_number.innerHTML = day;

      this_seconds = new Date(year, month, day) / 1000;

      if (this_seconds == now_seconds){
        day_number.classList.add("day_number", "this_day");
      };



      cell.appendChild(day_number);
      day_colymn.appendChild(cell);

      for (player in players){
        var cell = document.createElement('div');
        cell.classList.add("cell");
        day_colymn.appendChild(cell);
      };
    };

    var column = document.createElement('div');
    column.classList.add("column", "border_left");
    row.appendChild(column);

    var cell = document.createElement('div');
    cell.classList.add("cell", "border_bottom");
    column.appendChild(cell);

    var day_number = document.createElement('div');
    day_number.classList.add("day_number");
    day_number.innerHTML = "W";
    cell.appendChild(day_number);

    for (player in players) {
      var cell = document.createElement('div');
      cell.classList.add("cell");
      column.appendChild(cell);
    }


    var column = document.createElement('div');
    column.classList.add("column");
    row.appendChild(column);

    var cell = document.createElement('div');
    cell.classList.add("cell", "border_bottom");
    column.appendChild(cell);

    var day_number = document.createElement('div');
    day_number.classList.add("day_number");
    day_number.innerHTML = "L";
    cell.appendChild(day_number);

    for (player in players) {
      var cell = document.createElement('div');
      cell.classList.add("cell");
      column.appendChild(cell);
    };


    var column = document.createElement('div');
    column.classList.add("column");
    row.appendChild(column);

    var wr = document.createElement('div');
    wr.classList.add("wr", "border_bottom");
    column.appendChild(wr);

    var wr_container = document.createElement('div');
    wr_container.classList.add("wr_container");
    wr_container.innerHTML = "W/(W+L)";
    wr.appendChild(wr_container);

    for (player in players) {
      var wr = document.createElement('div');
      wr.classList.add("wr");
      column.appendChild(wr);
    };

    calculation(month_table);

  }
}

function heroes_data(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.opendota.com/api/heroStats', false);
  request.send();
  var heroes_json = JSON.parse(request.responseText);

  for (i in heroes_json){
    heroes[heroes_json[i]["id"]] = [heroes_json[i]["localized_name"], heroes_json[i]["icon"]];
  };

};

function players_data(){
  for (player in players){
    var lst = [];
    for (g in players[player]["id"]){
      var request = new XMLHttpRequest();
      request.open('GET', 'https://api.opendota.com/api/players/' + players[player]["id"][g] + '/matches', false);
      request.send();
      var games = JSON.parse(request.responseText);
      for (i in games){
        lst.push([games[i]["start_time"], win_loose(i, games), ranked(i, games), games[i]["hero_id"], games[i]["kills"], games[i]["deaths"], games[i]["assists"], games[i]["match_id"]]);
      }
    }
    players[player]["games"] = lst;
  }
};

function win_loose(i, games){
  if (games[i]["radiant_win"] && games[i]["player_slot"] < 6) return true;
  if (!games[i]["radiant_win"] && games[i]["player_slot"] > 6) return true;
  return false;
};

function ranked(i, games){
  if (games[i]["lobby_type"] == 7) return true;
  return false;
};

function calculation(month_table) {
  
  for (player in players){
    players[player]["month"] = [];
    players[player]["w"] = 0;
    players[player]["l"] = 0;
    players[player]["valid"] = false;
  };
  var row = month_table.children[1];
  var month_start = month_table.attributes["start_time"];
  var valid_players = row.children[0].children[0].children[0].attributes["players"];
  for (i in valid_players){
    players[valid_players[i]]["valid"] = true;
  };

  for (var c=1; c<row.children.length-3; c++){

    var day_start = month_start + (c-1)*day_seconds;
    var day_end = day_start + day_seconds;

    for (player in players){
      if (ranked_calc && unranked_calc){
        players[player]["day"] = players[player]["games"].filter(tm => tm[0]>=day_start && tm[0] < day_end);
      }else if (!ranked_calc && unranked_calc){
        players[player]["day"] = players[player]["games"].filter(tm => tm[0]>=day_start && tm[0] < day_end && !tm[2]);
      }else if (ranked_calc && !unranked_calc){
        players[player]["day"] = players[player]["games"].filter(tm => tm[0]>=day_start && tm[0] < day_end && tm[2]);
      }else{
        players[player]["day"] = [];
      };
    };
   
    var r = 1;  
    for (player in players){
      
      var cl = row.children[c].children[r];
      r++;

      cl.attributes["day_details"] = []
      cl.removeEventListener("mouseenter", popup_push);
      cl.classList.remove("pointer");
      

      if (cl.children[0]){cl.children[0].remove()};
      if (cl.children[0]){cl.children[0].remove()};

      var w = 0;
      var l = 0;

      if (players[player]["valid"]){
        for (i in players[player]["day"]){
          if (cooperative(players[player]["day"][i][0], player)){
            if (players[player]["day"][i][1]){
              w++;
            }else{
              l++;
            };
            if (w>0 || l>0){
              cl.attributes["day_details"].push(players[player]["day"][i]);
              cl.addEventListener("mouseenter", popup_push);
              cl.classList.add("pointer");
              players[player]["month"].push(players[player]["day"][i]);
            };
          };
        };
      };

      players[player]["w"] += w;
      players[player]["l"] += l;

      if (w>0){
        var win = document.createElement('div');
        win.classList.add("win");
        win.innerHTML = w;
        cl.appendChild(win);
        
      }

      if (l>0){
        var loose = document.createElement('div');
        loose.classList.add("loose");
        loose.innerHTML = l;
        cl.appendChild(loose);
      };
    };
  };

  var c = row.children.length - 3;
  var r = 1;
  for (player in players){
    var cl = row.children[c].children[r];
    r++;

    if (cl.children[0]){cl.children[0].remove()};

    if (players[player]["w"]>0){
      win = document.createElement('div');
      win.classList.add("win");
      win.innerHTML = players[player]["w"];
      cl.appendChild(win);
      
    };
  };

  c = row.children.length - 2;
  r = 1;
  for (player in players){
    cl = row.children[c].children[r];
    r++;

    if (cl.children[0]){cl.children[0].remove()};

    if (players[player]["l"]>0){
      var loose = document.createElement('div');
      loose.classList.add("loose");
      loose.innerHTML = players[player]["l"];
      cl.appendChild(loose);
    };
  };

  var c = row.children.length - 1;
  var r = 1;
  for (player in players){
    var cl = row.children[c].children[r];
    r++;

    cl.removeEventListener("mouseenter", popup_push);
    cl.classList.remove("pointer");

    if (cl.children[0]){cl.children[0].remove()};

    if (players[player]["w"]>0){
      winrate = players[player]["w"] / (players[player]["l"] + players[player]["w"]);

      if (winrate<0.5){
        var loose = document.createElement('div');
        loose.classList.add("loose");
        loose.innerHTML = winrate.toFixed(2);
        cl.appendChild(loose)
      }else{
        var win = document.createElement('div');
        win.classList.add("win");
        win.innerHTML = winrate.toFixed(2);
        cl.appendChild(win);
      };
    };

    if (players[player]["w"] > 0 || players[player]["l"] > 0){
      cl.attributes["month_details"] = month_details(players[player]["month"]);
      cl.addEventListener("mouseenter", popup_push);
      cl.classList.add("pointer");
    };

  };
};

function cooperative(game, player){
  var valid_count = 0;
  for (p in players){
    if (players[p]["valid"]) valid_count++;
  }
  if (valid_count == 1) return true;
  for (p in players){
    if (p == player) continue;
    if (!players[p]["valid"]) continue;
    if (players[p]["day"].filter(tm => tm[0] == game).length > 0) return true;
  };
  return false;
};


function toggle(event){
  var pls = this.parentElement.parentElement.children[0].children[0];
  var month_table = this.parentElement.parentElement.parentElement.parentElement;
  if (this.classList.contains("not_calc")){
      this.classList.remove("not_calc");
      pls.attributes["players"].push(this.innerHTML);
      calculation(month_table);
      if (Object.keys(players).length == pls.attributes["players"].length){
        pls.classList.remove("not_calc");
      }
  }else{
      this.classList.add("not_calc");
      var i = pls.attributes["players"].indexOf(this.innerHTML);
      pls.attributes["players"].splice(i, 1);
      calculation(month_table);
      pls.classList.add("not_calc");
  };
};

function all_players(event){
  var month_table = this.parentElement.parentElement.parentElement.parentElement;
  var clmn = this.parentElement.parentElement;
  this.attributes["players"] = [];

  if (this.classList.contains("not_calc")){
    this.classList.remove("not_calc");
    for (player in players){
      this.attributes["players"].push(player);
    };
    for (i=1; i<clmn.children.length; i++){
      clmn.children[i].children[0].classList.remove("not_calc");
    };
  }else{
    this.classList.add("not_calc");
    for (i=1; i<clmn.children.length; i++){
      clmn.children[i].children[0].classList.add("not_calc");
    };
  };
  calculation(month_table);
};

function mini_year(event){
  var year_table = this.parentElement;
  if (year_table.classList.contains("minimize")){
    year_table.classList.remove("minimize");
  }else{
    year_table.classList.add("minimize");
  };
};

function ranked_games(event){
  var month_table = this.parentElement.parentElement.parentElement.parentElement;

  if (this.classList.contains("not_calc")){
    this.classList.remove("not_calc");
    ranked_calc = true;
  }else{
    this.classList.add("not_calc");
    ranked_calc = false;
  };
  calculation(month_table);
};

function unranked_games(event){
  var month_table = this.parentElement.parentElement.parentElement.parentElement;

  if (this.classList.contains("not_calc")){
    this.classList.remove("not_calc");
    unranked_calc = true;
  }else{
    this.classList.add("not_calc");
    unranked_calc = false;
  };
  calculation(month_table);
};

function popup_push(event){
  var rect = this.getBoundingClientRect();

  if (this.attributes["day_details"]){
    var day_games = details(this.attributes["day_details"]);
    popup.appendChild(day_games);
  };

  if (this.attributes["month_details"]){
    var month_games = month_details_popup(this.attributes["month_details"]);
    popup.appendChild(month_games);
  };

  popup.style.top = (scrollY + rect.top).toString() + "px";
  popup.style.left = (rect.left).toString() + "px";
  popup.style.width = rect.width + "px";
  popup.style.height = rect.height + "px";
  popup.style.display = "table"
 
};

function display_popup(event){
  popup.lastChild.style.display = "block"
};

function details_clear(){
  if (popup.children.length > 0){
    popup.lastChild.remove()
  };
  popup.style.display = "none";
  popup.removeEventListener("mouseenter", details);
  popup.removeEventListener("mouseenter", month_details_popup);
  popup.attributes["content"] = [];
};


function month_details(month_lst){
  var hero_lst = [];
  for (hero in heroes){
    var hero_games =  month_lst.filter(x => x[3] == hero );
    if (hero_games.length > 0){
      hero_lst.push([hero, hero_games]);
    };
  };
  return hero_lst;
};


function details(day_games){
  if (popup.children.length > 0){
    popup.lastChild.remove()
  };
  
  var details_container = document.createElement('div');
  details_container.classList.add("details_container");

  var details_head = document.createElement('div');
  details_head.classList.add("details_head");
  details_container.appendChild(details_head);

  var hero_head = document.createElement('div');
  hero_head.classList.add("hero_head");
  details_head.appendChild(hero_head);

  var kda = document.createElement('div');
  kda.classList.add("kda_head");
  details_head.appendChild(kda);
  kda.innerHTML = "У"

  var kda = document.createElement('div');
  kda.classList.add("kda_head");
  details_head.appendChild(kda);
  kda.innerHTML = "С"

  var kda = document.createElement('div');
  kda.classList.add("kda_head");
  details_head.appendChild(kda);
  kda.innerHTML = "П"


  for (game in day_games){
    var game_details = document.createElement('div');
    game_details.classList.add("game_details");

    var hero_container = document.createElement('div');
    hero_container.classList.add("hero_container");

    var hero_img = document.createElement('img');
    var hero_id = day_games[game][3];
    hero_img.src = "https://api.opendota.com" + heroes[hero_id][1];

    var hero = document.createElement('div');
    hero.classList.add("hero");
    hero.appendChild(hero_img);

    // var hero_name = document.createElement('div');
    // hero_name.classList.add("hero_name");
    // hero_name.innerHTML = heroes[hero_id][0];

    // hero.appendChild(hero_name);


    if (day_games[game][1]){
      hero_container.classList.add("green");
    }else{
      hero_container.classList.add("red");
    };

    hero_container.appendChild(hero);



    var kda = document.createElement('div');
    kda.classList.add("kda");
    hero_container.appendChild(kda);
    kda.innerHTML = day_games[game][4]
  
    var kda = document.createElement('div');
    kda.classList.add("kda");
    hero_container.appendChild(kda);
    kda.innerHTML = day_games[game][5]
  
    var kda = document.createElement('div');
    kda.classList.add("kda");
    hero_container.appendChild(kda);
    kda.innerHTML = day_games[game][6]


    game_details.appendChild(hero_container);


    var game_link = document.createElement('a');
    game_link.href = "https://ru.dotabuff.com/matches/" + day_games[game][7]
    game_link.classList.add("game_link");

    
    hero_container.appendChild(game_link);

    details_container.appendChild(game_details);

  };
  return details_container;
};

function month_details_popup(month_games){

  if (popup.children.length > 0){
    popup.lastChild.remove()
  };

  // popup.removeEventListener("mouseenter", details);
  // popup.removeEventListener("mouseenter", month_details_popup);

  var month_details_container = document.createElement('div');
  month_details_container.classList.add("month_details_container");

  // popup.appendChild(month_details_container);

  var month_details_head = document.createElement('div');
  month_details_head.classList.add("month_details_head");
  month_details_container.appendChild(month_details_head);

  var month_hero_head = document.createElement('div');
  month_hero_head.classList.add("month_hero_head");
  month_details_head.appendChild(month_hero_head);

  var month_w = document.createElement('div');
  month_w.classList.add("month_w");
  month_details_head.appendChild(month_w);
  month_w.innerHTML = "W"

  var month_l = document.createElement('div');
  month_l.classList.add("month_l");
  month_details_head.appendChild(month_l);
  month_l.innerHTML = "L"

  var month_wr = document.createElement('div');
  month_wr.classList.add("month_wr", "white");
  month_details_head.appendChild(month_wr);
  month_wr.innerHTML = "W/(W+L)"

  // month_games = popup.attributes["content"]

  for (hero in month_games){
    
    var month_details = document.createElement('div');
    month_details.classList.add("month_details");

    var month_hero_container = document.createElement('div');
    month_hero_container.classList.add("month_hero_container");

    var hero_img = document.createElement('img');
    var hero_id = month_games[hero][0];
    var games = month_games[hero][1];
    

    hero_img.src = "https://api.opendota.com" + heroes[hero_id][1];

    var hero = document.createElement('div');
    hero.classList.add("hero");
    hero.appendChild(hero_img);

    month_hero_container.appendChild(hero);
    month_details.appendChild(month_hero_container);
    month_details_container.appendChild(month_details);

    var w = 0;
    var l = 0;
   

    for (i in games){
      if (games[i][1]){
        w++
      }else{
        l++
      };
    };

    var winrate = w / (l + w);

    var month_w = document.createElement('div');
    month_w.classList.add("month_w");
    month_hero_container.appendChild(month_w);
    month_w.innerHTML = w
  
    var month_l = document.createElement('div');
    month_l.classList.add("month_l");
    month_hero_container.appendChild(month_l);
    month_l.innerHTML = l
  
    var month_wr = document.createElement('div');
    month_wr.classList.add("month_wr");
    month_hero_container.appendChild(month_wr);
    month_wr.innerHTML = winrate.toFixed(2)

    if (winrate < 0.5){
      month_wr.classList.add("red");
    }else{
      month_wr.classList.add("green");
    };
  };
  return month_details_container
};
