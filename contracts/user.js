"use strict";
const shim = require("fabric-shim");
const util = require("util");

let Chaincode = class {
  async Init(stub) {
    let ret = stub.getFunctionAndParameters();
    console.info(ret);
    console.info("=========== Instantiated User Chaincode ===========");
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
  // initUser - create a new user
  // ===============================================
  async initUser(stub, args, thisClass) {
    if (args.length != 3) {
      throw new Error("Incorrect number of arguments. Expecting 3");
    }
    // ==== Input sanitation ====
    console.info("--- start init user ---");
    if (args[0].length <= 0) {
      throw new Error("1st argument must be a non-empty string");
    }
    if (args[1].length <= 0) {
      throw new Error("2nd argument must be a non-empty string");
    }
    if (args[2].length <= 0) {
      throw new Error("3rd argument must be a non-empty string");
    }

    let userFirstName = args[0].toLowerCase();
    let userLastName = args[1].toLowerCase();
    let userEmail = args[2].toLowerCase();

    // ==== Check if user already exists ====
    let userState = await stub.getState(userEmail);
    if (userState.toString()) {
      throw new Error("This user already exists: " + userEmail);
    }

    // ==== Create user object and marshal to JSON ====
    let user = {};
    user.docType = "user";
    user.firstName = userFirstName;
    user.lastName = userLastName;
    user.email = userEmail;

    // === Save user to state ===
    await stub.putState(userEmail, Buffer.from(JSON.stringify(user)));
  }

  // ===============================================
  // readUser - read a user from chaincode state
  // ===============================================
  async readUser(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting the email of the user to query"
      );
    }

    let email = args[0];
    if (!email) {
      throw new Error(" user email must not be empty");
    }
    let userAsbytes = await stub.getState(email); //get the user from chaincode state
    if (!userAsbytes.toString()) {
      let jsonResp = {};
      jsonResp.Error = "User does not exist: " + email;
      throw new Error(JSON.stringify(jsonResp));
    }
    console.info("=======================================");
    console.log(userAsbytes.toString());
    console.info("=======================================");
    return userAsbytes;
  }

  // ==================================================
  // delete - remove a user key/value pair from state
  // ==================================================
  async delete(stub, args, thisClass) {
    if (args.length != 1) {
      throw new Error(
        "Incorrect number of arguments. Expecting email of the user to delete"
      );
    }
    let userEmail = args[0];
    if (!userEmail) {
      throw new Error("user email must not be empty");
    }
    let valAsbytes = await stub.getState(userEmail); //get the user from chaincode state
    let jsonResp = {};
    if (!valAsbytes) {
      jsonResp.error = "user does not exist: " + userEmail;
      throw new Error(jsonResp);
    }
    let userJSON = {};
    try {
      userJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      jsonResp = {};
      jsonResp.error = "Failed to decode JSON of: " + userEmail;
      throw new Error(jsonResp);
    }

    await stub.deleteState(userEmail); //remove the user from chaincode state
  }
};

shim.start(new Chaincode());
