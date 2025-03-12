-- DropIndex
DROP INDEX `idx_id` ON `suras`;

-- AddForeignKey
ALTER TABLE `ayahs` ADD CONSTRAINT `ayahs_id_sura_fkey` FOREIGN KEY (`id_sura`) REFERENCES `suras`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
