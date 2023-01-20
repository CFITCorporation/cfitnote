var h=285,w=155,height=h,width=w,beginX=1,beginY=1,size=5;//h:横w:竖
var map = initMap(width, height);
var arr = changeMap(map, beginX, beginY);
changeMap(arr, size);
setTimeout(function(){xrs();},2000);
function logs(s){return console.log(s);}
//document.onclick=function(){try{findWay(arr,1,1);xrs();}catch(err){alert('An Error Occured');}}
document.ondblclick=function(){history.go(0);}
document.onclick=function(){try{document.querySelector('audio').play();findWay(arr,1,1);toway(1,1);/*xrs();*/}catch(err){alert('An Error Occured');}}
function xrs(){
	var str="";
	for(var i=0;i<w;i++){
		str=str+"<br>";
	for(var j=0;j<h;j++){
		if(arr[i][j]==0){
		str=str+'<div class="hi" id="'+i+'#'+j+'" style="background-color:#000"></div>';
		}else
		if(arr[i][j]==-1)
		{
		str=str+'<div class="hi" id="'+i+'#'+j+'" style="background-color:#fff"></div>';	
		}else
		if(arr[i][j]==2)
		{
		str=str+'<div class="hi" id="'+i+'#'+j+'" style="background-color:green"></div>';	
		}else
		if(arr[i][j]==3)
		{
		str=str+'<div class="hi" id="'+i+'#'+j+'" style="background-color:red"></div>';	
		}
	}
	}
	document.getElementById('mz').innerHTML=str;
}
function initMap(width, height) {
        var map = new Array(width);
        for (i = 0; i < map.length; i++) {
            var temp = new Array(height);
            for (j = 0; j < temp.length; j++) {
                if (i % 2 == 0 || j % 2 == 0) temp[j] = 0;
                else temp[j] = 1;
            }
            map[i] = temp;
        }
        return map;
    }
    //检查下一位置是否越界
    function checkBor(map, x, y) {
        if (x > 0 && x < map.length && y > 0 && y < map[0].length) return true;
        else return false;
    }
    //检查下一位置是否已经访问
    function checkVal(map, x, y) {
        if (map[x][y] == 1) return true;
        else return false;
    }
    //获取可行的所有下一位置
    function getNext(map, x, y) {
        var next = [];
        if (checkBor(map, x, y + 2) && checkVal(map, x, y + 2)) next.push(0);
        if (checkBor(map, x, y - 2) && checkVal(map, x, y - 2)) next.push(1);
        if (checkBor(map, x + 2, y) && checkVal(map, x + 2, y)) next.push(2);
        if (checkBor(map, x - 2, y) && checkVal(map, x - 2, y)) next.push(3);
        return next;
    }
    //生成迷宫
    function changeMap(map, beginX, beginY) {
        var pos = [[1, 1]];
        map[beginX][beginY] = -1;
        var max = 0;
        dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        while (pos.length > 0) {
            x = pos[pos.length - 1][0];
            y = pos[pos.length - 1][1];
            pos.pop();
            while (1) {
                next = getNext(map, x, y);
                if (next.length > 0) {
                    i = next[Math.floor(Math.random() * next.length)];
                    //wx,wy表示墙的位置
                    //nx,ny表示下一位置
                    wx = x + dir[i][0];
                    wy = y + dir[i][1];
                    nx = x + dir[i][0] * 2;
                    ny = y + dir[i][1] * 2;
                    pos.push([nx, ny]);
                    map[wx][wy] = -1;
                    map[nx][ny] = -1;
                    x = nx;
                    y = ny;
                }
                else break;
            }
        }
        return map;
    }
var fw;
function findWay(maze, i, j) {
	/*
	if(parseInt(player2.position.x)%100<20){player2.position.x=player2.position.x+10;}
if(parseInt(player2.position.x)%10>80){player2.position.x=player2.position.x-10;}
if(parseInt(player2.position.y)%100<20){player2.position.y=player2.position.y+10;}
if(parseInt(player2.position.y)%10>80){player2.position.y=player2.position.y-10;}*/
	if (maze[w-2][h-2] == 2) {//通路已经找到ok
		
        return true
		//clearTimeout(fw);
    } else {
        if (maze[i][j] == -1) {//表示这个点还没有走过
            //按照策略 下->右->上->左
            maze[i][j] = 2;//假定该点可以走通
			
			//document.getElementById(i+'#'+j).style.backgroundColor="green";
			//mz2.push(i.toString()+'#'+j.toString());
			//logs(i.toString()+'#'+j.toString());
            if (findWay(maze, i + 1, j)) {//向下走
			//document.getElementById(parseInt(i+1).toString()+'#'+j).style.backgroundColor="green";
                return true
            } else if (findWay(maze, i, j + 1)) {//向右走
			//document.getElementById(i+'#'+parseInt(j+1).toString()).style.backgroundColor="green";
                return true
            } else if (findWay(maze, i - 1, j)) {//向上走
			//document.getElementById(parseInt(i-1).toString()+'#'+j).style.backgroundColor="green";
                return true
            } else if (findWay(maze, i, j - 1)) {//向左走
			//document.getElementById(i+'#'+parseInt(j-1).toString()).style.backgroundColor="green";
                return true
            } else {
                //说明走不通，是死路
                maze[i][j] = 3;
				//document.getElementById(i+'#'+j).style.backgroundColor="yellow";
				//mz2.splice(mz2.findIndex(item => item ===i.toString()+'#'+j.toString()),1);
                return false;
            }
        } else { //如果map[i][j]!=0,可能是1,2,3
            return false;
        }
    }
}
function toway(i,j){
setTimeout(function(){
if(i==w-2&&j==h-2){arr[i][j] = 9;document.getElementById(i+'#'+j).style.backgroundColor="green";return true;}	
else{
if(arr[i][j]==2){
arr[i][j] = 9;	
document.getElementById(i+'#'+j).style.backgroundColor="green";

if(toway(i,j-1)){return true;}
else if(toway(i,j+1)){return true;}
else if(toway(i-1,j)){return true;}
else if(toway(i+1,j)){return true;}
else{return false;}
}
else if(arr[i][j]==3){
arr[i][j] = 5;	
document.getElementById(i+'#'+j).style.backgroundColor="red";

if(toway(i,j-1)){return true;}
else if(toway(i,j+1)){return true;}
else if(toway(i-1,j)){return true;}
else if(toway(i+1,j)){return true;}
else{return false;}
}
//if(i>0&&arr[i-1][j]==2){arr[i][j]=9;document.getElementById(parseInt(i-1).toString()+'#'+j).style.backgroundColor="green";logs('('+i.toString()+','+j.toString()+') - 1');toway(i-1,j);}
//if(j>0&&arr[i][j-1]==2){arr[i][j]=9;document.getElementById(i+'#'+parseInt(j-1).toString()).style.backgroundColor="green";logs('('+i.toString()+','+j.toString()+') - 2');toway(i,j-1);}
//if(i<10&&arr[i+1][j]==2){arr[i][j]=9;document.getElementById(parseInt(i+1).toString()+'#'+j).style.backgroundColor="green";logs('('+i.toString()+','+j.toString()+') - 3');toway(i+1,j);}
//if(j<16&&arr[i][j+1]==2){arr[i][j]=9;document.getElementById(i+'#'+parseInt(j+1).toString()).style.backgroundColor="green";logs('('+i.toString()+','+j.toString()+') - 4');toway(i,j+1);}	
}
},1);
}
