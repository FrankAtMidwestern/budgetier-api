/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GroupBudget` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SubUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_subUserRefId_fkey";

-- DropForeignKey
ALTER TABLE "GroupBudget" DROP CONSTRAINT "GroupBudget_userRefId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_reportId_fkey";

-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_subUserRefId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_groupRefId_fkey";

-- DropForeignKey
ALTER TABLE "SubUser" DROP CONSTRAINT "SubUser_groupRefId_fkey";

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "GroupBudget";

-- DropTable
DROP TABLE "Income";

-- DropTable
DROP TABLE "Report";

-- DropTable
DROP TABLE "SubUser";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "hash" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "groupBudgets" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "title" VARCHAR(255),
    "description" TEXT,
    "type" TEXT,
    "isDeleted" BOOLEAN,
    "userRefId" TEXT NOT NULL,

    CONSTRAINT "groupBudgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subUsers" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "firstName" TEXT,
    "lastName" TEXT,
    "description" TEXT,
    "isDeleted" BOOLEAN DEFAULT false,
    "groupRefId" TEXT NOT NULL,
    "role" VARCHAR(255) NOT NULL,

    CONSTRAINT "subUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "incomes" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
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

    CONSTRAINT "incomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
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

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" SERIAL NOT NULL,
    "refId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN DEFAULT false,
    "title" TEXT NOT NULL,
    "groupRefId" TEXT NOT NULL,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_refId_key" ON "users"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_firstName_key" ON "users"("firstName");

-- CreateIndex
CREATE UNIQUE INDEX "users_lastName_key" ON "users"("lastName");

-- CreateIndex
CREATE UNIQUE INDEX "groupBudgets_id_key" ON "groupBudgets"("id");

-- CreateIndex
CREATE UNIQUE INDEX "groupBudgets_refId_key" ON "groupBudgets"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "groupBudgets_userRefId_key" ON "groupBudgets"("userRefId");

-- CreateIndex
CREATE UNIQUE INDEX "subUsers_id_key" ON "subUsers"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subUsers_refId_key" ON "subUsers"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "subUsers_groupRefId_key" ON "subUsers"("groupRefId");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_id_key" ON "incomes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "incomes_refId_key" ON "incomes"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "expenses_id_key" ON "expenses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "expenses_refId_key" ON "expenses"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "reports_id_key" ON "reports"("id");

-- CreateIndex
CREATE UNIQUE INDEX "reports_refId_key" ON "reports"("refId");

-- CreateIndex
CREATE UNIQUE INDEX "reports_groupRefId_key" ON "reports"("groupRefId");

-- AddForeignKey
ALTER TABLE "groupBudgets" ADD CONSTRAINT "groupBudgets_userRefId_fkey" FOREIGN KEY ("userRefId") REFERENCES "users"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subUsers" ADD CONSTRAINT "subUsers_groupRefId_fkey" FOREIGN KEY ("groupRefId") REFERENCES "groupBudgets"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_subUserRefId_fkey" FOREIGN KEY ("subUserRefId") REFERENCES "subUsers"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "incomes" ADD CONSTRAINT "incomes_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_subUserRefId_fkey" FOREIGN KEY ("subUserRefId") REFERENCES "subUsers"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "reports"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_groupRefId_fkey" FOREIGN KEY ("groupRefId") REFERENCES "groupBudgets"("refId") ON DELETE RESTRICT ON UPDATE CASCADE;
