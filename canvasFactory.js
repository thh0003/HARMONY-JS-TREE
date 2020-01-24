//const canvasNode = require('./canvasNode');
function canvasFactory () {};
canvasFactory.prototype.getCanvasObj= function (objType, locationObj, sizeObj, canvas){
    if(objType == null){
        return null;
        }		
        if(objType == "NODE"){
        return new canvasNode(locationObj, sizeObj, canvas);
        }
/*
    } else if(objType.equalsIgnoreCase("EDGE")){
        return new canvasEdge();
        
        } else if(objType.equalsIgnoreCase("CANVAS")){
        return new canvas();
        }
*/
}
  
//module.exports = canvasFactory;