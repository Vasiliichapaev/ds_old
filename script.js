
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


players_data();

now = new Date();
now_year = now.getFullYear();
now_month = now.getMonth();
day_seconds = 86400;

board = document.querySelector(".board");
for (year=now_year; year>=2012; year--){
  year_table = document.createElement('div');
  year_table.classList.add("year_table");
  if (year != now_year) year_table.classList.add("minimize");
  board.appendChild(year_table);

  year_head = document.createElement('div');
  year_head.classList.add("year_head");
  year_head.addEventListener('click', mini_year);

  year_number = document.createElement('div');
  year_number.classList.add("year_number");
  year_number.innerHTML = year;
  year_head.appendChild(year_number);

  year_table.appendChild(year_head);

  year_end = 11;
  if (now_month < 11){year_end = now_month}

  for (month=year_end; month>=0; month--){
    month_table = document.createElement('div')
    month_table.classList.add("month_table")
    month_start = new Date(year, month)/1000
    month_table.attributes["start_time"] = month_start
    year_table.appendChild(month_table)

    month_head = document.createElement('div')
    month_head.classList.add("month_head")
    month_head.innerHTML = months[month]
    month_table.appendChild(month_head)

    row = document.createElement('div')
    row.classList.add("row")
    month_table.appendChild(row)


    column = document.createElement('div')
    column.classList.add("column", "border_right")
    cell = document.createElement('div')
    cell.classList.add("player_name", "border_bottom")
    player_name_head = document.createElement('div')
    player_name_head.classList.add("player_name_head")
    player_name_head.innerHTML = "Игроки"
    player_name_head.addEventListener('click', all_players)
    player_name_head.attributes["players"] = []
    for (player in players){
      player_name_head.attributes["players"].push(player)
    }
    cell.appendChild(player_name_head)

    column.appendChild(cell)
    row.appendChild(column)

    for (player in players){
      cell = document.createElement('div')
      cell.classList.add("player_name")
      column.appendChild(cell)

      player_name_container = document.createElement('div')
      player_name_container.classList.add("player_name_container")
      player_name_container.innerHTML = player
      player_name_container.addEventListener('click', toggle)
      cell.appendChild(player_name_container)
    }


    for (day=1; day<=new Date(year, month).daysInMonth(); day++){
      day_colymn = document.createElement('div')
      day_colymn.classList.add("day_colymn")
      row.appendChild(day_colymn)

      cell = document.createElement('div')
      cell.classList.add("cell", "border_bottom")
      day_number = document.createElement('div')
      day_number.classList.add("day_number")
      day_number.innerHTML = day
      cell.appendChild(day_number)
      day_colymn.appendChild(cell)

      for (player in players){
        cell = document.createElement('div')
        cell.classList.add("cell")
        day_colymn.appendChild(cell)
      }
    }

    column = document.createElement('div')
    column.classList.add("column", "border_left")
    row.appendChild(column)

    cell = document.createElement('div')
    cell.classList.add("cell", "border_bottom")
    column.appendChild(cell)

    day_number = document.createElement('div')
    day_number.classList.add("day_number")
    day_number.innerHTML = "W"
    cell.appendChild(day_number)

    for (player in players) {
      cell = document.createElement('div')
      cell.classList.add("cell")
      column.appendChild(cell)
    }


    column = document.createElement('div')
    column.classList.add("column")
    row.appendChild(column)

    cell = document.createElement('div')
    cell.classList.add("cell", "border_bottom")
    column.appendChild(cell)

    day_number = document.createElement('div')
    day_number.classList.add("day_number")
    day_number.innerHTML = "L"
    cell.appendChild(day_number)

    for (player in players) {
      cell = document.createElement('div')
      cell.classList.add("cell")
      column.appendChild(cell)
    }


    column = document.createElement('div')
    column.classList.add("column")
    row.appendChild(column)

    wr = document.createElement('div')
    wr.classList.add("wr", "border_bottom")
    column.appendChild(wr)

    wr_container = document.createElement('div')
    wr_container.classList.add("wr_container")
    wr_container.innerHTML = "W/(W+L)"
    wr.appendChild(wr_container)

    for (player in players) {
      wr = document.createElement('div')
      wr.classList.add("wr")
      column.appendChild(wr)
    }

    calculation(month_table)

  }
}

function players_data(){
  for (player in players){
    lst = []
    for (g in players[player]["id"]){
      var request = new XMLHttpRequest();
      request.open('GET', 'https://api.opendota.com/api/players/' + players[player]["id"][g] + '/matches', false);
      request.send();
      games = JSON.parse(request.responseText)
      
      for (i in games){
        lst.push([games[i]["start_time"], win_loose(i, games)])
      }
    }
    players[player]["games"] = lst
  }
};

function win_loose(i, games){
  if (games[i]["radiant_win"] && games[i]["player_slot"] < 6) return true
  if (!games[i]["radiant_win"] && games[i]["player_slot"] > 6) return true
  return false
}


function calculation(month_table) {
  for (player in players){
    players[player]["w"] = 0
    players[player]["l"] = 0
    players[player]["valid"] = false
  }
  row = month_table.children[1]
  month_start = month_table.attributes["start_time"]
  valid_players = row.children[0].children[0].children[0].attributes["players"]
  for (i in valid_players){
    players[valid_players[i]]["valid"] = true
  }

  for (c=1; c<row.children.length-3; c++){

    day_start = month_start + (c-1)*day_seconds
    day_end = day_start + day_seconds

    for (player in players){
      players[player]["day"] = players[player]["games"].filter(tm => tm[0]>=day_start && tm[0] < day_end)
    }
   
    r = 1   
    for (player in players){
      cl = row.children[c].children[r]
      r++

      if (cl.children[0]){cl.children[0].remove()}
      if (cl.children[0]){cl.children[0].remove()}

      w = 0
      l = 0

      if (players[player]["valid"]){
        for (i in players[player]["day"]){
          if (cooperative(players[player]["day"][i][0], player)){
            if (players[player]["day"][i][1]){
              w++
            }else{
              l++
            }
          } 
        }
      }

      players[player]["w"] += w
      players[player]["l"] += l

      if (w>0){
        win = document.createElement('div')
        win.classList.add("win")
        win.innerHTML = w
        cl.appendChild(win)
        
      }

      if (l>0){
        loose = document.createElement('div')
        loose.classList.add("loose")
        loose.innerHTML = l
        cl.appendChild(loose)
      }
    }
  }

  c = row.children.length - 3
  r = 1   
  for (player in players){
    cl = row.children[c].children[r]
    r++

    if (cl.children[0]){cl.children[0].remove()}

    if (players[player]["w"]>0){
      win = document.createElement('div')
      win.classList.add("win")
      win.innerHTML = players[player]["w"]
      cl.appendChild(win)
      
    }
  }

  c = row.children.length - 2
  r = 1   
  for (player in players){
    cl = row.children[c].children[r]
    r++

    if (cl.children[0]){cl.children[0].remove()}

    if (players[player]["l"]>0){
      loose = document.createElement('div')
      loose.classList.add("loose")
      loose.innerHTML = players[player]["l"]
      cl.appendChild(loose)
    }
  }

  c = row.children.length - 1
  r = 1   
  for (player in players){
    cl = row.children[c].children[r]
    r++

    if (cl.children[0]){cl.children[0].remove()}

    if (players[player]["w"]>0){
      winrate = players[player]["w"] / (players[player]["l"] + players[player]["w"])

      if (winrate<0.5){
        loose = document.createElement('div')
        loose.classList.add("loose")
        loose.innerHTML = winrate.toFixed(2) 
        cl.appendChild(loose)
      }else{
        win = document.createElement('div')
        win.classList.add("win")
        win.innerHTML = winrate.toFixed(2) 
        cl.appendChild(win)
      }
    }
  }
}

function cooperative(game, player){
  valid_count = 0
  for (p in players){
    if (players[p]["valid"]) valid_count++
  }
  if (valid_count == 1) return true
  for (p in players){
    if (p == player) continue
    if (!players[p]["valid"]) continue
    if (players[p]["day"].filter(tm => tm[0] == game).length > 0) return true
  }
  return false
}


function toggle(event){
  pls = this.parentElement.parentElement.children[0].children[0]
  month_table = this.parentElement.parentElement.parentElement.parentElement
  if (this.classList.contains("not_calc")){
      this.classList.remove("not_calc")
      pls.attributes["players"].push(this.innerHTML)
      calculation(month_table)
      if (Object.keys(players).length == pls.attributes["players"].length){
        pls.classList.remove("not_calc")
      }
  }else{
      this.classList.add("not_calc")
      i = pls.attributes["players"].indexOf(this.innerHTML)
      pls.attributes["players"].splice(i, 1)
      calculation(month_table)
      pls.classList.add("not_calc")
  }
}

function all_players(event){
  month_table = this.parentElement.parentElement.parentElement.parentElement
  clmn = this.parentElement.parentElement
  this.attributes["players"] = []

  if (this.classList.contains("not_calc")){
    this.classList.remove("not_calc")
    for (player in players){
      this.attributes["players"].push(player)
    }
    for (i=1; i<clmn.children.length; i++){
      clmn.children[i].children[0].classList.remove("not_calc")
    }
  }else{
    this.classList.add("not_calc")
    for (i=1; i<clmn.children.length; i++){
      clmn.children[i].children[0].classList.add("not_calc")
    }
  }
  calculation(month_table)
}

function mini_year(event){
  year_table = this.parentElement
  if (year_table.classList.contains("minimize")){
    year_table.classList.remove("minimize")
  }else{
    year_table.classList.add("minimize")
  }

}