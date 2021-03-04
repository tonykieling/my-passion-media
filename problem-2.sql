-- https://extendsclass.com/mysql-online.html
-- tables creation
CREATE TABLE Employees (
  EmployeID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  firstName varchar(30), 
  lastName varchar(30)
);

CREATE TABLE Provinces (
  ProvinceID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  name varchar(30) NOT NULL,
  abbreviation varchar(2)
);

CREATE TABLE Addressess (
  AddressID int NOT NULL AUTO_INCREMENT PRIMARY KEY, 
  address varchar(50),
  city varchar(50) NOT NULL,
  postalCode varchar(6),
  movedInDate date,
  EmployeID int,
  ProvinceID int,
  FOREIGN KEY (EmployeID) REFERENCES Employees(EmployeID), 
  FOREIGN KEY (ProvinceID) REFERENCES Provinces(ProvinceID)
);



-- populating tables
insert into Employees(firstName, lastName) values("First", "Bill");
insert into Employees(firstName, lastName) values("Second", "Can");
insert into Employees(firstName, lastName) values("Third", "Simons");

insert into Provinces(name, abbreviation) values ("British Columbia", "BC");
insert into Provinces(name, abbreviation) values ("Ontario", "ON");

insert into Addressess(address, city, EmployeID, ProvinceID) values ("123 Bill Street", "Port Moody", 1, 1);
insert into Addressess(address, city, EmployeID, ProvinceID) values ("123 Can Street", "Burnaby", 2, 1);
insert into Addressess(address, city, EmployeID, ProvinceID) values ("123 Simons Street", "Burnaby", 3, 1);
insert into Addressess(address, city, EmployeID, ProvinceID) values ("2nd Bil Street", "Coquitlam", 1, 1);



-- problem solving: 
-- 'Write a query that will get Bernice a new list with each employee's full name and their current address.'
SELECT 
    Employees.EmployeID,
    CONCAT(Employees.firstName,
            ' ',
            Employees.lastName) AS 'Full Name',
    Addressess.address,
    Addressess.city,
    Provinces.abbreviation AS Province
FROM
    Addressess
        INNER JOIN
    Employees ON Addressess.EmployeID = Employees.EmployeID
        INNER JOIN
    Provinces ON Addressess.ProvinceID = Provinces.ProvinceID
ORDER BY Employees.firstName ASC;
