const messages = []; // the storage unit for messages, or a Queue

module.exports.enqueue = (message) => {
  console.log(`Enqueing message: ${message}`);
  messages.push(message);
};

module.exports.dequeue = () => {
  // return (messages.length === 0 ? 'I\'m empty' : messages.shift());
  if (messages.length === 0) {
    return;
  } else {
    return messages.shift();
  }

};