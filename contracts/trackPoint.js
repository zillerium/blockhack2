"use strict";
const shim = require("fabric-shim");
const util = require("util");

let Chaincode = class {
  async Init(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    console.info("=========== Instantiated Track Point Chaincode ===========");
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
  // initTrackPoint - create a new tracking point
  // ===============================================
  async initTrackPoint(stub, args, thisClass) {
    if (args.length != 5) {
      throw new Error("Incorrect number of arguments. Expecting 4");
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

    let parcelID = args[0];
    let userEmail = args[1];
    let trackDate = args[2];
    let trackLocation = args[3];

    // ==== Create track point and marshal to JSON ====
    let track = {};
    track.docType = "track";
    trackparcelID = parcelID;
    track.userEmail = userEmail;
    track.trackDate = trackDate;
    track.trackLocation = trackLocation;

    // we effectively have a composite key for the track
    // = parcelID||userEmail||trackDate
    let trackID = parcelID || userEmail || trackDate;

    await stub.putState(trackID, Buffer.from(JSON.stringify(track)));

    let indexName = "trackPK";
    let trackIndexKey = await stub.createCompositeKey(indexName, [
      parcelID,
      userEmail,
      trackDate
    ]);
    console.info(trackIndexKey);
    await stub.putState(trackIndexKey, Buffer.from("\u0000"));

    console.info("- end init marble");
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

  // TODO - need a query to display tracks

  //   async getTracksByUser(stub, args, thisClass) {

  //   let user  = args[0];
  //   // Query the tracks based on user
  //     let trackResultsIterator = await stub.getStateByPartialCompositeKey('trackPK', [user]);
  //     while (true) {
  //         let responseRange = await trackResultsIterator.next();
  //         if (!responseRange || !responseRange.value || !responseRange.value.key) {
  //           return;
  //         }
  //         console.log(responseRange.value.key);
};

shim.start(new Chaincode());
