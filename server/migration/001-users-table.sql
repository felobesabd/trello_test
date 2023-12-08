CREATE TABLE `trello_test_2`.`users`
(
    `id`       VARCHAR(100) NOT NULL,
    `name`     VARCHAR(100) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `email`    VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE (`username`),
    UNIQUE (`email`)
) ENGINE = InnoDB;