CREATE TABLE `list_items`
(
    `id`         INT      NOT NULL AUTO_INCREMENT,
    `content`    TEXT     NOT NULL,
    `list_id`    INT      NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
) ENGINE = InnoDB;