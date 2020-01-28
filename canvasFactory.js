/**
 * The Object Factory - Produces the desired canvas Object type, for future use as there is only one 
 * object type currently
 *       
 */
function canvasFactory () {};
canvasFactory.prototype.getCanvasObj= function (objType, locationObj, sizeObj, canvas){
    try{
        if(objType == null || typeof objType ==='undefined'){
            throw (new Error('Canvas Object type is required'));
        }		
        if(objType == "NODE"){
            return new canvasNode(locationObj, sizeObj, canvas);
        } else 
            throw (new Error('Canvas Object does not exist'));
    } catch (err){
        console.error('canvasFactory-constructor '+err.message+': '+err.stack);
        throw (err);
    }
    
}