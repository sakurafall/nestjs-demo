"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const openapi = require("@nestjs/swagger");
class Todo {
    id;
    title;
    content;
    isCompleted;
    static _OPENAPI_METADATA_FACTORY() {
        return { id: { required: true, type: () => Number }, title: { required: true, type: () => String }, content: { required: true, type: () => String }, isCompleted: { required: true, type: () => Boolean } };
    }
}
exports.Todo = Todo;
//# sourceMappingURL=todo.entity.js.map