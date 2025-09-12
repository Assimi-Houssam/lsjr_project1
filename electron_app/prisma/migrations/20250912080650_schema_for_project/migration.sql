-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "lsgrResult" (
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
    CONSTRAINT "lsgrResult_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "cin" TEXT NOT NULL,
    "motif" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "synced" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Participant_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionId_key" ON "Session"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "lsgrResult_participantId_key" ON "lsgrResult"("participantId");
