//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./HelloWord_types');
//HELPER FUNCTIONS AND STRUCTURES

THelloWord_sayHello_args = function(args) {
  this.index = null;
  this.query = null;
  this.report = null;
  if (args) {
    if (args.index !== undefined) {
      this.index = args.index;
    }
    if (args.query !== undefined) {
      this.query = args.query;
    }
    if (args.report !== undefined) {
      this.report = args.report;
    }
  }
};
THelloWord_sayHello_args.prototype = {};
THelloWord_sayHello_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.index = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.query = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.STRING) {
        this.report = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

THelloWord_sayHello_args.prototype.write = function(output) {
  output.writeStructBegin('THelloWord_sayHello_args');
  if (this.index !== null && this.index !== undefined) {
    output.writeFieldBegin('index', Thrift.Type.STRING, 1);
    output.writeString(this.index);
    output.writeFieldEnd();
  }
  if (this.query !== null && this.query !== undefined) {
    output.writeFieldBegin('query', Thrift.Type.STRING, 2);
    output.writeString(this.query);
    output.writeFieldEnd();
  }
  if (this.report !== null && this.report !== undefined) {
    output.writeFieldBegin('report', Thrift.Type.STRING, 3);
    output.writeString(this.report);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

THelloWord_sayHello_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
THelloWord_sayHello_result.prototype = {};
THelloWord_sayHello_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRING) {
        this.success = input.readString();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

THelloWord_sayHello_result.prototype.write = function(output) {
  output.writeStructBegin('THelloWord_sayHello_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRING, 0);
    output.writeString(this.success);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

THelloWord_getFriends_args = function(args) {
  this.maxLength = null;
  if (args) {
    if (args.maxLength !== undefined) {
      this.maxLength = args.maxLength;
    }
  }
};
THelloWord_getFriends_args.prototype = {};
THelloWord_getFriends_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I64) {
        this.maxLength = input.readI64();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

THelloWord_getFriends_args.prototype.write = function(output) {
  output.writeStructBegin('THelloWord_getFriends_args');
  if (this.maxLength !== null && this.maxLength !== undefined) {
    output.writeFieldBegin('maxLength', Thrift.Type.I64, 1);
    output.writeI64(this.maxLength);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

THelloWord_getFriends_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
  }
};
THelloWord_getFriends_result.prototype = {};
THelloWord_getFriends_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.success = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = new ttypes.Person();
          elem14.read(input);
          this.success.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

THelloWord_getFriends_result.prototype.write = function(output) {
  output.writeStructBegin('THelloWord_getFriends_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.LIST, 0);
    output.writeListBegin(Thrift.Type.STRUCT, this.success.length);
    for (var iter15 in this.success)
    {
      if (this.success.hasOwnProperty(iter15))
      {
        iter15 = this.success[iter15];
        iter15.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

THelloWordClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
THelloWordClient.prototype = {};
THelloWordClient.prototype.seqid = function() { return this._seqid; }
THelloWordClient.prototype.new_seqid = function() { return this._seqid += 1; }
THelloWordClient.prototype.sayHello = function(index, query, report, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_sayHello(index, query, report);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_sayHello(index, query, report);
  }
};

THelloWordClient.prototype.send_sayHello = function(index, query, report) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('sayHello', Thrift.MessageType.CALL, this.seqid());
  var args = new THelloWord_sayHello_args();
  args.index = index;
  args.query = query;
  args.report = report;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

THelloWordClient.prototype.recv_sayHello = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new THelloWord_sayHello_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('sayHello failed: unknown result');
};
THelloWordClient.prototype.getFriends = function(maxLength, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getFriends(maxLength);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getFriends(maxLength);
  }
};

THelloWordClient.prototype.send_getFriends = function(maxLength) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getFriends', Thrift.MessageType.CALL, this.seqid());
  var args = new THelloWord_getFriends_args();
  args.maxLength = maxLength;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

THelloWordClient.prototype.recv_getFriends = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new THelloWord_getFriends_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getFriends failed: unknown result');
};
THelloWordProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
THelloWordProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

THelloWordProcessor.prototype.process_sayHello = function(seqid, input, output) {
  var args = new THelloWord_sayHello_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.sayHello.length === 3) {
    Q.fcall(this._handler.sayHello, args.index, args.query, args.report)
      .then(function(result) {
        var result = new THelloWord_sayHello_result({success: result});
        output.writeMessageBegin("sayHello", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new THelloWord_sayHello_result(err);
        output.writeMessageBegin("sayHello", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.sayHello(args.index, args.query, args.report,  function (err, result) {
      var result = new THelloWord_sayHello_result((err != null ? err : {success: result}));
      output.writeMessageBegin("sayHello", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

THelloWordProcessor.prototype.process_getFriends = function(seqid, input, output) {
  var args = new THelloWord_getFriends_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getFriends.length === 1) {
    Q.fcall(this._handler.getFriends, args.maxLength)
      .then(function(result) {
        var result = new THelloWord_getFriends_result({success: result});
        output.writeMessageBegin("getFriends", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new THelloWord_getFriends_result(err);
        output.writeMessageBegin("getFriends", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getFriends(args.maxLength,  function (err, result) {
      var result = new THelloWord_getFriends_result((err != null ? err : {success: result}));
      output.writeMessageBegin("getFriends", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}

