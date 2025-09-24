-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "motif" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Participant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Participant" ("cin", "company", "createdAt", "id", "motif", "name", "sessionId", "synced") SELECT "cin", "company", "createdAt", "id", "motif", "name", "sessionId", "synced" FROM "Participant";
DROP TABLE "Participant";
ALTER TABLE "new_Participant" RENAME TO "Participant";
CREATE TABLE "new_lsgrResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "participantId" TEXT NOT NULL,
    "lsgr1" BOOLEAN NOT NULL DEFAULT false,
    "lsgr2" BOOLEAN NOT NULL DEFAULT false,
    "lsgr3" BOOLEAN NOT NULL DEFAULT false,
    "lsgr4" BOOLEAN NOT NULL DEFAULT false,
    "lsgr5" BOOLEAN NOT NULL DEFAULT false,
    "lsgr6" BOOLEAN NOT NULL DEFAULT false,
    "lsgr7" BOOLEAN NOT NULL DEFAULT false,
    "lsgr8" BOOLEAN NOT NULL DEFAULT false,
    "lsgr9" BOOLEAN NOT NULL DEFAULT false,
    "lsgr10" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lsgrResult_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_lsgrResult" ("createdAt", "id", "lsgr1", "lsgr10", "lsgr2", "lsgr3", "lsgr4", "lsgr5", "lsgr6", "lsgr7", "lsgr8", "lsgr9", "participantId") SELECT "createdAt", "id", "lsgr1", "lsgr10", "lsgr2", "lsgr3", "lsgr4", "lsgr5", "lsgr6", "lsgr7", "lsgr8", "lsgr9", "participantId" FROM "lsgrResult";
DROP TABLE "lsgrResult";
ALTER TABLE "new_lsgrResult" RENAME TO "lsgrResult";
CREATE UNIQUE INDEX "lsgrResult_participantId_key" ON "lsgrResult"("participantId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
