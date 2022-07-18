/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
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
export const listEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        startDate
        endDate
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCircular = /* GraphQL */ `
  query GetCircular($id: ID!) {
    getCircular(id: $id) {
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
export const listCirculars = /* GraphQL */ `
  query ListCirculars(
    $filter: ModelCircularFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCirculars(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        title
        description
        attachments
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const circularsByDate = /* GraphQL */ `
  query CircularsByDate(
    $type: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCircularFilterInput
    $limit: Int
    $nextToken: String
  ) {
    circularsByDate(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        type
        title
        description
        attachments
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
