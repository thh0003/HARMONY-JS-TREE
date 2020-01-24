 function canvasObj (locationObj, renderInfoObj, canvas) {

    this.locationObj = locationObj;
    this.renderInfoObj = renderInfoObj;
    this.canvas = canvas;
}

canvasObj.prototype.getlocationObj = function (){
    return this.locationObj;
}

canvasObj.prototype.getrenderInfoObj = function (){
        return this.renderInfoObj;
}

canvasObj.prototype.getCanvas = function (){
        return this.canvas;
}

canvasObj.prototype.setlocationObj = function (locationobj){
        this.locationObj = locationobj;
}

canvasObj.prototype.setrenderInfoObj = function (renderInfoObj){
        this.renderInfoObj = renderInfoObj ;
}

canvasObj.prototype.setCanvas = function (canvas){
    this.canvas = canvas;
}

canvasObj.prototype.coOnClick = function (){
    return true;
}

canvasObj.prototype.coRender = function(){
    return true;
}
    
//module.exports = canvasObj;