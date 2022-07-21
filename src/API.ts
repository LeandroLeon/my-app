/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateEventInput = {
  id?: string | null,
  title: string,
  description?: string | null,
  startDate: string,
  endDate: string,
  location: LocationType,
};

export enum LocationType {
  SALA_DE_JUNTAS = "SALA_DE_JUNTAS",
  SALON_DE_ACTOS = "SALON_DE_ACTOS",
  AULA_DE_INFORMATICA = "AULA_DE_INFORMATICA",
  AULA_DE_TEORIA_1 = "AULA_DE_TEORIA_1",
  AULA_DE_TEORIA_2 = "AULA_DE_TEORIA_2",
  AULA_DE_TEORIA_3 = "AULA_DE_TEORIA_3",
}


export type ModelEventConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  location?: ModelLocationTypeInput | null,
  and?: Array< ModelEventConditionInput | null > | null,
  or?: Array< ModelEventConditionInput | null > | null,
  not?: ModelEventConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelLocationTypeInput = {
  eq?: LocationType | null,
  ne?: LocationType | null,
};

export type Event = {
  __typename: "Event",
  id: string,
  title: string,
  description?: string | null,
  startDate: string,
  endDate: string,
  location: LocationType,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateEventInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  startDate?: string | null,
  endDate?: string | null,
  location?: LocationType | null,
};

export type DeleteEventInput = {
  id: string,
};

export type CreateCircularInput = {
  id?: string | null,
  type: string,
  title: string,
  description: string,
  attachments?: Array< string | null > | null,
  createdAt?: string | null,
};

export type ModelCircularConditionInput = {
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  attachments?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCircularConditionInput | null > | null,
  or?: Array< ModelCircularConditionInput | null > | null,
  not?: ModelCircularConditionInput | null,
};

export type Circular = {
  __typename: "Circular",
  id: string,
  type: string,
  title: string,
  description: string,
  attachments?: Array< string | null > | null,
  createdAt?: string | null,
  updatedAt: string,
};

export type UpdateCircularInput = {
  id: string,
  type?: string | null,
  title?: string | null,
  description?: string | null,
  attachments?: Array< string | null > | null,
  createdAt?: string | null,
};

export type DeleteCircularInput = {
  id: string,
};

export type CreateEmployeeInput = {
  id?: string | null,
  fullName: string,
  extension?: string | null,
  department?: string | null,
  type: string,
};

export type ModelEmployeeConditionInput = {
  fullName?: ModelStringInput | null,
  extension?: ModelStringInput | null,
  department?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelEmployeeConditionInput | null > | null,
  or?: Array< ModelEmployeeConditionInput | null > | null,
  not?: ModelEmployeeConditionInput | null,
};

export type Employee = {
  __typename: "Employee",
  id: string,
  fullName: string,
  extension?: string | null,
  department?: string | null,
  type: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateEmployeeInput = {
  id: string,
  fullName?: string | null,
  extension?: string | null,
  department?: string | null,
  type?: string | null,
};

export type DeleteEmployeeInput = {
  id: string,
};

export type ModelEventFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  startDate?: ModelStringInput | null,
  endDate?: ModelStringInput | null,
  location?: ModelLocationTypeInput | null,
  and?: Array< ModelEventFilterInput | null > | null,
  or?: Array< ModelEventFilterInput | null > | null,
  not?: ModelEventFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelEventConnection = {
  __typename: "ModelEventConnection",
  items:  Array<Event | null >,
  nextToken?: string | null,
};

export type ModelCircularFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  attachments?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelCircularFilterInput | null > | null,
  or?: Array< ModelCircularFilterInput | null > | null,
  not?: ModelCircularFilterInput | null,
};

export type ModelCircularConnection = {
  __typename: "ModelCircularConnection",
  items:  Array<Circular | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelEmployeeFilterInput = {
  id?: ModelIDInput | null,
  fullName?: ModelStringInput | null,
  extension?: ModelStringInput | null,
  department?: ModelStringInput | null,
  type?: ModelStringInput | null,
  and?: Array< ModelEmployeeFilterInput | null > | null,
  or?: Array< ModelEmployeeFilterInput | null > | null,
  not?: ModelEmployeeFilterInput | null,
};

export type ModelEmployeeConnection = {
  __typename: "ModelEmployeeConnection",
  items:  Array<Employee | null >,
  nextToken?: string | null,
};

export type CreateEventMutationVariables = {
  input: CreateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type CreateEventMutation = {
  createEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateEventMutationVariables = {
  input: UpdateEventInput,
  condition?: ModelEventConditionInput | null,
};

export type UpdateEventMutation = {
  updateEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteEventMutationVariables = {
  input: DeleteEventInput,
  condition?: ModelEventConditionInput | null,
};

export type DeleteEventMutation = {
  deleteEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type CreateCircularMutationVariables = {
  input: CreateCircularInput,
  condition?: ModelCircularConditionInput | null,
};

export type CreateCircularMutation = {
  createCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type UpdateCircularMutationVariables = {
  input: UpdateCircularInput,
  condition?: ModelCircularConditionInput | null,
};

export type UpdateCircularMutation = {
  updateCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type DeleteCircularMutationVariables = {
  input: DeleteCircularInput,
  condition?: ModelCircularConditionInput | null,
};

export type DeleteCircularMutation = {
  deleteCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type CreateEmployeeMutationVariables = {
  input: CreateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type CreateEmployeeMutation = {
  createEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateEmployeeMutationVariables = {
  input: UpdateEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type UpdateEmployeeMutation = {
  updateEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteEmployeeMutationVariables = {
  input: DeleteEmployeeInput,
  condition?: ModelEmployeeConditionInput | null,
};

export type DeleteEmployeeMutation = {
  deleteEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetEventQueryVariables = {
  id: string,
};

export type GetEventQuery = {
  getEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListEventsQueryVariables = {
  filter?: ModelEventFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEventsQuery = {
  listEvents?:  {
    __typename: "ModelEventConnection",
    items:  Array< {
      __typename: "Event",
      id: string,
      title: string,
      description?: string | null,
      startDate: string,
      endDate: string,
      location: LocationType,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetCircularQueryVariables = {
  id: string,
};

export type GetCircularQuery = {
  getCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type ListCircularsQueryVariables = {
  filter?: ModelCircularFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCircularsQuery = {
  listCirculars?:  {
    __typename: "ModelCircularConnection",
    items:  Array< {
      __typename: "Circular",
      id: string,
      type: string,
      title: string,
      description: string,
      attachments?: Array< string | null > | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CircularsByDateQueryVariables = {
  type: string,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelCircularFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type CircularsByDateQuery = {
  circularsByDate?:  {
    __typename: "ModelCircularConnection",
    items:  Array< {
      __typename: "Circular",
      id: string,
      type: string,
      title: string,
      description: string,
      attachments?: Array< string | null > | null,
      createdAt?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetEmployeeQueryVariables = {
  id: string,
};

export type GetEmployeeQuery = {
  getEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListEmployeesQueryVariables = {
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListEmployeesQuery = {
  listEmployees?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      fullName: string,
      extension?: string | null,
      department?: string | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type EmployeesSortedByExtensionQueryVariables = {
  type: string,
  extension?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelEmployeeFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type EmployeesSortedByExtensionQuery = {
  employeesSortedByExtension?:  {
    __typename: "ModelEmployeeConnection",
    items:  Array< {
      __typename: "Employee",
      id: string,
      fullName: string,
      extension?: string | null,
      department?: string | null,
      type: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateEventSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateEventSubscription = {
  onCreateEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateEventSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateEventSubscription = {
  onUpdateEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteEventSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteEventSubscription = {
  onDeleteEvent?:  {
    __typename: "Event",
    id: string,
    title: string,
    description?: string | null,
    startDate: string,
    endDate: string,
    location: LocationType,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnCreateCircularSubscription = {
  onCreateCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateCircularSubscription = {
  onUpdateCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteCircularSubscription = {
  onDeleteCircular?:  {
    __typename: "Circular",
    id: string,
    type: string,
    title: string,
    description: string,
    attachments?: Array< string | null > | null,
    createdAt?: string | null,
    updatedAt: string,
  } | null,
};

export type OnCreateEmployeeSubscription = {
  onCreateEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateEmployeeSubscription = {
  onUpdateEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteEmployeeSubscription = {
  onDeleteEmployee?:  {
    __typename: "Employee",
    id: string,
    fullName: string,
    extension?: string | null,
    department?: string | null,
    type: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
