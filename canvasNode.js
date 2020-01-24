// const canvasObj = require("./canvasObj");

function canvasNode (locationObj, renderInfoObj, canvas){
          canvasObj.call(this, locationObj, renderInfoObj, canvas);
          this.type = 'NODE';
          this.nodeType = 'LEAF';
          this.state = 'LEAF';
          this.imgInfo = {
              'LEAF': 'blank',
              'COLLAPSE': 'plus',
              'EXPANDED': 'minus'
          }
          this.mainImg = new Image();
          this.mainImg.src = `icon_${this.renderInfoObj.CODEIcon}.png`;
          this.stateImg = new Image();
          this.stateImg.src = `icon_${this.imgInfo[this.state]}.png`;
          
}

canvasNode.prototype = Object.create(canvasObj.prototype);
canvasNode.prototype.constructor = canvasNode;

canvasObj.prototype.getCNodeType = function(){
    return this.nodeType;
}

canvasObj.prototype.setCNodeType = function(nodeType){
    this.nodeType = nodeType;
    this.state = (nodeType=='LEAF')?'LEAF':(nodeType=='ROOT' || nodeType=='NODE')?'COLLAPSE':'EXPANDED';
    this.stateImg.src = `icon_${this.imgInfo[this.state]}.png`;
    this.coRender();
}

canvasObj.prototype.getCNodeState = function(){
    return this.state;
}

canvasObj.prototype.toggleCNodeState = function(){
    this.state = (this.nodeType=='LEAF')?'LEAF':(this.state=='COLLAPSE')?'EXPANDED':'COLLAPSE';
    this.stateImg.src = `icon_${this.imgInfo[this.state]}.png`;
    this.coRender();
}

canvasObj.prototype.coRender = function(){
    console.log(`Node Info:`);
    console.log(this);
    var ctx = this.canvas.getContext("2d");
    var that = this;
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.mainImg.onload = function() {
        ctx.drawImage(that.mainImg, that.locationObj.originx+that.locationObj.dx+16, that.locationObj.originy+that.locationObj.dy);
        ctx.drawImage(that.stateImg, that.locationObj.originx+that.locationObj.dx, that.locationObj.originy+that.locationObj.dy);
    };

    this.stateImg.onload = function() {
        ctx.drawImage(that.stateImg, that.locationObj.originx+that.locationObj.dx, that.locationObj.originy+that.locationObj.dy);
        ctx.drawImage(that.mainImg, that.locationObj.originx+that.locationObj.dx+16, that.locationObj.originy+that.locationObj.dy);
    };
}


//module.exports = canvasNode;