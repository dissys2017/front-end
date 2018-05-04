import io from 'socket.io-client';

const SERVER = 'http://192.168.137.94:5000';

class chatSocket {
  constructor(config) {
    this.url = config.url || SERVER;
    this.onRegisterSuccess = config.onRegisterSuccess || function() {};
    this.onRegisterError = config.onRegisterError || function() {};
    this.onLoginSuccess = config.onLoginSuccess || function() {};
    this.onLoginError = config.onLoginError || function() {};
    this.onAlreadyLogIn = config.onAlreadyLogIn || function() {};
    this.onReceiveGroups = config.onReceiveGroups || function() {};
    this.onUnknownGroup = config.onUnknownGroup || function() {};
    this.onReceivePreviousGroupMessage = config.onReceivePreviousGroupMessage || function() {};
    this.onReceiveMessage = config.onReceiveMessage || function() {};
    this.onNotLogInHandler = config.onNotLogInHandler || function() {};

    const socket = io.connect(this.url);

    // ---------------- registration feature ---------------- //

    // register
    this.register = (username, password) => {
      socket.emit('register', { username, password });
    };

    // register success
    socket.on('registerSuccess', () => {
      this.onRegisterSuccess();
    });

    // register username or password is not correct
    socket.on('registerFail', this.onRegisterError);

    // login
    this.login = (username, password) => {
      socket.emit('login', { username, password });
    };

    // login success
    socket.on('loggedIn', () => {
      socket.emit('getGroups');
      this.onLoginSuccess();
    });

    // login username or password is not correct
    socket.on('errNoUsername', this.onLoginError);

    // username is already login from somewhere
    socket.on('alreadySignedIn', this.onAlreadyLogIn);

    // logout
    this.logout = () => {
      socket.emit('logout');
    };

    // ---------------- post-login feature ---------------- //

    // receive group list
    socket.on('receiveGroups', data => {
      this.onReceiveGroups(data);
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
    socket.on('errUnknownGroup', this.onUnknownGroup);

    // leave group
    this.leaveGroup = gid => {
      socket.emit('leaveGroup', { gid });
    };

    // get message when receive group
    this.getPrevMessage = (gid, limit = 100) => {
      socket.emit('getPreviousMessages', { gid, limit });
    };

    // receive message when select group
    socket.on('receivePreviousMessages', data => {
      this.onReceivePreviousGroupMessage(data);
    });

    // break group
    this.breakGroup = gid => {
      if (gid) socket.emit('breakFromGroup', { gid });
    };

    // ---------------- chatting feature ---------------- //

    // send message
    this.sendMessage = (gid, message) => {
      if (gid !== '' && message !== '') {
        socket.emit('sendChatMessage', { gid, message });
      }
    };

    // receive message
    socket.on('broadcastChatMessage', data => {
      this.onReceiveMessage(data);
    });

    // ---------------- general error ---------------- //

    socket.on('errNotLoggedIn', this.onNotLogInHandler);
  }
}

export default chatSocket;
