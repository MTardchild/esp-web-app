DROP DATABASE IF EXISTS espwebapp;
CREATE DATABASE espwebapp;
USE espwebapp;

DROP USER IF EXISTS 'dbwriteaccess'@'localhost';
CREATE USER 'dbwriteaccess'@'localhost'
  IDENTIFIED BY '123loveme';
GRANT ALL PRIVILEGES ON *.* TO 'dbwriteaccess'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE room
(
  rom_id   INT          NOT NULL,
  rom_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (rom_id)
);

CREATE TABLE door
(
  dor_id     INT NOT NULL,
  dor_name   VARCHAR(255),
  dor_room_1 INT NOT NULL,
  dor_room_2 INT,
  PRIMARY KEY (dor_id),
  FOREIGN KEY (dor_room_1) REFERENCES room (rom_id),
  FOREIGN KEY (dor_room_2) REFERENCES room (rom_id)
);

CREATE TABLE window
(
  win_id   INT          NOT NULL,
  win_name VARCHAR(255) NOT NULL,
  win_room INT          NOT NULL,
  PRIMARY KEY (win_id),
  FOREIGN KEY (win_room) REFERENCES room (rom_id)
);

CREATE TABLE location
(
  loc_id     INT          NOT NULL,
  loc_name   VARCHAR(255) NOT NULL,
  loc_room   INT,
  loc_door   INT,
  loc_window INT,
  PRIMARY KEY (loc_id),
  FOREIGN KEY (loc_room) REFERENCES room (rom_id),
  FOREIGN KEY (loc_door) REFERENCES door (dor_id),
  FOREIGN KEY (loc_window) REFERENCES window (win_id)
);

CREATE TABLE io_board_types
(
  ibt_id   INT          NOT NULL,
  ibt_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (ibt_id)
);

CREATE TABLE esp
(
  esp_id       INT NOT NULL,
  esp_name     VARCHAR(255),
  esp_location INT NOT NULL,
  esp_ip       VARCHAR(255),
  esp_hw_id    VARCHAR(255),
  PRIMARY KEY (esp_id),
  FOREIGN KEY (esp_location) REFERENCES location (loc_id)
);

CREATE TABLE component_type
(
  cty_id   INT          NOT NULL,
  cty_type VARCHAR(255) NOT NULL,
  PRIMARY KEY (cty_id)
);

CREATE TABLE component
(
  cmp_id   INT NOT NULL,
  cmp_name VARCHAR(255),
  cmp_esp  INT,
  cmp_type INT NOT NULL,
  PRIMARY KEY (cmp_id),
  FOREIGN KEY (cmp_esp) REFERENCES esp (esp_id),
  FOREIGN KEY (cmp_type) REFERENCES component_type (cty_id)
);

CREATE TABLE io_board
(
  iob_id     INT NOT NULL,
  iob_typeId INT NOT NULL,
  iob_esp    INT NOT NULL,
  PRIMARY KEY (iob_id),
  FOREIGN KEY (iob_typeId) REFERENCES io_board_types (ibt_id),
  FOREIGN KEY (iob_esp) REFERENCES esp (esp_id)
);

CREATE TABLE io_board_pca9685
(
  iob_pca_id   INT NOT NULL,
  iob_pca_led0 INT,
  iob_pca_led1 INT,
  iob_pca_led2 INT,
  iob_pca_led3 INT,
  PRIMARY KEY (iob_pca_id),
  FOREIGN KEY (iob_pca_id) REFERENCES io_board (iob_id),
  FOREIGN KEY (iob_pca_led0) REFERENCES component (cmp_id),
  FOREIGN KEY (iob_pca_led1) REFERENCES component (cmp_id),
  FOREIGN KEY (iob_pca_led2) REFERENCES component (cmp_id),
  FOREIGN KEY (iob_pca_led3) REFERENCES component (cmp_id)
);

CREATE TABLE component_led_strip
(
  cls_id           INT NOT NULL,
  cls_start_offset INT NOT NULL,
  PRIMARY KEY (cls_id),
  FOREIGN KEY (cls_id) REFERENCES component (cmp_id)
);

CREATE TABLE component_data_dht
(
  cdd_id          INT           NOT NULL,
  cdd_temperature DECIMAL(5, 2) NOT NULL,
  cdd_humidity    DECIMAL(5, 2) NOT NULL,
  cdd_timestamp   TIMESTAMP     NOT NULL,
  cdd_component   INT           NOT NULL,
  PRIMARY KEY (cdd_id),
  FOREIGN KEY (cdd_component) REFERENCES component (cmp_id)
);

CREATE TABLE component_data_relay
(
  cdr_id        INT       NOT NULL,
  cdr_state     BOOLEAN   NOT NULL,
  cdr_timestamp TIMESTAMP NOT NULL,
  cdr_component INT       NOT NULL,
  PRIMARY KEY (cdr_id),
  FOREIGN KEY (cdr_component) REFERENCES component (cmp_id)
);

CREATE TABLE component_data_led_strip
(
  cdl_id         INT       NOT NULL,
  cdl_red        INT       NOT NULL,
  cdl_green      INT       NOT NULL,
  cdl_blue       INT       NOT NULL,
  cdl_warm_white INT       NOT NULL,
  cdl_timestamp  TIMESTAMP NOT NULL,
  cdl_component  INT       NOT NULL,
  PRIMARY KEY (cdl_id),
  FOREIGN KEY (cdl_component) REFERENCES component (cmp_id)
);

CREATE TABLE firmware
(
  fwa_id        INT           NOT NULL,
  fwa_name      VARCHAR(255),
  fwa_path      VARCHAR(1024) NOT NULL,
  fwa_timestamp TIMESTAMP     NOT NULL,
  PRIMARY KEY (fwa_id)
);

CREATE TABLE rule (
  rul_id   INT          NOT NULL,
  rul_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (rul_id)
);

CREATE TABLE rule_value (
  rva_id    INT           NOT NULL,
  rva_value DECIMAL(5, 2) NOT NULL,
  PRIMARY KEY (rva_id)
);

CREATE TABLE log_type (
  lgt_id   INT          NOT NULL,
  lgt_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (lgt_id)
);

CREATE TABLE log (
  log_id   INT  NOT NULL,
  log_type INT  NOT NULL,
  log_text TEXT NOT NULL,
  PRIMARY KEY (log_id),
  FOREIGN KEY (log_type) REFERENCES log_type (lgt_id)
);

CREATE TABLE log_file_io (
  lfi_id INT NOT NULL,
  lfi_path VARCHAR(1024) NOT NULL,
  lfi_payload TEXT NOT NULL,
  PRIMARY KEY (lfi_id),
  FOREIGN KEY (lfi_id) REFERENCES log (log_id)
);