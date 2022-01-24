
//const Web3 = require("web3");
//import  Web3 from "web3";
import supplyChainArtifact from "../../build/contracts/SupplyChain.json";
//const supplyChainArtifact = require('"../../build/contracts/SupplyChain.json"');
//const Portis = require("@portis/web3");
//const Web3 = require("web3");

//const supplyChainArtifact = require('"../../build/contracts/SupplyChain.json"');

const App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originFarmerID: "0x0000000000000000000000000000000000000000",
    originFarmName: null,
    originFarmInformation: null,
    originFarmLatitude: null,
    originFarmLongitude: null,
    productNotes: null,
    productPrice: 0,
    distributorID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

  start: async function() {
    App.readForm();
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = supplyChainArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        supplyChainArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
  readForm: function () {
    App.sku = $("#sku").val();
    App.upc = $("#upc").val();
    App.ownerID = $("#ownerID").val();
    App.originFarmerID = $("#originFarmerID").val();
    App.originFarmName = $("#originFarmName").val();
    App.originFarmInformation = $("#originFarmInformation").val();
    App.originFarmLatitude = $("#originFarmLatitude").val();
    App.originFarmLongitude = $("#originFarmLongitude").val();
    App.productNotes = $("#productNotes").val();
    App.productPrice = $("#productPrice").val();
    App.distributorID = $("#distributorID").val();
    App.retailerID = $("#retailerID").val();
    App.consumerID = $("#consumerID").val();

    console.log(
        App.sku,
        App.upc,
        App.ownerID, 
        App.originFarmerID, 
        App.originFarmName, 
        App.originFarmInformation, 
        App.originFarmLatitude, 
        App.originFarmLongitude, 
        App.productNotes, 
        App.productPrice, 
        App.distributorID, 
        App.retailerID, 
        App.consumerID
    );
},

  createStar: async function() {
    const { createStar } = this.meta.methods;
    const name = document.getElementById("starName").value;
    const id = document.getElementById("starId").value;
    await createStar(name, id).send({from: this.account});
    App.setStatus("New Star Owner is " + this.account + ".");
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUptokenIdToStarInfo: async function (){
    const { lookUptokenIdToStarInfo } = this.meta.methods;
    const starid = document.getElementById("starId").value;
    const starname = await lookUptokenIdToStarInfo(starid).call({from: this.account});
    
    App.setStatus("Star Name is "+ starname +".");
    //starid.innerHTML = starname;
  },
  
  fetchItemBufferOne: async function () {

        App.upc = $('#upc').val();
        console.log('upc',App.upc);
        //const { fetchItemBufferOne } = this.meta.methods;
        const fetchone = document.getElementById(App.upc);
        console.log(App.upc);
        const setinstance = await fetchItemBufferOne(fetchone).call({from: this.account});
        console.log(setinstance);
        //const setinstance=  instance.fetchItemBufferOne(fetchone);
        App.setStatus("Data One Contains "+ setinstance+".");
        

    },

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});