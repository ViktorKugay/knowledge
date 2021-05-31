1. Big number in TypeScript

1_200_000_000 - is a valid number

2. `!` potential unsafe usage type guard. You should confident that all veriables already exist.

3. Custome type guard

```javascript

function isAdmin(usr: Admin | User): usr is Admin {
    return (<Admin>usr).role !== undefined;
}
```

- also javascript operator `in` check object properties and work like type guard in typeScript.

4. In typeScript types can be defined not only _interface_ and _type_ key word. Types can might be a class too.

```javascript

interface Action {
    type: string;
}

export class Add implements Action {
    readonly  type = "Add";
    constructor(public payload: string) {}
}

export class RemoveAl implements Action {
    readonly type = "Remove One";
}

export class RemoveOne implements Action {
    readonly type = "Remove One";
    constructor(public payload: numer) {}
}

export type TodoActions = Add | RemoveAll | RemoveOne;
```

In this example type types Add, RemoveAll, and RemoveOne implements type Action and type TodoAction union all those types in one type.

Than typeScript check **type** proprty and receive all relevant object proprties.

**Be careful! Guard property must have readonly descriptor**

Example usage

```javascript

function todoReducer(
    action: TodoActions,
    state: ITodoState = { todos: [] }
): ITodoState {
    switch (action.type) {
        case "Add": {
            return {
                todos: [...state.todos, action.payload],
            }
        }
        case "RemoveAll": {
            return {
                todos: [],
            }
        }
        case "RemoveOne": {
            return {
                todos: state.todos.slice().splice(action.payload, 1);
            }
        }
    }
}
```

5. `+` and `-` signs in typScript

```javascript

interface IPet {
    name: string;
    age: number;
    favoritesPark?: string;
}

type ReadonlyPet = {
    +readonly [K in keyof IPet]-?: IPet[K];
    // `-?` remove any optional properties from type
    // `+` sign has added *readonly* descriptor to all proprties in type so `+` is sign to add some descriptors
}
```

6. Type vs. Interfaces

```javascript
interface IAnimal {
  age: number;
  eat(): void;
  speak(): string;
}

type AnimalTypeAlias = {
  age: number,
  eat(): void,
  speak(): string,
};

let animalInterface: IAnimal;
let animalTypeAlias: AnimalTypeAlias;

animalInterface = animalTypeAlias;

// It's a valid expression because both side equivalent
```

```javascript
type Eat = (food: string) => void;
type AnimalList = string[];

interface IEat {
  (food: string): void;
}

interface IAnimalList {
  [index: number]: string;
}
```

```javascript
interface ICat extends IFeline, Pet {}

type Cat = IFeline & Pet;

class HouseCat implements IFeline, Pet {}
```

Types and Interfaces is equivalent exclude two points:

```javascript
type PetType = IDog | ICat;

interface IPet extends PetType {
  // It's not valid way, type error
}

class Pet implements PetType {
  // It's not valid way, type error
}

interface IDog {}
interface ICat {}
```

```javascript
interface Foo {
  a: string;
}

interface Foo {
  b: string;
}

let foo: Foo; //have both a and b properties
```

but

```javascript

type Foo {
    a: string;
}

type Foo {
    b: string;
}

// Error types! It's not possible

```

7. Linked list in typeScript

It's potential have a runtime error. For example: _actionNode2.next.next.next.value_ have been broken in node.js but typeScript know nothing about it.

Example below has a potential error;

```javascript
interface TreeNode<T> {
  value: T;
  left: TreeNode<T>;
  right: TreeNode<T>;
}

interface LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T>;
}

let node: LinkedListNode<string>;

interface Action {
  type: string;
}

// action1/state1 --> action2/state/2 --> action3/state3

interface ListNode<T> {
  value: T;
  next: ListNode<T>;
  prev: ListNode<T>;
}

let action1 = {type: 'LOGIN'};
let action2 = {type: 'LOAD_POSTS'};

let actionNode1: ListNode<Action> = {
  value: action1,
  next: null,
  prev: null,
};

let actionNode2: ListNode<Action> = {
  value: action2,
  next: null,
  prev: actionNode1,
};

actionNode1.next = actionNode2;

let currentNode = actionNode2;

do {
  console.log(currentNode.value);
  currentNode = currentNode.prev;
} while (currentNode);
```

8. That is a right wat

```javascript

interface Action {
    type: string;
}

interface ListNode<T> {
    value: T;
    next: ListNode<T>;
    prev: ListNode<T>;
}

class BackwardsActionIterator implements IterableIterator<Action> {
    constructor(
        private _currentAcionNode: ListNode<Action>
    ) {}

    [Symbol.iterator](): IterableIterator<Action> {
        return this;
    }

    next(): IterableIterator<Action> {
        const curr = this._currentActionNode;
        if (!curr ||| !curr.value) {
            return { value: null, done: true };
        }

        this._currentActionNodee = curr.prev;
        return { value: curr.value, done: false };
    }
}

let action1 = { type: "LOGIN" };
let action2 = { type: "LOAD_POSTS" };
let action3 = { type: "DISPLAY_POSTS" };
let action4 = { type: "LOGOUT" };

let actionNode1: ListNode<Action> = {
    prev: null;
    next: null;
    value: action1;
}

let actionNode2: ListNode<Action> = {
    prev: actionNode1,
    next: null,
    value: action2
}
actionNode1.next = actionNode2;

let actionNode3: ListNode<Action> = {
    prev: actionNode2,
    next: null,
    value: action3
}
actionNode2.next = actionNode3;

let actionNode4: ListNode<Action> = {
    prev: actionNode3,
    next: null,
    value: action4
}
actionNode3.next = actionNode4;

const backwardsActionsList = new BackwardsActionIterator(actionNode4);

for (let action of backwardsActionsList) {
    console.log(action.type);
}
```

9. Custome type guards, _unknown_ type

```javascript

interface IDataService {
    getData(): unknown;
}

let service: IDataService;

const response = service.getData();
response.a.b.c.d; // is error

if (typeof reponse === 'string') {
    console.log(response.toUpperCase());
}

// so you can check type and use value safe

// or you can use type guard
function isComment(type: any): type is IComment {
    return (<IComment>type).message !== undefined;
}
```

10. Generice functions in typeScript

```javascript

type ArrayFilter<T> = T extends any[] ? T : never;

type StringsOrNumbers = ArrayFilter<string | number | string[] | number[]>;

/*
    1. distibute -> never | never | string[] | number[]
    2. "never" is ignored -> string[] | number[]
*/
```

```javascript

interface IItemService {
    getItem<T extends string | number>(id: T): T extends string? Book : Tv;
}

let itemService = IItemService;

const book = itemService.getItem("10");
const tv = itemService.getItem(true);
```

```javascript

const numbers = [2, 1];

const someObject = {
    id: 21,
    name: 'Joe'
}

const someBoolean = true;

type FlattenArray<T extends any[]> = T[number]; // all indexes arry are number

type FlattenObject<T extends object> = T[keyof T];

type Flatten<T> = t extends any[] ? T[number] :
T extends object ? T[keyof T] :
T;

type NumbersArrayFlattened = Flatten<typeof numbers>; // --> number
type SomeObjectFlattened = Flatten<typeof someObject>;
type SomeBooleanFlattened = Flatten<typeof someBoolean>;
```

11. More generics

```javascript

function generateId(seed: number) {
    return seed + 5;
}

type ReturnType<T> = T extends (...args: infer K) => infer R ? R : any;

type Id = ReturnTye<typeof generateId>;

lookpEntity(generateId(10));

function lookupEntity(id: Id) {

}
```

```javascript

type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
const arr = [Promise.resolve(true)];

type ExpectedBoolean = UnpackPromise<typeof arr>;
```

12. Readonly nested. Deep Readonly.

```javascript

type DeepReadonlyObject<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };

type DeepReadonly<T> = T extends (infer E)[][] ?
    ReadonlyArray<ReadonlyArray<DeepReadonlyObject<E>>> :
T extends (infer E)[] ? ReadonlyArray<DeepReadonlyObject<E>> :
T extends object ? DeepReadonlyObject<T> :
T;
```

13. Decorator

```javascript
const fetch = require('node-fetch');

interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function Get(url: string) {
  return function(target: any, name: string) {
    const hiddenInstanceKey = '_$$' + name + '$$_';
    const init = () => {
      return fetch(url).then(response => response.jon());
    };

    Object.defineProperty(target, name, {
      get: function() {
        return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
      },
      configurable: true,
    });
  };
}

function First() {
  return function(target: any, name: string) {
    const hiddenInstanceKey = '_$$' + name + '$$_';

    const prevInit = Object.getOwnPropertyDescriptor(target, name).get;

    const init = () => {
      return prevInit().then(response => response.json());
    };

    Object.defineProperty(target, name, {
      get: function() {
        return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
      },
      configurable: true,
    });
  };
}

class TodoService {
  @First()
  @Get('https://localhost:3000')
  todos: Promise<ITodo[]>;
}

const todoService = new TodoService();

todoService.todos.then(todos => {
  console.log(todos);
});
```
