
CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE ON website.* TO websiteuser;

DROP TABLE IF EXISTS accounts;

CREATE TABLE IF NOT EXISTS accounts (
  id MEDIUMINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user VARCHAR(25) NOT NULL,
  pass VARCHAR(70) NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  id mediumint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  age mediumint UNSIGNED NOT NULL,
  weight varchar(100) NOT NULL,
  height varchar(100),
  gender varchar(70) NOT NULL,
  vita float NOT NULL,
  vitb1 float NOT NULL,
  vitb2 float NOT NULL,
  vitb3 float NOT NULL,
  vitb5 float NOT NULL,
  vitb6 float NOT NULL,
  vitb12 float NOT NULL,
  vitc float NOT NULL,
  vitd float NOT NULL,
  vite float NOT NULL,
  vitk float NOT NULL,
  ldl float NOT NULL,
  hdl float NOT NULL,
  iron float NOT NULL,
  zinc float NOT NULL,
  potassium float NOT NULL,
  sodium float NOT NULL,
  magnesium float NOT NULL,
  calcium float NOT NULL,
  date varchar(25) NOT NULL,
  username varchar(25) NOT NULL,
  userid mediumint UNSIGNED NOT NULL
);

CREATE TABLE IF NOT EXISTS backlog(
  id mediumint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name varchar(25) NOT NULL,
  date varchar(25) NOT NULL,
  calories mediumint NOT NULL
);


ALTER TABLE `settings` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

