
Date.prototype.daysInMonth = function() {
  return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};

var players = {
  254920273: {"name": "Doctaaar"},
  102756891: {"name": "Neeeeeerf"},
  41528404: {"name": "JohnGalt"},
  84502939: {"name": "Megabit"},
  313885294: {"name": "Alexfov"},
  120491980: {"name": "BloOdTerrOr"}
};

months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

for (player in players) {
  players[player]["games"] = player_data(player)
  players[player]["w"] = 0
  players[player]["l"] = 0
}

function player_data(player){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.opendota.com/api/players/' + player + '/matches', false);
  request.send();
  games = JSON.parse(request.responseText).slice(0, 1000)
  lst = []
  for (i=0; i<games.length; i++){
    lst.push([games[i]["start_time"], win_loose(i, games)])
  }
  return lst
};


function win_loose(i, games){
  if (games[i]["radiant_win"] && games[i]["player_slot"] < 6) return true
  return false
}


now = new Date();
month = now.getMonth()
year = now.getFullYear()
day = now.getDate()
day_seconds = 86400

board = document.querySelector(".board")

for (g=0; g<6; g++){

  for (player in players) {
    players[player]["w"] = 0
    players[player]["l"] = 0
  }

  table =  document.createElement('div')
    table.classList.add("table")
   
    board.appendChild(table)

    head =  document.createElement('div')
    head.classList.add("head")

    month_index = month-g
    if (month_index<0) {
      month_index = 12 + month_index
      year = year - 1
    }
    head.innerHTML = months[month_index]
    days = new Date(year, month_index, 1).daysInMonth();

    table.appendChild(head)

    row = document.createElement('div')
    row.classList.add("row")
    table.appendChild(row)

    column = document.createElement('div')
    column.classList.add("column")
    row.appendChild(column)


    cell = document.createElement('div')
    cell.classList.add("player_name")
    column.appendChild(cell)

    for (key in players) {
    cell = document.createElement('div')
    cell.classList.add("player_name")
    cell.innerHTML = players[key]["name"]
    column.appendChild(cell)
    }

    month_start = new Date(year, month_index, 1)/1000
    for (i=0; i<days; i++){

      column = document.createElement('div')
      column.classList.add("column")
      row.appendChild(column)

      cell = document.createElement('div')
      cell.classList.add("cell")

      dt = document.createElement('div')
      dt.classList.add("dt")
      dt.innerHTML = i+1
      cell.appendChild(dt)


      column.appendChild(cell)

      day_start = month_start + i*day_seconds
      day_end = day_start + day_seconds

      for (player in players){
        players[player]["day"] = players[player]["games"].filter(tm => tm[0]>=day_start && tm[0] < day_end)
      }

      for (player in players) {
          cell = document.createElement('div')
          cell.classList.add("cell")
          column.appendChild(cell)

          w = 0
          l = 0

          for (x=0; x<players[player]["day"].length; x++){
            if (cooperative(players[player]["day"][x][0], player)){
              if (players[player]["day"][x][1]){
                w++
              }else{
                l++
              }
            } 
          }

          players[player]["w"] += w
          players[player]["l"] += l


          if (w>0){
            win = document.createElement('div')
            win.classList.add("win")
            cell.appendChild(win)
            win.innerHTML = w
          }
          if (l>0){
            lose = document.createElement('div')
            lose.classList.add("lose")
            cell.appendChild(lose)
            lose.innerHTML = l
          }
          
        }
    }

    column = document.createElement('div')
    column.classList.add("column")
    row.appendChild(column)

    cell = document.createElement('div')
    cell.classList.add("cell")
    column.appendChild(cell)

    dt = document.createElement('div')
    dt.classList.add("dt")
    dt.innerHTML = "W"
    cell.appendChild(dt)

    for (player in players) {
      cell = document.createElement('div')
      cell.classList.add("cell")
      column.appendChild(cell)

      if (players[player]["w"]){
        win = document.createElement('div')
        win.classList.add("win")
        cell.appendChild(win)
        win.innerHTML = players[player]["w"]
      }

    }


    column = document.createElement('div')
    column.classList.add("column")
    row.appendChild(column)

    cell = document.createElement('div')
    cell.classList.add("cell")
    column.appendChild(cell)

    dt = document.createElement('div')
    dt.classList.add("dt")
    dt.innerHTML = "L"
    cell.appendChild(dt)

    for (player in players) {
      cell = document.createElement('div')
      cell.classList.add("cell")
      column.appendChild(cell)

      if (players[player]["l"]){
        lose = document.createElement('div')
        lose.classList.add("lose")
        cell.appendChild(lose)
        lose.innerHTML = players[player]["l"]
      }

    }



    column = document.createElement('div')
    column.classList.add("column")
    row.appendChild(column)

    cell = document.createElement('div')
    cell.classList.add("wr")
    column.appendChild(cell)

    dt = document.createElement('div')
    dt.classList.add("dt")
    dt.innerHTML = "W(W+L)"
    cell.appendChild(dt)

    for (player in players) {
      cell = document.createElement('div')
      cell.classList.add("wr")
      column.appendChild(cell)

      if (players[player]["w"]){
        lose = document.createElement('div')
        lose.classList.add("lose")
        cell.appendChild(lose)
        wr = players[player]["w"] / (players[player]["l"] + players[player]["w"])
        
        lose.innerHTML = wr.toFixed(2) 
      }


    }

}


function cooperative(game, player){

  for (p in players){
    if (p == player) continue
    if (players[p]["day"].filter(tm => tm[0] == game).length > 0) return true
  }
  return false
}
