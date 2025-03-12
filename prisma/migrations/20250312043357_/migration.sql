-- CreateTable
CREATE TABLE `suras` (
    `id` INTEGER NOT NULL,
    `sura_name` VARCHAR(100) NULL,

    INDEX `idx_id`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ayahs` (
    `id` INTEGER NOT NULL,
    `id_sura` INTEGER NULL,
    `id_verse` INTEGER NULL,
    `text_ayah` TEXT NULL,
    `text_indo` TEXT NULL,
    `text_read` TEXT NULL,
    `read_at` TIMESTAMP(0) NULL,
    `read_by` VARCHAR(100) NULL,
    `complete_at` TIMESTAMP(0) NULL,

    INDEX `idx_read_by`(`read_by`),
    INDEX `idx_read_time`(`read_at`, `complete_at`),
    INDEX `idx_sura_verse`(`id_sura`, `id_verse`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
