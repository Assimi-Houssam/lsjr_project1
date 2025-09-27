-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "result" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "lsgrResult_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_lsgrResult" ("createdAt", "id", "lsgr1", "lsgr10", "lsgr2", "lsgr3", "lsgr4", "lsgr5", "lsgr6", "lsgr7", "lsgr8", "lsgr9", "participantId") SELECT "createdAt", "id", "lsgr1", "lsgr10", "lsgr2", "lsgr3", "lsgr4", "lsgr5", "lsgr6", "lsgr7", "lsgr8", "lsgr9", "participantId" FROM "lsgrResult";
DROP TABLE "lsgrResult";
ALTER TABLE "new_lsgrResult" RENAME TO "lsgrResult";
CREATE TABLE "new_otherqcm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "participantId" TEXT NOT NULL,
    "qcm1" BOOLEAN NOT NULL DEFAULT false,
    "qcm2" BOOLEAN NOT NULL DEFAULT false,
    "qcm3" BOOLEAN NOT NULL DEFAULT false,
    "qcm4" BOOLEAN NOT NULL DEFAULT false,
    "qcm5" BOOLEAN NOT NULL DEFAULT false,
    "qcm6" BOOLEAN NOT NULL DEFAULT false,
    "qcm7" BOOLEAN NOT NULL DEFAULT false,
    "qcm8" BOOLEAN NOT NULL DEFAULT false,
    "qcm9" BOOLEAN NOT NULL DEFAULT false,
    "qcm10" BOOLEAN NOT NULL DEFAULT false,
    "result" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "otherqcm_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_otherqcm" ("createdAt", "id", "participantId", "qcm1", "qcm10", "qcm2", "qcm3", "qcm4", "qcm5", "qcm6", "qcm7", "qcm8", "qcm9") SELECT "createdAt", "id", "participantId", "qcm1", "qcm10", "qcm2", "qcm3", "qcm4", "qcm5", "qcm6", "qcm7", "qcm8", "qcm9" FROM "otherqcm";
DROP TABLE "otherqcm";
ALTER TABLE "new_otherqcm" RENAME TO "otherqcm";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
