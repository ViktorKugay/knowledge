export function objectCreate(prototype) {
  function Constructor() {}
  Constructor.prototype = prototype;

  return new Constructor();
}
