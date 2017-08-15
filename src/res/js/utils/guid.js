// 这里的guid不是指我们安卓的唯一用户id, 而是一个通用的生成唯一id的辅助库
const validator = new RegExp("^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$", "i");

const EMPTY = "00000000-0000-0000-0000-000000000000";

let gen = (count) => {
  let out = "";
  for (let i = 0; i < count; i += 1) {
    out += (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return out;
};

class Guid {
  constructor(guid) {
    if (!guid) {
      console.log("Invalid argument; `value` has no value.");
      return;
    }
    this.value = EMPTY;
    if (guid && guid instanceof Guid) {
      this.value = guid.toString();
    } else if (guid && Object.prototype.toString.call(guid) === "[object String]" && this.isGuid(guid)) {
      this.value = guid;
    }
    this.equals = function (other) {
      return this.isGuid(other) && this.value == other;
    };
    this.isEmpty = function () {
      return this.value === EMPTY;
    };
    this.toString = function () {
      return this.value;
    };
    this.toJSON = function () {
      return this.value;
    };
  }
  isGuid(value) {
    return value && (value instanceof Guid || validator.test(value.toString()));
  };
  create() {
    return new Guid([gen(2), gen(1), gen(1), gen(1), gen(3)].join("-"));
  };
  raw() {
    return [gen(2), gen(1), gen(1), gen(1), gen(3)].join("-");
  };
}

module.exports = Guid;
