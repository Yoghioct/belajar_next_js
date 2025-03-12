/*
  Warnings:

  - You are about to drop the `ayahs` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `suras` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `ayahs` DROP FOREIGN KEY `ayahs_id_sura_fkey`;

-- DropTable
DROP TABLE `ayahs`;

-- DropTable
DROP TABLE `suras`;

-- CreateTable
CREATE TABLE `quran_surah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor` INTEGER NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `namaLatin` VARCHAR(191) NOT NULL,
    `jumlahAyat` INTEGER NOT NULL,
    `tempatTurun` VARCHAR(191) NOT NULL,
    `arti` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `quran_ayah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomorAyat` INTEGER NOT NULL,
    `teksArab` TEXT NOT NULL,
    `teksLatin` TEXT NOT NULL,
    `teksIndonesia` TEXT NOT NULL,
    `surahId` INTEGER NOT NULL,
    `readAt` DATETIME(3) NULL,
    `readBy` VARCHAR(100) NULL,
    `completedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `quran_ayah` ADD CONSTRAINT `quran_ayah_surahId_fkey` FOREIGN KEY (`surahId`) REFERENCES `quran_surah`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
