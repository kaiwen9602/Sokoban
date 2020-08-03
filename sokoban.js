
var game_screen = document.getElementById("game-screen");
var next = document.getElementById("next");
var curr_level = 0;
var player = { x: 0, y: 0 }
var curr_map;
var trap_arr = [];
levels[curr_level].pass = false;
var which_level = document.getElementById("which-level");
function next_level(num) {
   
    if (curr_level + num < 0) {
        alert("it is first level");
        draw_map(levels[curr_level]);
    }
    else if (curr_level > levels.length) {
        alert("it is last level");
        draw_map(levels[curr_level]);
    }
    else {
        curr_level = curr_level + num;
        draw_map(levels[curr_level]);
        
    }
    which_level.innerHTML = "第" + (curr_level + 1) + "关";
    trap_arr = []
    next.disabled = "disabled";
    if(levels[curr_level].pass){
        next.disabled = false;
    }
    curr_map = levels[curr_level].slice()
    for (var i = 0; i < levels[curr_level].length; i++) {
        curr_map[i] = levels[curr_level][i].slice();
    }
    var go_next = true;
    window.onkeydown = function (event) {
        var e = event || window.event;
        var direction;
        switch (e.keyCode) {
            case 38:
                direction = "up";
                break;
            case 40:
                direction = "down";
                break;
            case 37:
                direction = "left";
                break;
            case 39:
                direction = "right";
                break;
        }
        player_move(direction);
        if((check_success()||levels[curr_level].pass)&& go_next){
            var state = confirm("要不要去下一关???不去的话就停留在这");
            levels[curr_level].pass = true;
            next.disabled = false;
            if(state){
                next_level(1);
            }
            go_next = false;
        }
    }
}
function set_trap(a_map){
    for(var i in a_map){
        for(var j in a_map){
            if (a_map[i][j] == 2){
                var trap_obj = {x:j, y:i};
                trap_arr.push(trap_obj);
                var div_trap = document.createElement("div");
                div_trap.classList.add("ab-position");
                div_trap.style.left = Number(j)*30+"px";
                div_trap.style.top = Number(i)*30+"px";
                game_screen.appendChild(div_trap);
            } 
        }
    }
}

function draw_map(level) {
    game_screen.innerHTML = null;
    for (var i in level) {
        for (var j in level[i]) {
            var div = document.createElement("div");
            switch (level[i][j]) {
                case 1:
                    div.classList.add("wall");
                    break;
                case 2:
                    div.classList.add("trap");
                    break;
                case 3:
                    div.classList.add("box");
                    break;
                case 4:
                    div.classList.add("player");
                    player.x = Number(j);
                    player.y = Number(i);
                    break;
            }
            game_screen.appendChild(div);
        }
    }
}
function player_move(direction) {
    var p_co, b_co;
    p_co = {};
    b_co = {};
    p_co.x = player.x;
    p_co.y = player.y;
    b_co.x = player.x;
    b_co.y = player.y;
    switch (direction) {
        case "up":
            p_co.y -= 1;
            b_co.y -= 2;
            break;
        case "down":
            p_co.y += 1;
            b_co.y += 2;
            break;
        case "right":
            p_co.x += 1;
            b_co.x += 2;
            break;
        case "left":
            p_co.x -= 1;
            b_co.x -= 2;
            break;
    }
    if (checking_go(p_co, b_co)) {
        draw_map(curr_map);
        set_trap(levels[curr_level]);
    }
}
function checking_go(p_co, b_co) {
    if (p_co.x < 0 || p_co.y < 0 || p_co.x >= curr_map[0].length || p_co.y >= curr_map.length) {
        return false;
    }
    if (curr_map[p_co.y][p_co.x] == 1) {
        return false;
    }
    if (curr_map[p_co.y][p_co.x] == 3) {
        if (curr_map[b_co.y][b_co.x] == 1 || curr_map[b_co.y][b_co.x] == 3) {
            return false;
        }
        else {
            curr_map[player.y][player.x] = 0;
            curr_map[p_co.y][p_co.x] = 4;
            player.x = p_co.x;
            player.y = p_co.y;
            curr_map[b_co.y][b_co.x] = 3;
            return true;
        }
    }
    curr_map[player.y][player.x] = 0;
    curr_map[p_co.y][p_co.x] = 4;
    player.x = p_co.x;
    player.y = p_co.y;
    return true
}
function check_success(){
    var result;
    for(var i in trap_arr){
        var location_x = trap_arr[i].x;
        var location_y = trap_arr[i].y
        if(curr_map[location_y][location_x] != 3){
            return false
        }
    }
    return true;
}
function control(){
    alert("键盘上下左右移动小球")
}