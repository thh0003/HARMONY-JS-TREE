class treeBuilder {
    /**
     * 
     * "CODEID":"8456",
       "CODEParentID":null,
       "CODEVal":"8456",
       "CODETxt":"(Root)",
       "CODEIcon":"folder"
     */
    constructor(nodeObj, locationObj){
      
      this.CODEID = nodeObj.CODEID;
      this.CODEParentID = nodeObj.CODEParentID;
      this.CODEVal = nodeObj.CODEVal;
      this.CODETxt = nodeObj.CODETxt;
      this.CODEIcon = nodeOBj.CODEIcon;
      this.treeEdges = [new treeEdge(this.CODEID, this.CODEParentID) ];
      this.nodeType = (!this.CODEParentID)?'ROOT':'NODE';
      this.canvasNode = canvasNode(locationObj);
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
module.exports = treeBuilder;