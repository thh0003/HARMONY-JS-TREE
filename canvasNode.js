/**
 * The Object which displays the Node on the HTML Canvas.  It extends the canvasObj class with specific info for a Node
 * 
 * @param {Object} locationObj - Location information to display the canvasNode - please see canvasObj for details
 * 
 * @param {HTML Canvas} canvas - Canvas display HTML Element
 * 
 * @param {Object} renderInfoObj  - renderinformation - please see canvasObj for details
 * @param {Image} mainImg - Image for the node
 * @param {Image} stateImg - Image for the expansion or collapse, could have just drawn it
 *       
 */
function canvasNode (locationObj, renderInfoObj, canvas){
          canvasObj.call(this, locationObj, renderInfoObj, canvas);
          this.imgInfo = {
              'LEAF': 'blank',
              'COLLAPSE': 'plus',
              'EXPANDED': 'minus',
              'HIDDEN': ''
          };
          this.mainImg = new Image();
          this.mainImg.src = 'icon_'+this.renderInfoObj.CODEIcon+'.png';
          this.stateImg = new Image();
          this.stateImg.src = 'icon_'+this.imgInfo['LEAF']+'.png';
}

canvasNode.prototype = Object.create(canvasObj.prototype);
canvasNode.prototype.constructor = canvasNode;


canvasNode.prototype.setImg = function(state){
    this.stateImg.src = 'icon_'+this.imgInfo[state]+'.png';
}   


/**
 * clickExpand and clickValue - determine if the click was a hit on either and returns true or false
 * 
 * @param {Object} clickObj - X and Y coordinates of the click
 */
canvasNode.prototype.clickExpand = function (clickObj){
    var clickX = clickObj.x;
    var clickY = clickObj.y;
    minX = this.locationObj.originx;
    maxX = minX + this.renderInfoObj.length;
    minY = this.locationObj.originy;
    maxY = minY + this.renderInfoObj.height;

    if (clickX <= maxX && clickX >= minX && clickY <= maxY && clickY >= minY){
        return (clickX <= maxX && clickX >= minX && clickY <= maxY && clickY >= minY)?true:false;
    }
    
}
canvasNode.prototype.clickValue = function (clickObj){
    var clickX = clickObj.x;
    var clickY = clickObj.y;
    minX = this.locationObj.originx+this.renderInfoObj.length;
    maxX = minX + this.renderInfoObj.length;
    minY = this.locationObj.originy+this.locationObj.dy;
    maxY = minY + this.renderInfoObj.height;
    if (clickX <= maxX && clickX >= minX && clickY <= maxY && clickY >= minY){
         return (clickX <= maxX && clickX >= minX && clickY <= maxY && clickY >= minY)?true:false;
    }
    
}

/**
 * render - renders the canvasNode on the canvas
 * 
 * @param {treeNode} curNode - treeNode of the canvasNode
 * @param {Object} locObj - contains the x and y coordinates of the node
 */
canvasNode.prototype.render = function(curNode, locObj){
    var ctx = this.canvas.getContext("2d");
    ctx.font = '12px serif';
    var that = this;
    var disX = locObj.x * this.renderInfoObj.length;
    var disY = locObj.y * this.renderInfoObj.height;
    this.locationObj.originx = disX;
    this.locationObj.originy = disY;

    this.mainImg.onload = function() {
        ctx.fillStyle = that.renderInfoObj.fillStyle;
        ctx.drawImage(that.mainImg, disX+that.renderInfoObj.length, disY);
        if (curNode.nodeDisplayInfo.state=='LEAF'){
            ctx.fillStyle = that.renderInfoObj.leafStyle;
            ctx.fillRect(disX,disY,that.renderInfoObj.length,that.renderInfoObj.height);
        } else {
            ctx.drawImage(that.stateImg, disX, disY);
        }
    };

    this.stateImg.onload = function() {
        ctx.fillStyle = that.renderInfoObj.fillStyle;

        if (curNode.nodeDisplayInfo.state=='LEAF'){
            ctx.fillStyle = that.renderInfoObj.leafStyle;
            ctx.fillRect(disX,disY,that.renderInfoObj.length,that.renderInfoObj.height);
        } else {
            ctx.drawImage(that.stateImg, disX, disY);
        }
        
        ctx.drawImage(that.mainImg, disX+that.renderInfoObj.length, disY);
    };

    ctx.fillStyle = that.renderInfoObj.fillStyle;
    ctx.drawImage(that.mainImg, disX+that.renderInfoObj.length, disY);
    if (curNode.nodeDisplayInfo.state=='LEAF'){
        ctx.fillStyle = that.renderInfoObj.leafStyle;
        ctx.fillRect(disX,disY,that.renderInfoObj.length,that.renderInfoObj.height);
    } else {
        ctx.drawImage(that.stateImg, disX, disY);
    }
    ctx.fillStyle = that.renderInfoObj.fontPrimaryColor;
    ctx.fillText(that.renderInfoObj.CODETxt,disX+that.renderInfoObj.length*2, disY+that.renderInfoObj.height*3/4);
    if (curNode.nodeDisplayInfo.valState=='EXPOSED'){
        ctx.fillStyle = that.renderInfoObj.fontWarningColor;;
        ctx.fillText(' Value: '+that.renderInfoObj.CODEVal,disX+that.renderInfoObj.length*2+that.renderInfoObj.CODETxtMeasure, disY+that.renderInfoObj.height*3/4);
    } 
}