-- Up
CREATE TABLE Customers
(
  CustomerID INTEGER PRIMARY KEY,
  CustomerName TEXT
);

CREATE TABLE Seasons
(
  SeasonID INTEGER PRIMARY KEY,
  SeasonName TEXT,
  StartDate TEXT,
  EndDate TEXT
);

CREATE TABLE CustomerSummaries
(
  CustomerID INTEGER,
  SeasonID INTEGER,
  TotalRepaid INTEGER,
  TotalCredit INTEGER,
  FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
  FOREIGN KEY (SeasonID) REFERENCES Seasons (SeasonID)
);

CREATE TABLE Repayments
(
  RepaymentID INTEGER,
  CustomerID INTEGER,
  SeasonID INTEGER,
  Date TEXT,
  Amount INTEGER,
  ParentID INTEGER,
  FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID),
  FOREIGN KEY (SeasonID) REFERENCES Seasons (SeasonID),
  FOREIGN KEY (ParentID) REFERENCES Repayments (RepaymentID)
);

INSERT INTO Customers
  (CustomerID, CustomerName)
VALUES
  (1, "Fred Barasa"),
  (2, "Imelda Kundu"),
  (3, "Leah Kundu"),
  (4, "Beatrice Wafula Machuma"),
  (5, "John Juma Shitoshe"),
  (7, "Donald Masika"),
  (8, "Bilasio Masinde"),
  (9, "Peter Masinde"),
  (10, "Francis S. Misiko"),
  (11, "Peter Wechuli Nakitare"),
  (12, "Mwanaisha Nekesa"),
  (13, "John Nyongesa");

INSERT INTO Seasons
  (SeasonID, SeasonName, StartDate)
VALUES
  (110, "2012, Short Rain", "8/1/2012"),
  (120, "2013, Long Rain", "3/1/2013"),
  (130, "2013, Short Rain", "8/1/2013"),
  (140, "2014, Long Rain", "3/1/2014"),
  (150, "2014, Short Rain", "8/1/2014"),
  (160, "2015, Long Rain", "3/1/2015"),
  (170, "2015, Short Rain", "8/1/2015"),
  (180, "2016, Long Rain", "3/1/2016"),
  (190, "2016, Short Rain", "8/1/2016");

INSERT INTO CustomerSummaries
  (CustomerID, SeasonID, TotalRepaid, TotalCredit)
VALUES
  (1, 110, 7900, 7900),
  (2, 110, 6200, 6200),
  (3, 110, 7900, 7900),
  (4, 110, 6200, 6200),
  (5, 110, 4500, 4500),
  (7, 110, 6200, 6200),
  (8, 110, 6200, 6200),
  (9, 110, 6200, 6200),
  (10, 110, 6200, 6200),
  (11, 110, 6200, 6200),
  (12, 110, 6200, 6200),
  (1, 120, 6200, 6200),
  (2, 120, 4500, 4500),
  (3, 120, 7050, 7050),
  (4, 120, 7000, 7050),
  (5, 120, 4500, 4500),
  (7, 120, 5250, 5250),
  (8, 120, 6950, 6950),
  (9, 120, 6200, 6200),
  (10, 120, 4500, 4500),
  (11, 120, 5250, 5250),
  (12, 120, 5250, 5250),
  (1, 130, 6200, 6200),
  (2, 130, 6200, 6200),
  (3, 130, 0, 0),
  (4, 130, 4500, 4500),
  (5, 130, 4500, 4500),
  (7, 130, 6200, 6200),
  (8, 130, 4500, 4500),
  (9, 130, 4500, 4500),
  (10, 130, 6200, 6200),
  (11, 130, 6200, 6200),
  (12, 130, 6200, 6200),
  (1, 140, 4000, 4500),
  (2, 140, 6200, 6200),
  (3, 140, 6200, 6200),
  (4, 140, 7900, 7900),
  (5, 140, 4500, 4500),
  (7, 140, 4500, 4500),
  (8, 140, 7900, 7900),
  (9, 140, 7900, 7900),
  (10, 140, 6200, 6200),
  (11, 140, 6200, 6200),
  (12, 140, 4500, 4500),
  (1, 150, 6200, 6200),
  (2, 150, 4500, 4500),
  (3, 150, 6200, 6200),
  (4, 150, 6200, 6200),
  (5, 150, 6200, 6200),
  (7, 150, 4500, 4500),
  (8, 150, 4500, 4500),
  (9, 150, 4500, 4500),
  (10, 150, 4500, 4500),
  (11, 150, 6000, 6200),
  (12, 150, 4500, 4500),
  (1, 160, 6200, 6200),
  (2, 160, 6200, 6200),
  (3, 160, 4000, 4500),
  (4, 160, 6200, 6200),
  (5, 160, 4500, 4500),
  (7, 160, 6200, 6200),
  (8, 160, 6200, 6200),
  (9, 160, 7200, 6200),
  (10, 160, 6200, 6200),
  (11, 160, 4500, 4500),
  (12, 160, 6200, 6200),
  (1, 170, 6200, 6200),
  (2, 170, 6000, 6200),
  (3, 170, 6200, 6200),
  (4, 170, 6200, 6200),
  (5, 170, 6200, 6200),
  (7, 170, 6200, 6200),
  (8, 170, 4500, 4500),
  (9, 170, 4000, 4500),
  (10, 170, 4500, 4500),
  (11, 170, 6200, 6200),
  (12, 170, 6200, 6200),
  (1, 180, 600, 6200),
  (2, 180, 3000, 6200),
  (3, 180, 900, 6200),
  (4, 180, 4000, 6200),
  (5, 180, 400, 6200),
  (7, 180, 620, 6200),
  (8, 180, 6200, 6200),
  (9, 180, 500, 4500),
  (10, 180, 450, 4500),
  (11, 180, 5000, 4500),
  (12, 180, 450, 4500);

-- Down
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS CustomerSummaries;
DROP TABLE IF EXISTS Repayments; 