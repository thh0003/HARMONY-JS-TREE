/**
 * Stores and controls the data and logic for the tree node
 * @param {Object} treeNodeObj - Data for the node from one record of the imported data
 *     -@param {String} CODEID - Identifier for the Node
 *     -@param {String} CODEParentID - Identifier of the Parent Node null if the node is a Root
 *     -@param {treeNode} CODEParentNode - Identifier of the Parent Node null if the node is a Root
 *     -@param {String} CODEVal - Value of the node
 *     -@param {String} CODETxt - Name of the node
 *     -@param {String} CODEIcon - Display Icon for the node
 * curNodeData.CODEParentNode
 * 
 * @param {canvasNode} canvasNode - Canvas display HTML Element
 * 
 * @param {Object} nodeFamilyInfo  - Information about the Node's "Family"
 *      -@param {Number} childCount - Number of childer the node has
 *      -@param {Array} childNodes - Array of the Node's children nodes
 *       
 * @param {Object} nodeDisplayInfo - canvas Styleing
 *      -@param {String} valState - 'COVERED' OR 'EXPOSED' state of the node value
 *      -@param {Object} valInfo - Object of the two states of the valState
 *      -@param {String} state - The state of the node display and children of the node 'LEAF','COLLAPSE','EXPANDED' determines what icon to display
 * 
 */
function treeNode (treeNodeObj, canvasNode, nodeFamilyInfo, nodeDisplayInfo){
    this.canvasNode = canvasNode;
    this.CODEID = treeNodeObj.CODEID;
    this.CODEParentID = treeNodeObj.CODEParentID;
    this.CODEParentNode = treeNodeObj.CODEParentNode;
    this.CODEVal = treeNodeObj.CODEVal;
    this.CODETxt = treeNodeObj.CODETxt;
    this.nodeFamilyInfo = nodeFamilyInfo;
    this.nodeDisplayInfo = nodeDisplayInfo;
    this.nodeType = (!this.CODEParentID)?'ROOT':(this.nodeFamilyInfo.childNodes.length > 0)?'NODE':'LEAF';
}


/**
 * addChildNode - Adds a childNode to a parentNode
 * @param {treeNode} childTreeNode - a treeNode object
 */
treeNode.prototype.addChildNode = function (childTreeNode){
    try{
        this.nodeFamilyInfo.childNodes.push(childTreeNode);
        this.nodeFamilyInfo.childCount = this.nodeFamilyInfo.childCount + 1;
        this.setNodeType('NODE');
    } catch (err){
        console.error('treeNode-addChildNode '+err.message+': '+err.stack);
    }
}

treeNode.prototype.getNodeType = function(){
    return this.nodeType;
}

treeNode.prototype.setNodeType = function(nodeType){
    try{
        var canvasNode = this.getcanvasNode();
        this.nodeType = nodeType;
        this.nodeDisplayInfo.state = (nodeType=='LEAF')?'LEAF':(nodeType=='ROOT' || nodeType=='NODE')?'EXPANDED':'COLLAPSE';
        canvasNode.setImg(this.nodeDisplayInfo.state);
    } catch (err){
        console.error('treeNode-sedNodeType '+err.message+': '+err.stack);
    }
}

treeNode.prototype.setNodeState = function(state){
    try{
        var canvasNode = this.getcanvasNode();
        this.nodeDisplayInfo.state = state;
        canvasNode.setImg(this.nodeDisplayInfo.state);
    } catch (err){
        console.error('treeNode-setNodeState '+err.message+': '+err.stack);
    }
}

treeNode.prototype.getNodeState = function(){
    return this.nodeDisplayInfo.state;
}

treeNode.prototype.getNodeFamilyInfo = function(){
    return this.nodeFamilyInfo;
}

treeNode.prototype.setNodeFamilyInfo = function(nodeFamilyInfo){
    this.nodeFamilyInfo = nodeFamilyInfo;
}

treeNode.prototype.getNodeDisplayInfo = function(){
    return this.nodeDisplayInfo;
}

treeNode.prototype.setNodeDisplayInfo = function(nodeDisplayInfo){
    this.nodeDisplayInfo = nodeDisplayInfo;
}

/**
 * render - recursively renders the node and all child nodes on the HTML canvas.
 * 1) If there are no children return render the node and return the current position
 * 2) If there are children but the curnode is in the 'COLLAPSE' state render the node and return
 *    this hides the children
 * 3) Otherwise render the children
 * 4) When you are on the last child return the current position
 * @param {treeNode} curNode - a treeNode object
 * @param {Object} curLocObj - the current X,Y coordinates on the HTML canvas
 */
treeNode.prototype.render = function (curNode, curLocObj){
    try{
        var nextLocObj = {x:curLocObj.x,y:curLocObj.y};
        curNode.canvasNode.render(curNode, curLocObj);

        if (curNode.nodeFamilyInfo.childNodes.length > 0){
            if (curNode.nodeDisplayInfo.state=='COLLAPSE'){
                return {x:nextLocObj.x,y:nextLocObj.y};
            } else {
                nextLocObj.x = nextLocObj.x+1;
                for(let x=0;x<this.nodeFamilyInfo.childNodes.length;x++){
                    if (x+1 == this.nodeFamilyInfo.childNodes.length){
                        nextLocObj.y = nextLocObj.y+1;

                        var retObj = this.nodeFamilyInfo.childNodes[x].render(this.nodeFamilyInfo.childNodes[x], nextLocObj);
                        return {x:nextLocObj.x,y:retObj.y};
                    } else {
                        nextLocObj.y = nextLocObj.y+1;
                        var retObj = this.nodeFamilyInfo.childNodes[x].render(this.nodeFamilyInfo.childNodes[x], nextLocObj);
                        nextLocObj.y = retObj.y;
                    }
                }
            }
        } else {
            return {x:nextLocObj.x,y:nextLocObj.y};
        }
    } catch (err){
        console.error('treeNode-render '+err.message+': '+err.stack);
    }

}

/**
 * clickHit - Checks to determine of the mouse click was on either of the click elements of the node
 * 1) Checks to see if the click was on the State area of the node
 *      a) If it was a hit sets the state accordingly
 * 2) Checks to see if the click was on the Value area of the node and returns
 *      b) if it was a hit sets the display value accordingly
 * @param {Object} clickObj - X, Y coordinates of the Click

 */
treeNode.prototype.clickHit = function (clickObj){
    try{
        var canvasHit = {EXPAND: false, VALUE:false};
        canvasHit.EXPAND = this.canvasNode.clickExpand(clickObj);
        if (canvasHit.EXPAND){
            var curState = this.nodeDisplayInfo.state;
            if (curState=='EXPANDED'){
                this.nodeDisplayInfo.state = 'COLLAPSE';
                this.getcanvasNode().setImg('COLLAPSE');
            } else if (curState=='COLLAPSE') {
                this.nodeDisplayInfo.state = 'EXPANDED';
                this.getcanvasNode().setImg('EXPANDED');
            }
        }
        canvasHit.VALUE = this.canvasNode.clickValue(clickObj);
        if (canvasHit.VALUE){
            var curValue = this.nodeDisplayInfo.valState;
            if (curValue=='COVERED')
                this.nodeDisplayInfo.valState = 'EXPOSED';
            else
                this.nodeDisplayInfo.valState = 'COVERED';
        }
        return canvasHit;
    } catch (err){
        console.error('treeNode-clickHit '+err.message+': '+err.stack);
    }        
    
}

treeNode.prototype.clickHitRec = function (curNode, clickObj){
    try{
        curNode.clickHit(clickObj);
        if (curNode.nodeFamilyInfo.childNodes.length > 0){
            if (curNode.nodeDisplayInfo.state=='COLLAPSE'){
                return;
            } else {
                for(let x=0;x<this.nodeFamilyInfo.childNodes.length;x++){
                    if (x+1 == this.nodeFamilyInfo.childNodes.length){
                        this.nodeFamilyInfo.childNodes[x].clickHitRec(this.nodeFamilyInfo.childNodes[x], clickObj);
                        return;
                    } else {
                        this.nodeFamilyInfo.childNodes[x].clickHitRec(this.nodeFamilyInfo.childNodes[x], clickObj);
                    }
                }
            }
        } else {
            return;
        }
    } catch (err){
        console.error('treeNode-clickHitRec '+err.message+': '+err.stack);
    }        
}

treeNode.prototype.getcanvasNode = function (){
    return this.canvasNode;
}

treeNode.prototype.setcanvasNode = function (setcanvasNode){
    this.setcanvasNode = setcanvasNode;
}

treeNode.prototype.getCODEID = function (){
    return this.CODEID;
}

treeNode.prototype.setCODEID = function (setCODEID){
    this.setCODEID = setCODEID;
}

treeNode.prototype.getCODEParentID = function (){
    return this.getCODEParentID;
}

treeNode.prototype.setCODEParentID = function (setCODEParentID){
    this.setCODEParentID = setCODEParentID;
}

treeNode.prototype.getCODEVal = function (){
    return this.getCODEVal;
}

treeNode.prototype.setCODEVal = function (setCODEVal){
    this.setCODEVal = setCODEVal;
}

treeNode.prototype.getCODETxt = function (){
    return this.getCODETxt;
}

treeNode.prototype.setCODETxt = function (setCODETxt){
    this.setCODETxt = setCODETxt;
}
