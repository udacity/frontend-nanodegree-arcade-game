var Сar =function(loc){
	var obj={loc:loc};
	obj.move=move;
	return obj;
};

var move=function(){
	this.loc++;
};