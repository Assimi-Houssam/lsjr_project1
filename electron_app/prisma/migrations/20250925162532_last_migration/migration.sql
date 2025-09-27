-- DropIndex
DROP INDEX "lsgrResult_participantId_key";

-- CreateTable
CREATE TABLE "otherqcm" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "otherqcm_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
