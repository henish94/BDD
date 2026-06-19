CREATE TABLE booking_contact_details (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile_number VARCHAR(20) NOT NULL,
  email_id VARCHAR(255) NOT NULL
);

CREATE TABLE passengers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_contact_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(20) NOT NULL,
  FOREIGN KEY (booking_contact_id)
    REFERENCES booking_contact_details(id)
);

INSERT INTO booking_contact_details (mobile_number, email_id)
VALUES ('9999999999', 'testuser@example.com');

INSERT INTO passengers (booking_contact_id, name, age, gender)
VALUES
(1, 'Test User One', 21, 'Male'),
(1, 'Test User Two', 22, 'Male');