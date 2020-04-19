interface ITodo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  function Get() {
    return function(target: any, name: string) {
      const hiddenInstanceKey = "_$$" + name + "$$_";
      const init = () => {
        return Promise.resolve([{
          userId: 123,
          id: 123,
          title: 'hello',
          completed: true
        }]);
      };
  
      Object.defineProperty(target, name, {
        get: function() {
          return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
        },
        configurable: true
      });
    }
  }
  
  function First() {
    return function(target: any, name: string) {
      const hiddenInstanceKey = "_$$" + name + "$$_";
      // const prevInit = Object.getOwnPropertyDescriptor(target, name).get;
  
      const init = () => {
        return Object.getOwnPropertyDescriptor(target, name).get()
          .then(response => response[0]);
      };
  
      Object.defineProperty(target, name, {
        get: function() {
          return this[hiddenInstanceKey] || (this[hiddenInstanceKey] = init());
        },
        configurable: true
      });
    }
  }
  
  class TodoService {
      @Get()
      @First()
    todos: Promise<ITodo[]>;
  }
  
  const todoService = new TodoService();
  
  todoService.todos.then(todos => {
    console.log(todos);
  });
  
  export {};