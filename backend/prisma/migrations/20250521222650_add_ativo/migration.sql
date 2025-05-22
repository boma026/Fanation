/*
  Warnings:

  - You are about to drop the column `criadoEm` on the `Recorte` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Recorte_sku_key";

-- AlterTable
ALTER TABLE "Recorte" DROP COLUMN "criadoEm",
ADD COLUMN     "ativo" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "posicao" TEXT,
ALTER COLUMN "tipoProduto" DROP NOT NULL,
ALTER COLUMN "imagemUrl" DROP NOT NULL;
