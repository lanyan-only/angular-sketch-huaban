var sketch=angular.module("sketch",[]);
sketch.controller('sketchController', ['$scope', function($scope){
    $scope.canvasWH={width:1165,height:530};
	var canvas=document.querySelector("#canvas");
	var ctx=canvas.getContext("2d");
	var current;
    
    var clearCanvas=function(){
    	ctx.clearRect(0,0,$scope.canvasWH.width,$scope.canvasWH.height);

    }
   //判断画线还是填充
    $scope.csState={
    	fillStyle:"#000000",
    	strokeStyle:"#000000",
    	lineWidth:1,
    	style:"stroke",
    }
    $scope.setStyle=function(s){
       $scope.csState.style=s;
    }


     //工具选择  线  圆 矩形 等
    $scope.tool="line";
    $scope.tools={
    	"画线":"line",
    	"画圆":"arc",
    	"矩形":"rect",
    	"橡皮":"erase",
    	"铅笔":"pen"
    };

     $scope.settool=function(tool){
            $scope.tool=tool;
     }
    var setshape={
    	line:function(e){
	    	canvas.onmousemove=function(ev){
	           clearCanvas();
	           if(current){
	           	ctx.putImageData(current,0,0);
	           }
	           ctx.beginPath();
	            ctx.moveTo(e.offsetX,e.offsetY);
	            ctx.lineTo(ev.offsetX,ev.offsetY);
	            ctx.stroke();
	    	}
	    },
	    rect:function(e){
	    	canvas.onmousemove=function(ev){
	           clearCanvas();
	           if(current){
	           	ctx.putImageData(current,0,0);
	           }
	           ctx.beginPath();
	           //矩形
	           var w=(ev.offsetX-e.offsetX);
	           var h=(ev.offsetY-e.offsetY);
	           if($scope.csState.style=="fill"){
	           	    ctx.fillRect(e.offsetX-0.5,e.offsetY-0.5,w-0.5,h-0.5);
	           	    ctx.fill();
	           }else{
	           	   ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w-0.5,h-0.5);
	           	   ctx.stroke();
	           }
	          /* ctx.strokeRect(e.offsetX-0.5,e.offsetY-0.5,w-0.5,h-0.5);
	           ctx.stroke();*/
	           
	    	}
	    },
	    arc:function(e){
	    	canvas.onmousemove=function(ev){
	           clearCanvas();
	           if(current){
	           	ctx.putImageData(current,0,0);
	           }
	           ctx.beginPath();
	          
	           //圆
	            var ban=Math.abs(ev.offsetX-e.offsetX);
			    ctx.arc(e.offsetX,e.offsetY,ban,0,Math.PI*2);
			    if($scope.csState.style=="fill"){
			    	ctx.fill();
			    }else{
			    	ctx.stroke();
			    }
			   /* ctx.[$scope.csState.style]();*/
	    	}
	    },
	    erase:function(e){
	    	
	    	canvas.onmousemove=function(ev){
	           clearCanvas();
	           if(current){
	           	ctx.putImageData(current,0,0);
	           }
	            ctx.beginPath();
	           ctx.clearRect(e.offsetX,e.offsetY,30,30);
	    	}

	    },
	    pen:function(e){
	    	ctx.beginPath();
	            ctx.moveTo(e.offsetX,e.offsetY);
	    	canvas.onmousemove=function(ev){
	           clearCanvas();
	           if(current){
	           	ctx.putImageData(current,0,0);
	           }
	            ctx.lineTo(ev.offsetX,ev.offsetY);
	            ctx.stroke();
	    	}
	    }
    }
   
/*    $scope.fnname="l";*/
   
    canvas.onmousedown=function(e){
    	ctx.strokeStyle=$scope.csState.strokeStyle;

    	ctx.fillStyle=$scope.csState.fillStyle;

    	ctx.lineWidth=$scope.csState.lineWidth;
    	setshape[$scope.tool](e);
    	document.onmouseup=function(){
    		canvas.onmousemove=null;
    		current=ctx.getImageData(0,0,$scope.canvasWH.width,$scope.canvasWH.height);
    		ctx.stroke();
    	}
    }


    
    //保存
	$scope.save=function(ev){
		if(current){
         ev.srcElement.href=canvas.toDataURL();
		  ev.srcElement.download="mypainting.png";
		}else{
			alert("空画布");
		}
		
	}
	//新建
	$scope.newSketch=function(){

		if(current){
			if(confirm("是否保存")){
				location.href=canvas.toDataURL();
			}
		}
		clearCanvas();
		current=null;
	}
	var jiindex=0;
	$scope.colors=["red","yellow","blue","pink","orange","green"];

	//线宽
     // var state=document.querySelector(".state");
     //  var xiankuan=document.querySelector(".xiankuan");
     //  var left;
     // xiankuan.onclick=function(e){
     // 	 left=e.offsetX;
     // /*	console.log(left);*/
     // 	state.style.left=left+"px";
     // }
     // state.onclick=function(e){
     //      e.stopPropagation();
     // }
     // $scope.left=function(){
     // 	state.onmousemove=function(){

     //     $scope.csState.lineWidth=left*(40/220);
     // 	}
     // }

    
}])