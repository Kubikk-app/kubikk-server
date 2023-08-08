/*
  Warnings:

  - A unique constraint covering the columns `[projectRoleId]` on the table `ProjectTeam` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectRoleId` to the `ProjectTeam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectTeam" ADD COLUMN     "projectRoleId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTeam_projectRoleId_key" ON "ProjectTeam"("projectRoleId");

-- AddForeignKey
ALTER TABLE "ProjectTeam" ADD CONSTRAINT "ProjectTeam_projectRoleId_fkey" FOREIGN KEY ("projectRoleId") REFERENCES "ProjectRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
