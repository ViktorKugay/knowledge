# Все о TypeScript.

## Свойства классов

- `static` - свойство доступно во всех экземплярах класса

|  accessible on  | public | proteced | private |
| :-------------: | :----: | :------: | :-----: |
|      class      |  yes   |   yes    |   yes   |
| class children  |  yes   |   yes    |   no    |
| class instances |  yes   |    no    |   no    |

## Переменные

- Пременные `var` в JavaScript имеют функциональную область видимости, не блочную в отличие от других языков

```javascript
var foo = 123;
if (true) {
  var foo = 456;
}
console.log(foo); // 456
```

**`{}` - здесь не создает новый scope**

## Iterators

- Числовая последовательности Фибоначчи на итераторах

```javaScript

class Fib implements IterableIterator<number> {
    protected fn1 = 0;
    protected fn2 = 1;

    constructor(protected maxValue?: number) {}

    public next(): IteratorResult<number> {
        var current = this.fn1;
        this.fn1 = this.fn2;
        this.fn2 = current + this.fn1;
        if (this.maxValue != null && current >= this.maxValue) {
            return {
                done: true,
                value: null
            }
        }
        return {
            done: false,
            value: current
        }
    }

    [Symbol.iterator](): IterableIterator<number> {
        return this;
    }

}

let fib = new Fib();

fib.next() //{done: false, value: 0}
fib.next() //{done: false, value: 1}

let fibMax50 = new Fib(50);
console.log(Array.from(fibMax50)) // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
for (const num of fibMax50) {
    console.log(num); // fib num up 0 to 34
}
```

## Tagged Templates

### Шаблонные строки можно вставлять с валидацией значения.

```javaScript

const str = 'hello';
func `Name${str}world`;

function func(literals, ...placeholders) {
    console.log(literals, '=>', placeholders);
}
```

- literals - строка разбитая вставками `${str}`, которая передается в функцию
- placeholders - массив вставок `${str}`

## Интересные свойства enam

```javaScript

enum AnimalFlags {
    None =0,
    HasClaws = 1 << 0,
    CanFly  = 1 << 1,
}

type Animal = {
    flags: AnimalFlags
}

function printAnimalAbilities(animal: Animal) {
    const {flags} = animal;

    if (flags & flags.HasClaws) console.log('animal has claws');

    if (flags & flags.CanFly) console.log('animal can fly');

    if (flag & flag.None) console.log('nothing');
}

const animal: Animal = {flags: AnimalFlags.None};
printAnimalAbilities(animal) // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal) // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal) // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal) // both abilities console.log
```
