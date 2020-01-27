/**
 * 
 * @param {*[{"CODEID":"8456","CODEParentID":null,"CODEVal":"8456","CODETxt":"(Root)","CODEIcon":"folder"}] * } treeData - data from an imported source(api, database, etc) in the following format:
 * @param {*length: 16,
        height: 16} nodeSizeObj - size of each node and spacer
 * @param {fillStyle: "rgb(225, 225, 225)",
        font: '12px serif',
        fontPrimaryColor: "rgb(0, 0, 0)",
        fontWarningColor: "rgb(255, 0, 0)",
        leafStyle: "rgb(225, 225, 225)"} canvasStyleObj - styling for the canvas display output
 * @param {the HTML Canvas reference} canvas 

 treeBuilder takes the tree data and the tree style and builds the logic tree then displays the tree
 */
function treeBuilder (treeData, nodeSizeObj, canvasStyleObj, canvas){
    this.canvas = canvas;
    this.treeData = treeData;
    this.nodeSizeObj = nodeSizeObj;
    this.canvasStyleObj = canvasStyleObj;
    
}

treeBuilder.prototype.getcanvas = function (){
    return this.canvas;
}

treeBuilder.prototype.setcanvas = function (canvas){
    this.canvas = canvas;
}

/**
 * buildTree 
 * 1) creates the new Tree and then 
 * 2) Generates the logic tree from the data
 * 3) renders the tree on the canvas
 * 4) Listens for any mouse click events on the canvas
 */
treeBuilder.prototype.buildTree = function (){
    try{
        this.tree = new tree(this.treeData, this.canvas, this.nodeSizeObj, this.canvasStyleObj);
        var ctx = this.canvas.getContext("2d");
        ctx.fillStyle = canvasStyleObj.fillStyle;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        that=this;

        this.tree.generateLogicTree(function () {
            that.tree.renderTree();
        });

        this.canvas.addEventListener('click', function(e) {
            that.tree.clickHandler(e, function(go){
                that.tree.renderTree();

            });
        });
    } catch (err){
        console.error('treeBuilder-buildTree '+err.message+': '+err.stack);
    }
}