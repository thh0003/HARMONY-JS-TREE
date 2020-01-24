class treeEdge {
    /**
     * 
     * "CODEID":"8456",
       "CODEParentID":null,
       "CODEVal":"8456",
       "CODETxt":"(Root)",
       "CODEIcon":"folder"
     */
    constructor(fromNode, toNode, edgeLocationObj, edgeIcon='arrow.png', weight=0){
      
        this.fromNodeID = fromNode;
        this.toNodeID = toNode;
        this.edgeIcon = edgeIcon;
        this.edgeLocationObj = edgeLocationObj;
        this.weight=0;
        this.edgeCanvas = new CanvasEdge(this.edgeLocationObj, this.edgeIcon);
    }

    getCodeID (){
        return this.CODEID;
    }

    getCodeParentID (){
        return this.CODEParentID;
    }

    getCodeVal (){
        return this.CODEVal;
    }

    getCodeTxt (){
        return this.CODETxt;
    }

    getCodeIcon (){
        return this.CODEIcon;
    }

    renderNode(){}

    displayValue(){}

    
}
module.exports = treeEdge;