/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      title
      description
      startDate
      endDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      title
      description
      startDate
      endDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      title
      description
      startDate
      endDate
      createdAt
      updatedAt
      owner
    }
  }
`;
export const createCircular = /* GraphQL */ `
  mutation CreateCircular(
    $input: CreateCircularInput!
    $condition: ModelCircularConditionInput
  ) {
    createCircular(input: $input, condition: $condition) {
      id
      type
      title
      description
      attachments
      createdAt
      updatedAt
    }
  }
`;
export const updateCircular = /* GraphQL */ `
  mutation UpdateCircular(
    $input: UpdateCircularInput!
    $condition: ModelCircularConditionInput
  ) {
    updateCircular(input: $input, condition: $condition) {
      id
      type
      title
      description
      attachments
      createdAt
      updatedAt
    }
  }
`;
export const deleteCircular = /* GraphQL */ `
  mutation DeleteCircular(
    $input: DeleteCircularInput!
    $condition: ModelCircularConditionInput
  ) {
    deleteCircular(input: $input, condition: $condition) {
      id
      type
      title
      description
      attachments
      createdAt
      updatedAt
    }
  }
`;
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
      id
      fullName
      extension
      department
      type
      createdAt
      updatedAt
    }
  }
`;
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
      id
      fullName
      extension
      department
      type
      createdAt
      updatedAt
    }
  }
`;
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
      id
      fullName
      extension
      department
      type
      createdAt
      updatedAt
    }
  }
`;
