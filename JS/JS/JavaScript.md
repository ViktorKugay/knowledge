# Полезные и интересные факты о javaScript

- В javaScript существует максимальное и минимальное числовое значение - `Number.MAX_SAFE_INTEGER` и `Number.MIN_SAFE_INTEGER`.

- Так же существует максимальное числовое значение в JS - `Number.MAX_VALUE` и `Number.MIN_VALUE`.

**Все за пределами этих значение будет либо `Infinity` либо `-Infinity`**

```javascript
Function.prototype.bind = function(this_arg) {
    const local_this = this;
    const local_arguments = arguments.slice(1);
  
    return function() {
      return local_this.apply(this_arg, local_arguments.concat(arguments));
    }
}
```

```javascript
console.clear();

function SpaceShip() {
}

SpaceShip.prototype.fly = function() {
  console.log('fly!')
}

function SpaceShipTeleporter() {
  
}

SpaceShipTeleporter.prototype.teleport = function() {
  console.log('teleport!')
}

const XWing = inherit(SpaceShip, SpaceShipTeleporter);

const c1 = new XWing();

function objectCreate(prototype) {
  function Constructor() {}
  Constructor.prototype = prototype;
  
  return new Constructor();
}

function objectAssign(target, source) {
  const cache = {};
  
  const merge = (obj) => {
    for (const key in obj) {
      cache[key] = obj[key];
    }    
  };
  
  merge(target);
  merge(source);

  return cache;
}

function inherit(Parent, Child) {  
  return function() {
    function Constructor() {
      Parent.call(this);
      Child.call(this);
    }
 
    Constructor.prototype = objectAssign(objectCreate(Parent.prototype), Child.prototype);

    return new Constructor();
  }
}

console.log(c1.fly);
console.log(c1.teleport)
```
