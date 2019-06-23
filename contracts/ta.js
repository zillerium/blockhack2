/*
# Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License").
# You may not use this file except in compliance with the License.
# A copy of the License is located at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# or in the "license" file accompanying this file. This file is distributed
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
# express or implied. See the License for the specific language governing
# permissions and limitations under the License.
#
*/

'use strict';
const shim = require('fabric-shim');
const util = require('util');

/**
 * Executes a query using a specific key
 *
 * @param {*} key - the key to use in the query
 */
async function queryByKey(stub, key) {
  console.log('============= START : queryByKey ===========');
  console.log('##### queryByKey key: ' + key);

  let resultAsBytes = await stub.getState(key);
  if (!resultAsBytes || resultAsBytes.toString().length <= 0) {
    throw new Error('##### queryByKey key: ' + key + ' does not exist');
  }
  console.log('##### queryByKey response: ' + resultAsBytes);
  console.log('============= END : queryByKey ===========');
  return resultAsBytes;
}

/************************************************************************************************
 *
 * CHAINCODE
 * This is the TraceAuth App
 * TA stores key meta data about parcels as they move in the network such as GPS
 * Agents are all actors in the network from the original sender, to the final
 * receiver, and all drivers/depot handlers are agents.
 * Each agent has a AgentID.The contract records who has control of a parcel
 * at any point in time.
 *
 ************************************************************************************************/

let Chaincode = class {

  /**
   * Initialize the state when the chaincode is either instantiated or upgraded
   *
   * @param {*} stub
   */
  async Init(stub) {
    console.log('=========== Init: Instantiated / Upgraded TA chaincode ===========');
    return shim.success();
  }

  /**
   * The Invoke method will call the methods below based on the method name passed by the calling
   * program.
   *
   * @param {*} stub
   */
  async Invoke(stub) {
    console.log('============= START : Invoke ===========');
    let ret = stub.getFunctionAndParameters();
    console.log('##### Invoke args: ' + JSON.stringify(ret));

    let method = this[ret.fcn];
    if (!method) {
      console.error('##### Invoke - error: no chaincode function with name: ' + ret.fcn + ' found');
      throw new Error('No chaincode function with name: ' + ret.fcn + ' found');
    }
    try {
      let response = await method(stub, ret.params);
      console.log('##### Invoke response payload: ' + response);
      return shim.success(response);
    } catch (err) {
      console.log('##### Invoke - error: ' + err);
      return shim.error(err);
    }
  }

  /**
   * Initialize the state. This should be explicitly called if required.
   *
   * @param {*} stub
   * @param {*} args
   */
  async initLedger(stub, args) {
    console.log('============= START : Initialize Ledger ===========');
    console.log('============= END : Initialize Ledger ===========');
  }

  /************************************************************************************************
   *
   * GeoLocation Functions
   ************************************************************************************************/

   /**
   * Creates a new Geolocation Data Object
   *
   * @param {*} stub
   * @param {*} args - JSON as follows:
   * {
   *    "parcelId":"100",
   *    "Long":"47.3757",
   *    "Lat":"8.5391999",
   *    "UnixTime": "1561075200",
   *    "AgentID": "67"
   * }
   */
  async storeGeoLocation(stub, args) {
    console.log('============= START : createDonor ===========');
    console.log('##### storeGPSLocation arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'parcelId' + json['parcelId'];

    await stub.putState(key, Buffer.from(JSON.stringify(json)));
    console.log('============= END : storeGPSLocation ===========');
  }

  /**
  * Creates a new Handover Data Object
  *
  * @param {*} stub
  * @param {*} args - JSON as follows:
  * {
  *    "parcelId":"100",
  *    "agentIdFrom":"67",
  *    "agentIdTo":"32",
  *    "Long":"47.3757",
  *    "Lat":"8.5391999",
  *    "UnixTime": "1561075200"
  * }
  */

  async storeParcelHandover(stub, args) {
    console.log('============= START : createDonor ===========');
    console.log('##### storeParcelHandover arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'handoverId' + json['parcelId']+":"+json['agentIdFrom']+json['agentIdTo'];

    await stub.putState(key, Buffer.from(JSON.stringify(json)));
    console.log('============= END : storeParcelHandover ===========');
  }

  async getParcelLocation(stub, args) {
    console.log('============= START : getParcelLocation ===========');
    console.log('##### getParcelLocation arguments: ' + JSON.stringify(args));

    // args is passed as a JSON string
    let json = JSON.parse(args);
    let key = 'parcelId' + json['parcelId'];
    return queryByKey(stub, key);
  }

}
shim.start(new Chaincode());
