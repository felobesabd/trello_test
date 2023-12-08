CREATE TABLE `list_items`
(
    `id`         INT      NOT NULL AUTO_INCREMENT,
    `name`       TEXT     NOT NULL,
    `user_id`    INT      NOT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
) ENGINE = InnoDB;