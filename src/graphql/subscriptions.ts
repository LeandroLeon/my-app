/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent($owner: String) {
    onCreateEvent(owner: $owner) {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent($owner: String) {
    onUpdateEvent(owner: $owner) {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent($owner: String) {
    onDeleteEvent(owner: $owner) {
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
export const onCreateCircular = /* GraphQL */ `
  subscription OnCreateCircular {
    onCreateCircular {
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
export const onUpdateCircular = /* GraphQL */ `
  subscription OnUpdateCircular {
    onUpdateCircular {
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
export const onDeleteCircular = /* GraphQL */ `
  subscription OnDeleteCircular {
    onDeleteCircular {
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
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee {
    onCreateEmployee {
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
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee {
    onUpdateEmployee {
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
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee {
    onDeleteEmployee {
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
