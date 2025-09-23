/*
  Warnings:

  - The required column `id` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "token" TEXT,
    "url" TEXT
);
INSERT INTO "new_user" ("token", "userId") SELECT "token", "userId" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_userId_key" ON "user"("userId");
CREATE UNIQUE INDEX "user_token_key" ON "user"("token");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
