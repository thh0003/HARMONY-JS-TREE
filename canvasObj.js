 /**
 * The Base Object which displays the Node on the HTML Canvas
 * 
 * @param {Object} locationObj - Location information to display the canvasNode - please see canvasObj for details
 *      -@param {string} originx - x coordinate on the canvas
 *      -@param {string} originy - y coordinate on the canvas
 *      -@param {string} dx - delta of x coordinate on the canvas - <<future use>>
 *      -@param {string} dy - delta of y coordinate on the canvas - <<future use>>
 * @param {HTML Canvas} canvas - Canvas display HTML Element
 * 
 * @param {Object} renderInfoObj  - renderinformation - please see canvasObj for details
 *      -@param {string} length - length of object
 *      -@param {string} height - height of object
 *      -@param {string} canvasBG - background color of the canvas
 *      -@param {string} font - font of the text out put
 *      -@param {string} fontPrimaryColor - Primary Font Color
 *      -@param {string} fontWarningColor - Warning Font color
 *      -@param {string} leafStyle - leaf color
 *      -@param {string} CODEIcon - Icon for the object
 *      -@param {string} CODEValMeasure - the length of the object Value text
 *      -@param {string} CODEVal - Object Value
 *      -@param {string} CODETxt - Name of the Object
 *      -@param {string} CODETxtMeasure - length of the Name 
 * 
 *       
 */
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

canvasObj.prototype.render = function(){
    return true;
}