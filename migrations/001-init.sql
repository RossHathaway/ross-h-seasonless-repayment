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

-- Down
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Seasons;
DROP TABLE IF EXISTS CustomerSummaries;
DROP TABLE IF EXISTS Repayments; 