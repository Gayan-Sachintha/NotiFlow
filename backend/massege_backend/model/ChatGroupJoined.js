const { v4: uuidv4 } = require('uuid');

class ChatGroupJoined {
  constructor(group_id, member_name) {
    this.id = uuidv4();
    this._group_id = group_id;
    this._member_name = member_name;
    this._timestamp = new Date().toISOString();
  }

  get group_id() {
    return this._group_id;
  }

  set group_id(newGroupId) {
    this._group_id = newGroupId;
  }

  get member_name() {
    return this._member_name;
  }

  set member_name(newMemberName) {
    this._member_name = newMemberName;
  }

  get timestamp() {
    return this._timestamp;
  }
}

module.exports = ChatGroupJoined;
