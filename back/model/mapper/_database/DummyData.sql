USE espwebapp;

INSERT INTO room VALUES (1, "Living Room");
INSERT INTO room VALUES (2, "Kitchen");

INSERT INTO door VALUES (1, "Random Door", 1, 2);

INSERT INTO window VALUES (1, "TV Left", 1);
INSERT INTO window VALUES (2, "TV Right", 1);

INSERT INTO location VALUES (1, "My Place To Be", 1, 1, NULL);
INSERT INTO location VALUES (2, "Behind TV", 1, NULL, NULL);
INSERT INTO location VALUES (3, "Garden", NULL, NULL, NULL);

INSERT INTO esp VALUES (1, "DoorEsp", 1, "192.168.178.154", "esp_hwidshitz");
INSERT INTO esp VALUES (2, "TVEsp", 2, "192.168.178.122", "esp_hackathon");
INSERT INTO esp VALUES (3, "GardenWateringEsp", 3, "192.168.178.179", "esp_xyz12356");

INSERT INTO component_type VALUES (1, "dht");
INSERT INTO component_type VALUES (2, "relay");
INSERT INTO component_type VALUES (3, "ledStrip");

INSERT INTO component VALUES (1, "", 1, 1);
INSERT INTO component VALUES (2, "Television", 1, 2);
INSERT INTO component VALUES (3, "Heater", 1, 2);
INSERT INTO component VALUES (4, "Dehumidifier", 2, 2);
INSERT INTO component VALUES (5, "", 2, 1);
INSERT INTO component VALUES (6, "Television", 2, 3);
INSERT INTO component VALUES (7, "Bed", 1, 3);

INSERT INTO component_led_strip VALUES (6, 0);
INSERT INTO component_led_strip VALUES (7, 4);

INSERT INTO component_data_dht VALUES (1, 23.4, 57.3, NOW(), 1);
INSERT INTO component_data_dht VALUES (2, 19.4, 46.3, DATE_ADD(NOW(), INTERVAL 2 HOUR), 1);
INSERT INTO component_data_dht VALUES (3, 19.4, 46.3, NOW(), 5);

INSERT INTO component_data_relay VALUES (1, false, NOW(), 2);
INSERT INTO component_data_relay VALUES (2, true, NOW(), 3);
INSERT INTO component_data_relay VALUES (3, true, NOW(), 4);

INSERT INTO component_data_led_strip VALUES (1, 4000, 1200, 700, 68, NOW(), 6);
INSERT INTO component_data_led_strip VALUES (2, 400, 4080, 2345, 96, NOW(), 7);

INSERT INTO firmware VALUES (1, "Firmware Hello World", "/app/bla.bin/", NOW());
INSERT INTO firmware VALUES (2, "Firmware Slim", "/app/bin/bla.bin/", NOW());

INSERT INTO io_board_types VALUES (1, "PCA9685 LED Driver Rev 1");

INSERT INTO io_board VALUES (1, 1, 1);

INSERT INTO io_board_pca9685 VALUES (1, 6, 7, NULL, NULL);