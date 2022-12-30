/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CourseMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "CourseMembers" DROP CONSTRAINT "CourseMembers_courseId_fkey";

-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Course_id_seq";

-- AlterTable
ALTER TABLE "CourseMembers" DROP CONSTRAINT "CourseMembers_pkey",
ALTER COLUMN "courseId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CourseMembers_pkey" PRIMARY KEY ("userId", "courseId", "role");

-- AddForeignKey
ALTER TABLE "CourseMembers" ADD CONSTRAINT "CourseMembers_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
