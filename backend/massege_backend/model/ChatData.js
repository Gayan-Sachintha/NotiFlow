const { v4: uuidv4 } = require('uuid');

class ChatData {
  constructor(sender, receiver, message, status) {
    this.id = uuidv4();
    this._sender = sender;
    this._receiver = receiver;
    this._message = message;
    this._status = status;
    this._timestamp = new Date().toISOString(); 
  }

  get sender() {
    return this._sender;
  }

  set sender(newSender) {
    this._sender = newSender;
  }

  get receiver() {
    return this._receiver;
  }

  set receiver(newReceiver) {
    this._receiver = newReceiver;
  }

  get message() {
    return this._message;
  }

  set message(newMessage) {
    this._message = newMessage;
  }

  get status() {
    return this._status;
  }

  set status(newStatus) {
    this._status = newStatus;
  }

  get timestamp() {
    return this._timestamp;
  }
}

module.exports = ChatData;
