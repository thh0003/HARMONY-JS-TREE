const expect = chai.expect;

var canvasStyleObj = {
  fillStyle: "rgb(225, 225, 225)",
  font: '12px serif',
  fontPrimaryColor: "rgb(0, 0, 0)",
  fontWarningColor: "rgb(255, 0, 0)",
  leafStyle: "rgb(225, 225, 225)"
}


var locationObj = {
  originx:null,
  originy:null,
  dx:0,
  dy:0
}

var treeData = [  
  {"CODEID":"8456","CODEParentID":null,"CODEVal":"8456","CODETxt":"(Root)","CODEIcon":"folder"},
  {"CODEID":"8457","CODEParentID":"8456","CODEVal":"8457","CODETxt":"2016","CODEIcon":"folder"},
  {"CODEID":"8475","CODEParentID":"8458","CODEVal":"8475","CODETxt":"John","CODEIcon":"folder"},
  {"CODEID":"8458","CODEParentID":"8456","CODEVal":"8458","CODETxt":"Bobs File","CODEIcon":"folder"},
  {"CODEID":"8465","CODEParentID":"8456","CODEVal":"8465","CODETxt":"2012","CODEIcon":"folder"},
  {"CODEID":"10231","CODEParentID":"20627","CODEVal":"10231","CODETxt":"07 July","CODEIcon":"folder"},
  {"CODEID":"20627","CODEParentID":"8456","CODEVal":"20627","CODETxt":"2017","CODEIcon":"folder"},
  {"CODEID":"21124","CODEParentID":"20627","CODEVal":"21124","CODETxt":"03 March","CODEIcon":"folder"},
  {"CODEID":"21168","CODEParentID":"20627","CODEVal":"21168","CODETxt":"04 April","CODEIcon":"folder"},
  {"CODEID":"21527","CODEParentID":"20627","CODEVal":"21527","CODETxt":"06 June","CODEIcon":"folder"},
  {"CODEID":"22304","CODEParentID":"20627","CODEVal":"22304","CODETxt":"10 October","CODEIcon":"folder"}
]


var renderInfoObj = {
  length: 16,
  height: 16,
  canvasBG: "rgb(225, 225, 225)",
  font: '12px serif',
  fontPrimaryColor: "rgb(0, 0, 0)",
  fontWarningColor: "rgb(0, 0, 0)",
  leafStyle: "rgb(225, 225, 225)",
  CODEIcon: '8456',
  CODEValMeasure : 33,
  CODEVal: "4567 asasdflkjd",
  CODETxtMeasure: 45,
  CODETxt: '06 adfkl now'
}

var nodeSizeObj = {
  length: 16,
  height: 16
}

var canvas = document.getElementById("tree");

  describe("Have the canvasFactory create a canvasNode", () => {
    
    it("Return error if a canvasObject type is not specified", () => {
        const cf = new canvasFactory();
        expect(cf.getCanvasObj).to.throw(Error, 'Canvas Object type is required');
      });  

    it("Return error if a canvasObject type doesn't exist", () => {
      const cf = new canvasFactory();
      expect(cf.getCanvasObj.bind(cf.getCanvasObj,['NOT'])).to.throw(Error, 'Canvas Object does not exist');
    });        
//      locationObj, sizeObj, canvas
    it("Return an error if locationObj, sizeObj, canvas are null", () => {
      const cf = new canvasFactory();
      expect(cf.getCanvasObj.bind(cf.getCanvasObj,['NODE'])).to.throw(Error, 'All arguments are required');
    });  

  });

