# Useful notes about TypeScript from some different courses

- `1_000_000` - you might write a big number like these
- `!` symbol can be used to explicitly
- `strictPropertyInitialization` with `strictNullChecks` are useful property to protect user about read undefined props. For example

```javascript
class Library {
  titles: string[];

  constructor() {}
}

const library = new Library();

library.titles.filter; // Error because titles is undefined
```

- If you have a few types objects used like function arguments you should using type guard or javascript `in` operator to check type of arg

```javascript
interface Admin {
  id: string;
  role: string;
}

interface User {
  email: string;
}

function redirect(usr: Admin | User) {
  if ('role' in usr) {
    usr.role;
  } else {
    usr.email;
  }
}
```

or add type guard

```javascript

interface Admin {
    id: string;
    role: string;
}

interface User {
    email: string;
}

function redirect(usr: Admin | User) {
    if (isAdmin(usr)) {
        usr.role;
    } else {
        usr.email;
    }
}

function isAdmin(usr: Admin | User): usr is Admin {
    return (<Admin>usr).role !== undefined;
}

```

- If you have several classes and have to filter class instances to do some action with it you can use

```javascript

class Name implements SomeType {
    readonly type = 'uniqueType'; //readonly is very important
};

type MultipleTypes = OneType | SecondType | ThirdType

// just use switch then

action: MultipleTypes;

switch(action.type) {
    case 'uniqueType':
        //use class
        break;
}

```

- just see this code. It's about readonly properties.

```javascript

interface IPet {
    name: string;
    age: number;
    favoritePark?: string;
}

type ReadonlyPet = {
    +readonly [K in keyof IPet]-?: IPet[k]; // `-?` remove all undefined | null properties into new type
}

const pet:IPet = {name: 'Buttons', age: 5};
const readonlyPet: ReadonlyPet = {
    name: 'Buttons',
    age: 5,
    favoritePark: 'Central'  // There is a good types readonly object
};

```

- `Type` and `interface` in TypeScript are no changes but one exists. Type may be First or Second type like `type SomeType = Type1 | Type2`. Interfaces don't do that. And interfaces merges of course.

- TypeScript be able create circular structure like list.next.next.next.next etc. Code like this can includesy types mistake. See example `CircularInTS.ts` to find more. You should use generators pattern. See `GeneratorsInT.ts`.

- Use `unknown` type to show developers and TS that you don't know what type will be used in this peace of code in the run time. `unknown` type protect code and much more better than `any` type in this place. `unknown` let you check type variable with `typeof` operator and then safe use variables methods or use certain actions with env.

- Typeguard look like:

```javascript

function isComment(type: any): type is Comment {
  return (<Comment>type).message !== undefined;
}
```

- Use generic types in TypeScipt flow. It's a powerfull and useful instruments to reuse a lot of peace of code.
- Use conditions instead `or`. For example: String | Number => Arg extends string ? String : Number.

```javascript

type Item<T> = {
  id: T,
  container: t extends string ? StringContainer : NumberContainer;
}
```

- Use conditinols if you need to do multiple types dinamic generics. See into `conditionalsTypes.ts` example. Really important feature.
- In some situation you can use `infer` key word for mark type of returned value. It needs to describe vlue returned from Promise for example.

```javascript

type UnpackPromise<T> = T extends Promise<infer K>[] ? K : any;
const arr = [Promise.resolve(true)];
type ExpectedBoolean = UnpackPromise<typeof arr>;
```

- If you need to do redux or react state un mutable use conditionals generic types. This is a simply way to do this.

```javascript

type DeepReadonlyObject<T> = { [K in keyof T]: T[K] };

type DeepReadonly<T> = T extends (infer E)[][] ?
  ReadonlyArray<ReadonlyArray<DeepReadonlyObject<E>>> :
  T extends (infer E)[] ? ReadonlyArray<DeepReadonlyObject<E>> ?
  T extends object ? DeepReadonlyObject<T> : T;

type DeepReadonlyState = DeepReadonly<IState>;

```

Pattern which described above a little bit complicated but it works.

- Work with class decorator in TypeScript. It's really interesting and useful method to do Object Oriented style code.
  To find more see `decoratorFunctions.ts` example.
