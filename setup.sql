
-- make sure the websiteuser account is set up and has the correct privileges
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
  date varchar(25) NOT NULL,
  username varchar(25) NOT NULL,
  userid mediumint UNSIGNED NOT NULL
);

CREATE TABLE IF NOT EXISTS foods (
  id mediumint UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  name varchar(25) NOT NULL,
  vita float UNSIGNED, 
  vitb1 float UNSIGNED, 
  vitb2 float UNSIGNED, 
  vitb3 float UNSIGNED, 
  vitb5 float UNSIGNED, 
  vitb6 float UNSIGNED, 
  vitb12 float UNSIGNED, 
  vitc float UNSIGNED, 
  vitd float UNSIGNED, 
  vite float UNSIGNED, 
  vitamink float UNSIGNED,
  ldl float UNSIGNED,
  hdl float UNSIGNED
);

ALTER TABLE `settings` ADD FOREIGN KEY (`userid`) REFERENCES `accounts` (`id`);

INSERT INTO accounts(user, pass)
	VALUES("doej", "$2b$10$gL33obKAFUT5DK3pEbh72OIHztsWBniBBh.PdeKOrF1yr5KFAsdZO");

