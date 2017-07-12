DROP DATABASE IF EXISTS espwebapp;
CREATE DATABASE espwebapp;
USE espwebapp;

DROP USER IF EXISTS 'dbwriteaccess'@'localhost';
CREATE USER 'dbwriteaccess'@'localhost' IDENTIFIED BY '123loveme';
GRANT ALL PRIVILEGES ON * . * TO 'dbwriteaccess'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE room
(
    rom_id INT NOT NULL,
    rom_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (rom_id)
);

CREATE TABLE door
(
    dor_id INT NOT NULL,
    dor_name VARCHAR(255),
    dor_room_1 INT NOT NULL,
    dor_room_2 INT NOT NULL,
    PRIMARY KEY (dor_id),
    FOREIGN KEY (dor_room_1) REFERENCES room(rom_id),
    FOREIGN KEY (dor_room_2) REFERENCES room(rom_id)
);

CREATE TABLE window
(
    win_id INT NOT NULL,
    win_name VARCHAR(255) NOT NULL,
    win_room INT NOT NULL,
    PRIMARY KEY (win_id),
    FOREIGN KEY (win_room) REFERENCES room(rom_id)
);

CREATE TABLE location
(
    loc_id INT NOT NULL,
    loc_name VARCHAR(255),
    loc_room INT,
    loc_door INT,
    loc_window INT,
    PRIMARY KEY (loc_id),
    FOREIGN KEY (loc_room) REFERENCES room(rom_id),
    FOREIGN KEY (loc_door) REFERENCES door(dor_id),
    FOREIGN KEY (loc_window) REFERENCES window(win_id)
);

CREATE TABLE esp
(
    esp_id INT NOT NULL,
    esp_name VARCHAR(255),
    esp_location INT NOT NULL,
    PRIMARY KEY (esp_id),
    FOREIGN KEY (esp_location) REFERENCES location(loc_id)
);

CREATE TABLE component_type
(
    cty_id INT NOT NULL,
    cty_type VARCHAR(255) NOT NULL,
    PRIMARY KEY (cty_id)
);

CREATE TABLE component
(
    cmp_id INT NOT NULL,
    cmp_name VARCHAR(255),
    cmp_esp INT NOT NULL,
    cmp_type INT NOT NULL,
    PRIMARY KEY (cmp_id),
    FOREIGN KEY (cmp_esp) REFERENCES esp(esp_id),
    FOREIGN KEY (cmp_type) REFERENCES component_type(cty_id)
);

CREATE TABLE dht_data
(
    dda_id int NOT NULL,
    dda_temperature DECIMAL(5,2) NOT NULL,
    dda_humidity DECIMAL(5,2) NOT NULL,
    dda_timestamp TIMESTAMP NOT NULL,
    dda_sensor INT NOT NULL,
    PRIMARY KEY (dda_id),
    FOREIGN KEY (dda_sensor) REFERENCES component(cmp_id)
);
