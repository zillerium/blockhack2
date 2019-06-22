"use strict";
const shim = require("fabric-shim");
const util = require("util");

let Chaincode = class {
  async Init(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    console.info("=========== Instantiated Parcel Chaincode ===========");
    return shim.success();
  }

  async Invoke(stub) {
    console.info("Transaction ID: " + stub.getTxID());
    console.info(util.format("Args: %j", stub.getArgs()));

    let ret = stub.getFunctionAndParameters();
    console.info(ret);

    let method = this[ret.fcn];
    if (!method) {
      console.log("no function of name:" + ret.fcn + " found");
      throw new Error("Received unknown function " + ret.fcn + " invocation");
    }
    try {
      let payload = await method(stub, ret.params, this);
      return shim.success(payload);
    } catch (err) {
      console.log(err);
      return shim.error(err);
    }
  }

  // ===============================================
  // initParcel - create a new parcel
  //   param 0 - parcelID
  //   param 1 - start location
  //   param 2 - destination
  //   param 3 - weight
  //   param 4 - owner
  // ===============================================
  async initParcel(stub, args, thisClass) {
    if (args.length != 5) {
      throw new Error("Incorrect number of arguments. Expecting 5");
    }
    // ==== Input sanitation ====
    console.info("--- start init parcel ---");
    if (args[0].length <= 0) {
      throw new Error("1st argument must be a non-empty string");
    }
    if (args[1].length <= 0) {
      throw new Error("2nd argument must be a non-empty string");
    }
    if (args[2].length <= 0) {
      throw new Error("3rd argument must be a non-empty string");
    }
    if (args[3].length <= 0) {
      throw new Error("4th argument must be a non-empty string");
    }
    if (args[4].length <= 0) {
      throw new Error("5th argument must be a non-empty string");
    }
    let parcelID = args[0];
    let parcelStartLocation = args[1];
    let parcelDestination = args[2];
    let parcelWeight = args[3];
    let parcelOwner = args[4];

    // ==== Check if parcel already exists ====
    let parcelState = await stub.getState(parcelID);
    if (parcelState.toString()) {
      throw new Error("This parcel already exists: " + userEmail);
    }

    // ==== Create parcel object and marshal to JSON ====
    let parcel = {};
    parcel.docType = "parcel";
    parcel.parcelID = parcelID;
    parcel.startLocation = parcelStartLocation;
    parcel.destination = parcelDestination;
    parcel.weight = parcelWeight;
    parcel.owner = parcelOwner;

    // === Save user to state ===
    await stub.putState(parcelID, Buffer.from(JSON.stringify(parcel)));
  }

  // ===============================================
  // readParcel - read a parcel from chaincode state
  // ===============================================
  async readParcel(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting the ID of the parcel to query"
      );
    }

    let parcelID = args[0];
    if (!parcelID) {
      throw new Error(" parcel ID must not be empty");
    }
    let parcelAsbytes = await stub.getState(parcelID); //get the parcel from chaincode state
    if (!parcelAsbytes.toString()) {
      let jsonResp = {};
      jsonResp.Error = "User does not exist: " + parcelID;
      throw new Error(JSON.stringify(jsonResp));
    }
    console.info("=======================================");
    console.log(parcelAsbytes.toString());
    console.info("=======================================");
    return parcelAsbytes;
  }

  // ==================================================
  // delete - remove a parcel key/value pair from state
  // ==================================================
  async delete(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting ID of the parcel to delete"
      );
    }
    let parcelID = args[0];
    if (!parcelID) {
      throw new Error("parcelID must not be empty");
    }
    let valAsbytes = await stub.getState(parcelID); //get the parcel from chaincode state
    let jsonResp = {};
    if (!valAsbytes) {
      jsonResp.error = "parcel does not exist: " + parcelID;
      throw new Error(jsonResp);
    }

    await stub.deleteState(parcelID); //remove the user from chaincode state
  }

  // ===============================================
  // transfer a parcel by setting a new owner email
  // ===============================================
  async transferParcel(stub, args, thisClass) {
    if (args.length < 2) {
      throw new Error(
        "Incorrect number of arguments. Expecting parcelID and new owner email"
      );
    }

    let parcelID = args[0];
    let newOwner = args[1].toLowerCase();
    console.info("- start transfer Parcel ", parcelID, newOwner);

    let parcelAsBytes = await stub.getState(parcelID);
    if (!parcelAsBytes || !parcelAsBytes.toString()) {
      throw new Error("parcel does not exist");
    }
    let parcelToTransfer = {};
    try {
      parcelToTransfer = JSON.parse(parcelAsBytes.toString());
    } catch (err) {
      let jsonResp = {};
      jsonResp.error = "Failed to decode JSON of: " + parcelID;
      throw new Error(jsonResp);
    }
    console.info(parcelToTransfer);
    parcelToTransfer.owner = newOwner; //change the owner
    let parcelAsBytes = Buffer.from(JSON.stringify(parcelToTransfer));
    await stub.putState(parcelID, parcelAsBytes); //rewrite the marble

    console.info("- end transfer parcel to new owner");
  }
};

shim.start(new Chaincode());
