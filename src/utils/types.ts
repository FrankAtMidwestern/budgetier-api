export type CreateUserType = {
  userName: string;
  email: string;
  id: number;
  uuid: string;
  createdAt: string;
};

export type UserType = {
  userName: string;
  email: string;
  id: number;
  uuid: string;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
  isDeleted?: boolean;
};
export type CreateGroupType = {
  id: number;
  name: string;
  uuid: string;
  description: string;
  type: string;
  createdAt: Date;
};

export type GroupType = {
  id: number;
  name: string;
  uuid: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export type CreateSubUserType = {
  id: number;
  groupRefId: GroupType['uuid'];
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export type SubUserType = {
  id: number;
  uuid: string;
  groupRefId: GroupType['uuid'];
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  incomes: Income[];
  expenses: Expense[];
};

export type CreateIncomeType = {
  id: number;
  uuid: string;
  subUserRefId: SubUserType['uuid'];
  type: string;
  category: string;
  description: string;
  amount: number;
  frequency: string;
  createdAt: Date;
};

export type CreateExpenseType = {
  id: number;
  uuid: string;
  subUserRefId: SubUserType['uuid'];
  type: string;
  category: string;
  description: string;
  amount: number;
  frequency: string;
  createdAt: Date;
};

export type Income = {
  id: number;
  uuid: string;
  subUserRefId: SubUserType['uuid'];
  type: string;
  category: string;
  description: string;
  amount: number;
  frequency: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export type Expense = {
  id: number;
  uuid: string;
  subUserRefId: SubUserType['uuid'];
  type: string;
  category: string;
  description: string;
  amount: number;
  frequency: string;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};

export type CreateReportType = {
  id: number;
  uuid: string;
  groupRefId: GroupType['uuid'];
  type: string;
  name: string;
  description: string;
  incomes: SubUserType['incomes'][];
  expenses: SubUserType['expenses'][];
  netLoss: boolean;
  createdAt: Date;
};

export type ReportType = {
  id: number;
  uuid: string;
  groupRefId: GroupType['uuid'];
  type: string;
  name: string;
  description: string;
  incomes: SubUserType['incomes'][];
  expenses: SubUserType['expenses'][];
  netLoss: boolean;
  createdAt: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
};
