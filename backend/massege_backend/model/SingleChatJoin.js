const { v4: uuidv4 } = require('uuid');

class SingleChatGroup {
    constructor(temple, donor, donorname , id = uuidv4(), timestamp = new Date().toISOString()) {
      this._temple = temple;
      this._donor = donor;
      this._donorname = donorname;
      this._id = id;
      this._timestamp = timestamp;
    }
  
    get temple() {
      return this._temple;
    }
  
    set temple(newTemple) {
      this._temple = newTemple;
    }
  
    get donor() {
      return this._donor;
    }
  
    set donor(newDonor) {
      this._donor = newDonor;
    }
    
    get donorname() {
      return this._donorname;
    }
  
    set donorname(newDonorName) {
      this._donorname = newDonorName;
    }
  
    get id() {
      return this._id;
    }
  
    get timestamp() {
      return this._timestamp;
    }
  }
  
  module.exports = SingleChatGroup;
  