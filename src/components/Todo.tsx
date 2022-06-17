import React, { useEffect, useState } from "react";
import GraphQLAPI, { GRAPHQL_AUTH_MODE } from "@aws-amplify/api-graphql";
import { listTodos, ListTodosQuery, TodoType } from "../graphql";
import styles from "../styles/Todo.module.css";

const Todo = () => {
  const [todos, setTodos] = useState<ListTodosQuery | undefined>(undefined);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = (await GraphQLAPI.graphql({
          query: listTodos,
          authMode: GRAPHQL_AUTH_MODE.API_KEY,
        })) as { data: ListTodosQuery };
        console.log(response);
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className={styles.grid}>
      {todos?.listTodos?.items.map((todo: TodoType) => (
        <div>{todo.id + " " + todo.__typename}</div>
      ))}
    </div>
  );
};

export default Todo;
