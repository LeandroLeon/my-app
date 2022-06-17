import { DeepOmit } from "./DeepOmit";
import { GetTodoQuery, ListTodosQuery } from "../API";

export type TodoType = DeepOmit<GetTodoQuery["getTodo"], "__typename">;
