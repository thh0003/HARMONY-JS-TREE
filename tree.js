/**
 * 
 * @param {Object} treeDataObj - Data for the Tree
 * @param {Canvas} canvas - Canvas display HTML Element
 * @param {Object} nodeSizeObj  - size of the display nodes
 * @param {Object} canvasStyleObj - canvas Styleing
 */

function tree (treeDataObj, canvas, nodeSizeObj,canvasStyleObj){
    this.canvas = canvas;
    this.treeData = treeDataObj;
    this.treeNodes = [];
    this.allNodes = [];
    this.treeRootID = null;
    this.treeRoot = null;
    this.nodeSizeObj=nodeSizeObj;
    this.canvasStyleObj=canvasStyleObj;

}

tree.prototype.getcanvas = function (){
    return this.canvas;
}

tree.prototype.setcanvas = function (canvas){
    this.canvas = canvas;
}

/**
 * clickHandler - Either expands a TreeBranch or displays the node data then calls the callback function
 * @param {Event} e - Mouseclick Event on the Canvas
 * @param {Function} callback - Callback function after the click Event is handled
 */

tree.prototype.clickHandler = function (e, callback){

    var clickObj = {x: e.offsetX, y: e.offsetY};
    var retValue = false;
    var that = this;
    this.allNodes.forEach(function(tn){
        var cHitObj = tn.clickHit(clickObj);
        if (cHitObj.EXPAND) 
            return retValue = true;
        else if (cHitObj.VALUE) 
            return retValue = true;
    });
    
    if (callback && typeof(callback) === 'function') {

        var boundCallBack = callback.bind(this);
        boundCallBack(retValue);
    }
}

/**
 * findNode - finds a node in the tree and returns it
 * @param {string} nodeID - Node identifing string
 * 
 */

tree.prototype.findNode = function (nodeID){
    var parentNode = this.allNodes.filter(function(node){
        return node.CODEID == nodeID;
    });
    return (parentNode.length > 0)? parentNode[parentNode.length-1] : false;
}

/**
 * addTreeNode - Adds a logic node to the tree
 * @param {Object} treeNodeObj - an Object containing the data to create the node the following params are in the object
 * @param {String} CODEID - Identifier for the Node
 * @param {String} CODEParentID - Identifier of the Parent Node null if the node is a Root
 * @param {String} CODEVal - Value of the node
 * @param {String} CODETxt - Name of the node
 * @param {String} CODEIcon - display icon for the node
 */

tree.prototype.addTreeNode = function (treeNodeObj){

    try {
        var ctx = this.canvas.getContext("2d");
        ctx.font = '12px serif';
        ctx.fillStyle = this.canvasStyleObj.fillStyle;
        treeNodeObj.CODETxtMeasure = ctx.measureText(treeNodeObj.CODETxt).width;
        treeNodeObj.CODEValMeasure = ctx.measureText(treeNodeObj.CODEVal).width;
        var parentNode = (treeNodeObj.CODEParentID==null)?null:this.findNode(treeNodeObj.CODEParentID);

        var nodeFamilyInfo = {
            childCount: 0,
            childNodes: [],
        }
        var nodeDisplayInfo = {
            valState : 'COVERED',
            valInfo : {
                'COVERED':'COVERED',
                'EXPOSED':'EXPOSED'
                },
            state : 'LEAF',
            }
        var locationObj = {
            originx:null,
            originy:null,
            dx:0,
            dy:0
        }


        if(treeNodeObj.CODEParentID==null){
            this.treeRootID = treeNodeObj.CODEID;
            //set root locationinfo
            locationObj.originx = 0;
            locationObj.originx = 0;
            nodeFamilyInfo.startX = 0;
            nodeFamilyInfo.startY = 0;
            nodeFamilyInfo.endX = nodeSizeObj.length;
            nodeFamilyInfo.endY = nodeSizeObj.height;
        }
        var renderInfoObj = {
            length: this.nodeSizeObj.length,
            height: this.nodeSizeObj.height,
            canvasBG: this.canvasStyleObj.fillStyle,
            font: this.canvasStyleObj.font,
            fontPrimaryColor: this.canvasStyleObj.fontPrimaryColor,
            fontWarningColor: this.canvasStyleObj.fontWarningColor,
            leafStyle: this.canvasStyleObj.leafStyle,
            CODEIcon: treeNodeObj.CODEIcon,
            CODEValMeasure : treeNodeObj.CODEValMeasure,
            CODEVal: treeNodeObj.CODEVal,
            CODETxtMeasure: treeNodeObj.CODETxtMeasure,
            CODETxt: treeNodeObj.CODETxt
        }

        var canvasFac = new canvasFactory();
        var canvasNode = canvasFac.getCanvasObj('NODE',locationObj,renderInfoObj,this.canvas);
        var newTreeNode = new treeNode(
            treeNodeObj,
            canvasNode,
            nodeFamilyInfo,
            nodeDisplayInfo
        );

        if (this.treeRootID==treeNodeObj.CODEParentID){
            this.treeNodes.push(newTreeNode);
            this.allNodes.push(newTreeNode);
            parentNode.addChildNode(newTreeNode);
        } else if(this.treeRootID==treeNodeObj.CODEID){
            this.treeRoot = newTreeNode;
            this.allNodes.push(newTreeNode);
        }else {
            parentNode.addChildNode(newTreeNode);
            this.allNodes.push(newTreeNode);
        }

    } catch (err){
        console.error('tree-AddTreeNode '+err.message+': '+err.stack);
    }
}

/**
 * generateLogicTree - Parses the data and generates the tree from it.
 * @param {function} callback - Callback function to execute after the tree has been generated
 */
tree.prototype.generateLogicTree = function(callback){
    try{
        treeNodeData = this.treeData.map(function (nodeD) {
            return JSON.parse(JSON.stringify( nodeD ));
        });  // returns a deep copy of the node data, keeping the source of truth unaffected for future use

        while(treeNodeData.length>0){

            curNodeData = treeNodeData.shift();
            var parentNode = (curNodeData.CODEParentID==null)?null:this.findNode(curNodeData.CODEParentID);

            if (!parentNode && curNodeData.CODEParentID != null){
                treeNodeData.push(curNodeData);  //this nodes parent is not created yet or it is an orphan or another tree
            } else if (curNodeData.CODEParentID == null) {
                var newTNode = this.addTreeNode(curNodeData)

            } else {
                var newTNode = this.addTreeNode(curNodeData)

            }
        }

        if (callback && typeof(callback) === 'function') {

            var boundCallBack = callback.bind(this);
            boundCallBack();
        }
    } catch (err){
        console.error('tree-generateLogicTree '+err.message+': '+err.stack);
    }

}

/**
 * renderTree - Renders the tree onto the canvas by creating an empty canvas and calling the render method of the
 * tree root node
 */
tree.prototype.renderTree = function(){

    var ctx = this.canvas.getContext("2d");
    ctx.fillStyle = this.canvasStyleObj.fillStyle;
    ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
    var curLocObj = {x:0, y:0};
    this.treeRoot.render(this.treeRoot, curLocObj);
}