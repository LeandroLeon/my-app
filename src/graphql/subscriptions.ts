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
