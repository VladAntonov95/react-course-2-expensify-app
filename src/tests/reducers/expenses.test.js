import expensesReduser from "../../reducers/expenses";
import expenses from "../fixtures/expenses";

test("Should set default state", () => {
  const state = expensesReduser(undefined, { type: "@@INIT" });
  expect(state).toEqual([]);
});

test("should remove expense by id", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id,
  };
  const state = expensesReduser(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("should not remove expense if id not found", () => {
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1",
  };
  const state = expensesReduser(expenses, action);
  expect(state).toEqual(expenses);
});

test("should add expense", () => {
  const expense = {
    id: "4",
    description: "Iphone",
    note: "",
    amount: 19500000,
    createdAt: 0,
  };
  const action = {
    type: "ADD_EXPENSE",
    expense,
  };
  const state = expensesReduser(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("should edit expense by id", () => {
  const description = "New Iphone";
  const action = {
    type: "EDIT_EXPENSE",
    id: expenses[0].id,
    updates: {
      description,
    },
  };
  const state = expensesReduser(expenses, action);
  expect(state[0].description).toEqual(description);
});

test("should not edit expense if id not found", () => {
  const description = "New Iphone";
  const action = {
    type: "EDIT_EXPENSE",
    id: "123",
    updates: {
      description,
    },
  };
  const state = expensesReduser(expenses, action);
  expect(state).toEqual(expenses);
});
