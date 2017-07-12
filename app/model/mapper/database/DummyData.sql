USE espwebapp;

INSERT INTO room VALUES (1, "Living Room");
INSERT INTO room VALUES (2, "Kitchen");

INSERT INTO door VALUES (1, "", 1, 2);

INSERT INTO window VALUES (1, "TV Left", 1);
INSERT INTO window VALUES (2, "TV Right", 1);

INSERT INTO location VALUES (1, "", 1, 1, NULL);
INSERT INTO location VALUES (2, "Behind TV", 1, NULL, NULL);
INSERT INTO location VALUES (3, "Garden", NULL, NULL, NULL);

INSERT INTO esp VALUES (1, "DoorEsp", 1);
INSERT INTO esp VALUES (2, "TVEsp", 2);
INSERT INTO esp VALUES (3, "GardenWateringEsp", 3);

INSERT INTO component_type VALUES (1, "DHT");
INSERT INTO component_type VALUES (2, "BMT");

INSERT INTO component VALUES (1, "", 1, 1);
INSERT INTO component VALUES (2, "", 1, 2);

INSERT INTO dht_data VALUES (1, 23.4, 57.3, NOW(), 1);
INSERT INTO dht_data VALUES (2, 19.4, 46.3, DATE_ADD(NOW(), INTERVAL 2 HOUR), 1);
