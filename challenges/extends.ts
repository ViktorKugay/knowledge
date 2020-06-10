function Starship() {}
Starship.prototype.fly = function() {
  console.log('fly');
};

function Starliner() {}
Starliner.prototype.teleport = function() {
  console.log('teleport');
};

const starlinerBuilder = extend(Starship, Starliner);
const starliner = starlinerBuilder();

starliner.teleport();
starliner.fly();

function objectAssign(target, source) {
  const cache = {};
  const merge = obj => {
    for (const key in obj) {
      cache[key] = obj[key];
    }
  };

  merge(target);
  merge(source);

  return cache;
}

function objectCreate(prototype) {
  function Constructor() {}
  Constructor.prototype = prototype;

  return new Constructor();
}

function extend(Parent, Child) {
  return function() {
    function Constructor() {}
    Constructor.prototype = objectAssign(objectCreate(Parent.prototype), Child.prototype);

    return new Constructor();
  };
}
