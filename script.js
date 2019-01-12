Date.prototype.daysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

var players = {
  "Doctaaar": {"id": [254920273, 117990545], "load": false, "games": []},
  "Neeeeeerf": {"id": [102756891], "load": false, "games": []},
  "JohnGalt": {"id": [41528404], "load": false, "games": []},
  "Megabit": {"id": [84502939], "load": false, "games": []},
  "Alexfov": {"id": [313885294], "load": false, "games": []},
  "BloOdTerrOr": {"id": [120491980], "load": false, "games": []}
};

var players_dta = [];

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

var plot = document.querySelector('.plot');
var plot_backgraund = document.querySelector('.plot_backgraund');
plot_backgraund.addEventListener("click", plot_down);

players_data();
heroes_data();
construct();


let statistics = document.querySelector(".statistics");
let graphics = document.querySelector(".graphics");

graphics.addEventListener('click',function(e){
  if (this.classList.contains("cristal")){
    this.classList.remove("cristal");
    this.classList.add("lina");

    let board = document.querySelector(".board");
    board.style.display = 'none';

    let plots_container = document.querySelector(".plots_container");
    plots_container.style.display = 'flex';

    statistics.classList.remove("lina");
    statistics.classList.add("cristal");
  };
});

statistics.addEventListener('click',function(e){
  if (this.classList.contains("cristal")){
    this.classList.remove("cristal");
    this.classList.add("lina");

    let board = document.querySelector(".board");
    board.style.display = 'flex';

    let plots_container = document.querySelector(".plots_container");
    plots_container.style.display = 'none';

    graphics.classList.remove("lina");
    graphics.classList.add("cristal");
  };
});

function construct(){

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
      month_table.appendChild(month_head);
  
      var month_name = document.createElement('div');
      month_name.classList.add("month_name");
      month_name.innerHTML = months[month];
      month_head.appendChild(month_name);
  
  
      var plot_img = document.createElement('img');
      plot_img.src = "plot.png"
      month_head.appendChild(plot_img);
      plot_img.addEventListener("click", plot_up)
  
  
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
    };
  };
};




function heroes_data(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.opendota.com/api/heroStats', true);
  request.send();
  request.onreadystatechange = function(e){
    if(request.readyState === 4 && request.status === 200) {
      var heroes_json = JSON.parse(request.responseText);
      for (i in heroes_json){
        heroes[heroes_json[i]["id"]] = [heroes_json[i]["localized_name"], heroes_json[i]["icon"]];
      };
    };
  };
};

var win_loose = function(game){
  if (game["radiant_win"] && game["player_slot"] < 6) return true;
  if (!game["radiant_win"] && game["player_slot"] > 6) return true;
  return false;
};

var ranked = function(game){
  if (game["lobby_type"] == 7) return true;
  return false;
};

function players_data(){
  for (player in players){

    for (let g in players[player]["id"]){
      let request = new XMLHttpRequest();
      request.open('GET', 'https://api.opendota.com/api/players/' + players[player]["id"][g] + '/matches', true);
      request.send();
      let plr = player;
      request.onreadystatechange = function(e, player){
        if(request.readyState === 4 && request.status === 200) {
          let games = JSON.parse(request.responseText);
          for (let i in games){
            players[plr]["games"].push([games[i]["start_time"], win_loose(games[i]), ranked(games[i]), games[i]["hero_id"], games[i]["kills"], games[i]["deaths"], games[i]["assists"], games[i]["match_id"]]);
          };
          calculation_all()
        };
        players[plr]["load"] = true;  
        
      };
    };
  };
};


function calculation_all(){
  let load = true;
  let month_tables = document.querySelectorAll(".month_table");

  for (player in players){
    if (!players[player]["load"]) load = false;
  };
  if (!load) return;

  for (let indx=0; indx < month_tables.length; indx++){
    calculation(month_tables[indx])
  };
  personal_graphics();
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

    if (players[player]["w"] + players[player]["l"] > 0){
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
    cl.attributes["month_player_details"] = [player, players[player]["month"]];

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

  var month_details_container = document.createElement('div');
  month_details_container.classList.add("month_details_container");

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

  var player_month_games = [];

  for (hero in month_games){
   
    let hero_img = document.createElement('img');
    let hero_id = month_games[hero][0];
    let games = month_games[hero][1];
    
    hero_img.src = "https://api.opendota.com" + heroes[hero_id][1];

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

    player_month_games.push([hero_img, w, l, winrate]);
  };

  // player_month_games.sort((a, b) => b[3]- a[3]);
  player_month_games.sort((a, b) => (b[1] + b[2])- (a[1] + a[2]));

  for (g in player_month_games){
   
    var month_details = document.createElement('div');
    month_details.classList.add("month_details");

    var month_hero_container = document.createElement('div');
    month_hero_container.classList.add("month_hero_container");

    var hero = document.createElement('div');
    hero.classList.add("hero");
    hero.appendChild(player_month_games[g][0]);

    month_hero_container.appendChild(hero);
    month_details.appendChild(month_hero_container);
    month_details_container.appendChild(month_details);

    var month_w = document.createElement('div');
    month_w.classList.add("month_w");
    month_hero_container.appendChild(month_w);
    month_w.innerHTML = player_month_games[g][1]
  
    var month_l = document.createElement('div');
    month_l.classList.add("month_l");
    month_hero_container.appendChild(month_l);
    month_l.innerHTML = player_month_games[g][2]
  
    var month_wr = document.createElement('div');
    month_wr.classList.add("month_wr");
    month_hero_container.appendChild(month_wr);
    month_wr.innerHTML = player_month_games[g][3].toFixed(2)

    if (player_month_games[g][3] < 0.5){
      month_wr.classList.add("red");
    }else{
      month_wr.classList.add("green");
    };
  };

  return month_details_container;
};


function plot_up(event){
  plot_backgraund.style.display = 'flex';
  plot.style.display = 'flex';

  let month_table = this.parentElement.parentElement;

  let row = month_table.children[1];
  let wr_column = row.children[row.children.length - 1];

  var players_data = [];

  for (i=1; i<wr_column.children.length; i++){
    players_data.push(wr_column.children[i].attributes["month_player_details"]);
  };
  days_count = 31
  month_start = new Date(2018, 11, 1) / 1000;

  month_start = month_table.attributes["start_time"];

  plot_container = make_plot(players_data, month_start);
  plot.appendChild(plot_container);
};


function plot_down(event){
  plot.style.display = 'none';
  plot_backgraund.style.display = 'none';

  while (plot.children.length > 0){
    plot.lastChild.remove();
  }; 
};

function make_plot(players_data, month_start){
  var ctx = document.createElement('canvas');
  var days_count = new Date(month_start * 1000).daysInMonth();

  var datasets = [];
  var labels = [];
  var colors = ['green', 'red', 'black', 'blue', 'indigo', 'brown'];
  
  for (i=1; i<=days_count; i++){
    labels.push(i)
  };
  
  for (i in players_data){
      if (players_data[i][1].length == 0) continue;
      var points = [];
      var w = 0;
  
      for (k=0; k<days_count; k++){
        let day_start = month_start + k * 86400;
        let day_end = day_start + 86400;
  
        let day_games =  players_data[i][1].filter(x => x[0]>=day_start && x[0] < day_end);
  
        for (g in day_games){
          if (day_games[g][1]){
              w++;
          }else{
              w--;
          };
        };
        points.push({
            x: k + 1,
            y: w
        });
      };
      let params = {
          label: players_data[i][0],
          data: points,
          backgroundColor: ['transparent'],
          borderColor: [colors[i]],
          borderWidth: 2
      };
      datasets.push(params);
  };
  

  let myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: labels,
          datasets: datasets
      },
      options: {
          tooltips: {
            enabled: false
          },
          elements: {
              point: {
                radius: 0,
                hoverRadius: 0
                // pointStyle: "none"
              },
              line: {
                  tension: 0, // disables bezier curves
              }
          },
          legend: {
              display: true,
              position: 'top',
              labels: {
                fontSize: 15,
              }
          },
          animation: {
              // duration: 0, // general animation time
          },
          hover: {
              animationDuration: 0, // duration of animations when hovering an item
          },
          responsiveAnimationDuration: 0, // animation duration after a resize
          scales: {
              yAxes: [{
                  ticks: {
                    stepSize: 1
                },
                  scaleLabel: {
                      display: true,
                      labelString: 'Победы',
                      fontSize: 15
                  },
              },],
  
          }
      }
  });

  return ctx;
};



function personal_graphics(){

  const colors = ['green', 'red'];
  const plots_container = document.querySelector('.plots_container');
  
  for (player in players){
      let wins = 0;
      let games = players[player]['games'].slice(0, players[player]['games'].length);
      games.reverse();
      let plot_width = games.length * 4 + 10 + 'px';
      let datasets = [];
  
      let plot_container = document.createElement('div');
      plot_container.classList.add("plot_container");
      plots_container.appendChild(plot_container);
  
      let plot_head = document.createElement('div');
      plot_head.classList.add("plot_head");
      plot_head.innerHTML = player
      plot_container.appendChild(plot_head);
  
      let plot_body = document.createElement('div');
      plot_body.classList.add("plot_body");
      plot_container.appendChild(plot_body);
      
      let indev_plot = document.createElement('div');
      indev_plot.classList.add("indev_plot");
      indev_plot.style.width = plot_width;
      plot_body.appendChild(indev_plot);
      
      let ctx = document.createElement('canvas');
      ctx.style.width = plot_width;
      ctx.style.height = '500px'
      indev_plot.appendChild(ctx);
  
      for (let i=0; i < games.length ; i++){
          let clr = 0;
      
          if (games[i][1]){
              wins++;
              clr = 0;
          }else{
              wins--;
              clr = 1;
          };
      
          let point = [{
              x: i+1,
              y: wins
          }];
         
      
          let params = {
              data: point,
              backgroundColor: [colors[clr]],
              borderColor: [colors[clr]],
          };
          datasets.push(params);
      };
  
  
      let myChart = new Chart(ctx, {
          type: 'scatter',
          data: {
              datasets: datasets
          },
          options: {
              tooltips: {
                  enabled: true,
                  // backgroundColor: 'red',
                  callbacks: {
                      title: function(tooltipItem, d) {
                          let indx = tooltipItem[0].datasetIndex - 1;
                          let dte = new Date(games[indx+1][0]*1000)
                          return dte.getDate() +" "+ (dte.getMonth()+1) +" "+ dte.getFullYear()
                      },
                      label: function(tooltipItem) {
                          return tooltipItem.xLabel + ";" + tooltipItem.yLabel
                      },
                  },
              },
              elements: {
                  point: {
                      radius: 2,
                      hoverRadius: 2
                    }
              },
              legend: {
                  display: false,
              },
              animation: {
                  duration: 0, // general animation time
              },
              hover: {
                  animationDuration: 0, // duration of animations when hovering an item
              },
              responsiveAnimationDuration: 0, // animation duration after a resize
              scales: {
                  yAxes: [{
                      position: 'right',
                      scaleLabel: {
                          display: true,
                          labelString: 'Победы',
                          fontSize: 15
                      },
                  }],
                  // yAxes: [{
                  //     position: 'left',
                  // }],
                  xAxes: [{
                      display: false,
                      ticks: {
                          max: games.length + 5,
                        
                      //   display: false,
                    },
                    },],
              }
          }
      });
  
  
  };
};