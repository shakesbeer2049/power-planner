CREATE TABLE user_base (
  userID CHAR(36) PRIMARY KEY DEFAULT (UUID()),        -- UUID as primary key
  username VARCHAR(255) NOT NULL,                        -- Username of the user
  password VARCHAR(255) NOT NULL,                        -- Hashed password
  confirmPassword VARCHAR(255) NOT NULL,                 -- Confirm password (typically used for validation on the client side, not stored in DB)
  email VARCHAR(255) NOT NULL,                           -- Email address
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,         -- Timestamp when the user is created
  xp INT DEFAULT 0,                                      -- XP points (default to 0)
  lvl INT DEFAULT 1,                                     -- User's level (default to level 1)
  hp INT DEFAULT 100,                                    -- User's health points (default to 100)
  wp INT DEFAULT 0,                                      -- Weapon points (default to 0)
  kp INT DEFAULT 0,                                      -- Karma points (default to 0)
  ranked BOOLEAN DEFAULT FALSE,                          -- Whether the user is ranked
  nextXP INT DEFAULT 100,                                -- XP required for the next level (default to 100)
  lastXP TIMESTAMP DEFAULT CURRENT_TIMESTAMP,            -- Timestamp for the last XP update
  totalXP INT DEFAULT 0,                                 -- Total XP earned
  passwordChangedAt TIMESTAMP,                           -- Timestamp of the last password change
  passwordResetToken VARCHAR(255),                       -- Token for password reset (if requested)
  passwordResetExpiresAt TIMESTAMP,                      -- Expiry time for the password reset token
  UNIQUE(email)                                          -- Ensure email is unique for each user
);

CREATE TABLE task_base (
  taskID CHAR(36) PRIMARY KEY DEFAULT (UUID()),  -- UUID as primary key, generated automatically
  taskName VARCHAR(255) NOT NULL,                 -- Name of the task
  isCompleted BOOLEAN NOT NULL DEFAULT 0,         -- Task completion status (0 = not completed, 1 = completed)
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Task creation timestamp
  taskCategory VARCHAR(255),                      -- Category or type of task
  taskRepeatsOn VARCHAR(255),                     -- Information about repeating task (e.g., daily, weekly)
  relatedUserId CHAR(36),                         -- UUID of the related user (referencing `userID` in the `users` table)
  FOREIGN KEY (relatedUserId) REFERENCES user_base(userID)  -- Foreign key constraint referencing `userID` in the `users` table
);
