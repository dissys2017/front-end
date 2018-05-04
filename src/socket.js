import io from 'socket.io-client';

const SERVER = 'http://localhost:3000';

const chatSocket = config => {
  config.url = config.url || SERVER;
  config.onRegisterSuccess = config.onRegisterSuccess || function() {};
  config.onRegisterError = config.onRegisterError || function() {};
  config.onLoginSuccess = config.onLoginSuccess || function() {};
  config.onLoginError = config.onLoginError || function() {};
  config.onAlreadyLogIn = config.onAlreadyLogIn || function() {};
  config.onReceiveGroups = config.onReceiveGroups || function() {};
  config.onUnknownGroup = config.onUnknownGroup || function() {};
  config.onReceivePreviousGroupMessage = config.onReceivePreviousGroupMessage || function() {};
  config.onReceiveMessage = config.onReceiveMessage || function() {};
  config.onNotLogInHandler = config.onNotLogInHandler || function() {};

  const socket = io.connect(config.url);

  // ---------------- registration feature ---------------- //

  // register
  this.register = (username, password) => {
    socket.emit('', {});
  };

  // register success
  socket.on('', config.onRegisterSuccess);

  // register username or password is not correct
  socket.on('', config.onRegisterError);

  // login
  this.login = (username, password) => {
    socket.emit('login', { username, password });
  };

  // login success
  socket.on('loggedIn', () => {
    socket.emit('getGroups');
    config.onLoginSuccess();
  });

  // login username or password is not correct
  socket.on('', config.onLoginError);

  // username is already login from somewhere
  socket.on('alreadySignedIn', config.onAlreadyLogIn);

  // ---------------- post-login feature ---------------- //

  // receive group list
  socket.on('receiveGroups', data => {
    config.onReceiveGroups(data);
  });

  // ---------------- group feature ---------------- //

  // create group
  this.createGroup = groupname => {
    socket.emit('createGroup', { groupname });
  };

  // join group
  this.joinGroup = gid => {
    socket.emit('joinGroup', { gid });
  };

  // join or send message to non-existing group
  socket.on('errUnknownGroup', config.onUnknownGroup);

  // leave group
  this.leaveGroup = gid => {
    socket.emit('leaveGroup', { gid });
  };

  // get message when receive group
  this.getPrevMessage = (gid, limit) => {
    socket.emit('getPreviousMessages', { gid, limit });
  };

  // receive message when select group
  socket.on('receivePreviousMessages', data => {
    config.onReceivePreviousGroupMessage(data);
  });

  // ---------------- chatting feature ---------------- //

  // send message
  this.sendMessage = (gid, message) => {
    if (gid !== '' && message !== '') {
      socket.emit('sendChatMessage', { gid, message });
    }
  };

  // receive message
  socket.on('broadcastChatMessage', data => {
    config.onReceiveMessage(data);
  });

  // ---------------- general error ---------------- //

  socket.on('errNotLoggedIn', config.onNotLogInHandler);
};

export default chatSocket;
