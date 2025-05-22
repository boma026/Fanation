/*
  Warnings:

  - A unique constraint covering the columns `[chave]` on the table `Recorte` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `chave` to the `Recorte` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Recorte" ADD COLUMN     "chave" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Recorte_chave_key" ON "Recorte"("chave");
