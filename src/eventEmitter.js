const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const ChanelNames = {
  MessageJob: 'messageJob'
}

const createChanel = (chanelName) => ({
  push: (message) => eventEmitter.emit(chanelName, message),
  receive: (cb) => eventEmitter.on(chanelName, cb)
})

module.exports = {
  ChanelNames,
  messageJobChanel: createChanel(ChanelNames.MessageJob)
}
