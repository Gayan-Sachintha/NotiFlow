const { v4: uuidv4 } = require('uuid');

class ChatGroup {
  constructor(temple, group_name , groupId) {
    this.groupId = groupId;
    this._temple = temple;
    this._group_name = group_name;
    this._timestamp = new Date().toISOString(); 
  }

  get temple() {
    return this._temple;
  }

  set temple(newTemple) {
    this._temple = newTemple;
  }

  get groupId() {
    return this._groupId;
  }

  set groupId(newGroupId) {
    this._groupId = newGroupId;
  }
  
  get group_name() {
    return this._group_name;
  }

  set group_name(newGroupName) {
    this._group_name = newGroupName;
  }

  get timestamp() {
    return this._timestamp;
  }
}

module.exports = ChatGroup;
