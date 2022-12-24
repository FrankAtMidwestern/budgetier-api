-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('WEEKLY', 'BIWEEKLY', 'MONTHLY', 'QUARTERLY', 'SEMIANNUALLY', 'ANNUALLY');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupBudget" (
    "id" SERIAL NOT NULL,
    "groupRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255),
    "description" TEXT,
    "type" TEXT,
    "isDeleted" BOOLEAN,
    "userRefId" TEXT NOT NULL,

    CONSTRAINT "GroupBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubUser" (
    "id" SERIAL NOT NULL,
    "subUserRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "firstName" TEXT,
    "lastName" TEXT,
    "description" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "groupRefId" TEXT NOT NULL,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "SubUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Income" (
    "id" SERIAL NOT NULL,
    "incomeRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255),
    "description" TEXT,
    "type" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "subUserRefId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "Income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "expenseRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255),
    "description" TEXT,
    "type" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "subUserRefId" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "reportRefId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN DEFAULT false,
    "title" TEXT NOT NULL,
    "groupRefId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_userRefId_key" ON "User"("userRefId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_hash_key" ON "User"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "User_firstName_key" ON "User"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "User_lastName_key" ON "User"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "GroupBudget_id_key" ON "GroupBudget"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GroupBudget_groupRefId_key" ON "GroupBudget"("groupRefId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupBudget_userRefId_key" ON "GroupBudget"("userRefId");

-- CreateIndex
CREATE UNIQUE INDEX "SubUser_id_key" ON "SubUser"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubUser_subUserRefId_key" ON "SubUser"("subUserRefId");

-- CreateIndex
CREATE UNIQUE INDEX "SubUser_groupRefId_key" ON "SubUser"("groupRefId");

-- CreateIndex
CREATE UNIQUE INDEX "Income_id_key" ON "Income"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Income_incomeRefId_key" ON "Income"("incomeRefId");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_id_key" ON "Expense"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_expenseRefId_key" ON "Expense"("expenseRefId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Report_reportRefId_key" ON "Report"("reportRefId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_groupRefId_key" ON "Report"("groupRefId");

-- AddForeignKey
ALTER TABLE "GroupBudget" ADD CONSTRAINT "GroupBudget_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "User"("userRefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubUser" ADD CONSTRAINT "SubUser_groupRefId_fkey" FOREIGN KEY ("groupRefId") REFERENCES "GroupBudget"("groupRefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_subUserRefId_fkey" FOREIGN KEY ("subUserRefId") REFERENCES "SubUser"("subUserRefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Income" ADD CONSTRAINT "Income_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("reportRefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_subUserRefId_fkey" FOREIGN KEY ("subUserRefId") REFERENCES "SubUser"("subUserRefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("reportRefId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_groupRefId_fkey" FOREIGN KEY ("groupRefId") REFERENCES "GroupBudget"("groupRefId") ON DELETE RESTRICT ON UPDATE CASCADE;
