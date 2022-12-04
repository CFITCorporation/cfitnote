/*
Powered By CFIT UNION
Author:Xpc(CIT)
Github:https://github.com/CFITCorporation/
*/
function times(){
var now = new Date();
var year = now.getFullYear();
var month = now.getMonth()+1;
var date = now.getDate();
var hour= now.getHours() < 10 ? '0'+now.getHours().toString() : now.getHours().toString();
var minute= now.getMinutes() < 10 ? '0'+now.getMinutes().toString() : now.getMinutes().toString();
var second= now.getSeconds() < 10 ? '0'+now.getSeconds().toString() : now.getSeconds().toString();
return year+'-'+month+'-'+date+' '+hour+':'+minute+':'+second;
}
var mdiv=document.getElementById('edit');
var add=document.getElementById('add');
var dele=document.getElementById('dele');
var ed=document.getElementById('ed');
var adico=document.getElementById('adico');
var ad=document.getElementById('ad');
var ev=document.getElementById('ev');
var av=document.getElementById('av');
var descdiv=document.getElementById('descdiv');
var main=document.getElementById('main');
let c = anime({targets:'#descdiv',backgroundColor:{value:['rgba(129,190,247,1)','rgba(129,190,247,0)']},easing:'linear',duration:800})
let a = anime({targets:'html',rotateX:['-30deg','0deg'],filter:{value:['blur(5px)','blur(0px)']},easing:'linear',duration:1200});
let b = anime({targets:'#main',opacity:[0,1],easing:'linear',duration:1600})
var ids='';
var count;
if(storage.getItem('cou')!=null)
{
count=storage.getItem('cou');
}
count=0;
function edit(id){
		ids=id;
	var m=document.getElementById(id);
	mdiv.innerHTML=m.innerHTML;
	mdiv.style.display='block';
	sho();
}
var del=document.getElementById('del');
var t=setInterval(function(){
count=0;
for(var i=0;i<storage.length;i++){
if(storage.getItem('note'+i)!=null)
{count=count+1;}
}
if(storage.getItem('cou')!=count){
storage.setItem('cou',count);
}
mdiv.style.top=window.innerHeight/2-180+document.body.scrollTop;
add.style.top=window.innerHeight/2-180+document.body.scrollTop;
del.style.top=window.innerHeight/2+220+document.body.scrollTop;
adico.style.top=document.body.scrollTop+5;
dele.style.top=document.body.scrollTop+55;
if(mdiv.style.opacity<=0){
del.style.display='none';mdiv.style.display='none';
}
if(add.style.opacity<=0){
add.style.display='none';
}
if(mdiv.style.opacity>0){
del.style.display='block';mdiv.style.display='block';
}
if(add.style.opacity>0){
add.style.display='block';
}
},100);
function submit(id,content,type){
id='note'+id.replace(/note/g,'');
//console.log(id);
if(content==""){
//console.log('de3');

 var data={
	 del:1,
	 id:id,
	 time:times(),
	 data:""
	 };
	 storage.setItem(id,JSON.stringify(data));
}
else
if(storage.getItem(id)==null&&type==0){
//console.log('ed1');
	 var data={
	 del:0,
	 id:id,
	 time:times(),
	 data:content
	 };
	 storage.setItem(id,JSON.stringify(data));
}else
if(storage.getItem(id)==null&&type==1){//add
//console.log('ad3');
	 var data={
	 del:0,
	 id:id,
	 time:times(),
	 data:content
	 };
	 storage.setItem(id,JSON.stringify(data));
}
else
if(JSON.parse(storage.getItem(id)).del==0&&parseInt(JSON.parse(storage.getItem(id)).id.replace(/note/g,''))<count&&type==0){//edit
//console.log('ed3');
	 var data={
	 del:0,
	 id:'note'+JSON.parse(storage.getItem(id)).id.replace(/note/g,''),
	 time:times(),
	 data:content
	 };
	 storage.setItem('note'+JSON.parse(storage.getItem(id)).id.replace(/note/g,''),JSON.stringify(data));
}


}
var mtag=0;
mdiv.onmouseenter=function(){
mtag=1;
}
mdiv.onmouseleave=function(){
mtag=0;
}
var atag=0;
add.onmouseenter=function(){
atag=1;
}
add.onmouseleave=function(){
atag=0;
}
del.onmouseenter=function(){
mtag=1;
}
del.onmouseleave=function(){
mtag=0;
}
document.onmousedown=function(event){
	if(!mtag&&mdiv.style.opacity>0){
					del.style.opacity=0;del.style.display='none';

			ev.value=ids;ed.value=mdiv.innerHTML;ad.value=add.innerHTML;
	
	
		
		hid();
	}
	if(!atag&&add.style.opacity>0){
			ids='note'+count.toString();
			av.value=ids;ed.value=mdiv.innerHTML;ad.value=add.innerHTML;
		
		hid2();
	}
}
function hid2(){
if(add.style.opacity>0){
//console.log('hid2!');
		submit(ids,add.innerHTML,1);

	let a=anime({targets:'#add',opacity:[1,0],duration:10});
add.style.display='none';
	}
}
function hid(){
if(mdiv.style.opacity>0){
//console.log('hid!');
submit(ids,mdiv.innerHTML,0);
	let a=anime({targets:'#edit',opacity:[1,0],duration:10});
	del.style.opacity=0;del.style.display='none';mdiv.style.display='none';
	
}
}
function sho(){
	let a=anime({targets:'#edit',opacity:[0,1],duration:500});
	let b=anime({targets:'#del',opacity:[0,1],duration:1500});
	ev.value=ids;del.style.display='block';
	if(add.style.opacity>0){
ed.value=mdiv.innerHTML;ad.value=add.innerHTML;		
		submit(ids,add.innerHTML,1);
		add.style.display='none';
		hid2();
		}

}
function adds(){
	let a=anime({targets:'#add',opacity:[0,1],duration:1200});
	add.style.display='block';
	add.innerHTML='';
	
	if(mdiv.style.opacity>0){
		ed.value=mdiv.innerHTML;ad.value=add.innerHTML;
	submit(ids,mdiv.innerHTML,0);
		mdiv.style.display='none';
		hid();
		}
}
setInterval(function(){
document.getElementById('more').innerHTML="";
for(var i=0;i<=count;i++){
	if(storage.getItem('note'+i)!=null)
	{
		e=JSON.parse(storage.getItem('note'+i));
		if(e.del==0){
			document.getElementById('more').innerHTML=document.getElementById('more').innerHTML+"<div class='note_common cfit' style='width: 200px; height: 200px;overflow:hidden;display:block' id='"+e.id+"' title='最近修改于"+e.time+"\n点按以编辑' onclick='edit(\""+e.id+"\")'>"+e.data+"</div>";
		}
	}
}
},200);