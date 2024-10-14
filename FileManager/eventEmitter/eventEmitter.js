export class EventEmitter {
    #EVENTS = {
      os: 'os',
      hash : 'hash',
      up : 'up',
      cd: 'cd',
      ls: 'ls',
      cat: 'cat',
      add: 'add',
      rn: 'rn',
      cp: 'cp',
      mv: 'mv',
      rm: 'rm',
      compress: 'compress',
      decompress: 'decompress'
    };
  
    constructor() {
      if (EventEmitter._instance) {
        return EventEmitter._instance;
      }
      EventEmitter._instance = this;
  
      this._listeners = {};
    }
  
    on(event, listener) {
      if (!this._listeners[event]) {
        this._listeners[event] = [];
      }
      this._listeners[event].push(listener);
    }
  
    emit(event, args = []) {
      if (this._listeners[event]) {
        this._listeners[event].forEach(listener => {
          listener(...args);
        });
      }
    }
  
    off(event, listener) {
      if (this._listeners[event]) {
        this._listeners[event] = this._listeners[event].filter(l => l !== listener);
      }
    }
  
    get events() {
      return this.#EVENTS;
    }
  }