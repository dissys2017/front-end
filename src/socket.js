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
    this.onLogout = config.onLogout || function() {};

    let socket = io.connect(this.url, {
      reconnection: true,
      reconnectionDelay: 100,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: Infinity
    });
    let uid;

    socket.on('connect', () => {
      console.log('socket is conected');
    });

    socket.on('disconnect', () => {
      console.log('socket is disconnected, try to reconnect...');
    });

    // ---------------- registration feature ---------------- //

    // register
    this.register = (username, password) => {
      socket.emit('register', { uid, username, password });
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
    socket.on('loggedIn', data => {
      uid = data.uid;
      socket.emit('getGroups', { uid });
      this.onLoginSuccess(data);
    });

    // login username or password is not correct
    socket.on('errNoUsername', this.onLoginError);

    // username is already login from somewhere
    socket.on('alreadySignedIn', this.onAlreadyLogIn);

    // logout
    this.logout = () => {
      socket.emit('logout', { uid });
    };

    // ---------------- post-login feature ---------------- //

    // receive group list
    socket.on('receiveGroups', data => {
      this.onReceiveGroups(data);
    });

    // ---------------- group feature ---------------- //

    // create group
    this.createGroup = groupname => {
      socket.emit('createGroup', { uid, groupname });
    };

    // join group
    this.joinGroup = gid => {
      socket.emit('joinGroup', { uid, gid });
    };

    // join or send message to non-existing group
    socket.on('errUnknownGroup', this.onUnknownGroup);

    // leave group
    this.leaveGroup = gid => {
      socket.emit('leaveGroup', { uid, gid });
    };

    // get message when receive group
    this.getPrevMessage = (gid, limit = 100) => {
      socket.emit('getPreviousMessages', { uid, gid, limit });
    };

    // receive message when select group
    socket.on('receivePreviousMessages', data => {
      this.onReceivePreviousGroupMessage(data);
    });

    // join room
    this.joinRoom = gid => {
      if (gid) socket.emit('joinRoom', { uid, gid });
    };

    // leave room
    this.leaveRoom = gid => {
      if (gid) socket.emit('leaveRoom', { uid, gid });
    };

    // break group
    this.breakGroup = gid => {
      if (gid) socket.emit('breakFromGroup', { uid, gid });
    };

    // ---------------- chatting feature ---------------- //

    // send message
    this.sendMessage = (gid, message) => {
      if (gid !== '' && message !== '') {
        socket.emit('sendChatMessage', { uid, gid, message });
      }
    };

    // receive message
    socket.on('broadcastChatMessage', data => {
      console.log(data);
      this.onReceiveMessage(data);
    });

    // ---------------- general error ---------------- //

    socket.on('errNotLoggedIn', this.onNotLogInHandler);
  }
}

export default chatSocket;
