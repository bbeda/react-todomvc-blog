/// <reference path="../typings/react/react-global.d.ts"/>
/// <reference path="./interfaces.d.ts"/>

namespace app.models{
  export class TodoModel implements ITodoModel {
    public key: string;
    public todos: Array<ITodo>;
    public onChanges = [];

    constructor(key) {
      this.key = key;
      this.todos = app.miscelanious.Utils.store(key);
      this.onChanges = [];
    }

    public subscribe(onChange) {
      this.onChanges.push(onChange);
    }

    public inform() {
      app.miscelanious.Utils.store(this.key, this.todos);
      this.onChanges.forEach(cb=> cb());
    }

    public addTodo(title: string) {
      this.todos = this.todos.concat({
        id: app.miscelanious.Utils.uuid(),
        title: title,
        completed: false
      });
    }

    public toggleAll(checked) {
      this.todos = this.todos.map<ITodo>((todo: ITodo) => {
        return app.miscelanious.Utils.extend({}, todo, { completed: checked });
      });

      this.inform();
    }

    public toggle(todoToggle) {
      this.todos = this.todos.map<ITodo>((todo: ITodo) => {
        return todo !== todoToggle ? todo : app.miscelanious.Utils.extend({}, todo, !todo.completed);
      });
    }

    public destroy(todo) {
      this.todos = this.todos.filter((candidate: ITodo) => {
        return candidate !== todo;
      });
      this.inform();
    }

    public save(todoToSave, text) {
      this.todos = this.todos.map<ITodo>((todo: ITodo) => { return todo !== todoToSave ? todo : app.miscelanious.Utils.extend({}, todo, { title: text }) });

      this.inform();
    }

    public clearCompleted() {
      this.todos = this.todos.filter((todo: ITodo) => {
        return !todo.completed;
      });

      this.inform();
    }
  }
}
