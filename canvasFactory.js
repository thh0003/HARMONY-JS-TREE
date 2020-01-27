/**
 * The Object Factory - Produces the desired canvas Object type, for future use as there is only one 
 * object type currently
 *       
 */
function canvasFactory () {};
canvasFactory.prototype.getCanvasObj= function (objType, locationObj, sizeObj, canvas){
    if(objType == null){
        return null;
        }		
        if(objType == "NODE"){
        return new canvasNode(locationObj, sizeObj, canvas);
        }
}