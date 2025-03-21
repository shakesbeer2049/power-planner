CREATE TABLE user_base (
  userId CHAR(36) PRIMARY KEY DEFAULT (UUID()),             -- UUID as primary key
  username VARCHAR(255) NOT NULL,                           -- Username of the user
  password VARCHAR(255) NOT NULL,                           -- Hashed password
  email VARCHAR(255) NOT NULL UNIQUE,                       -- Email address (unique)
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,           -- Timestamp when the user is created
  xp INT DEFAULT 0,                                          -- XP points (default to 0)
  lvl INT DEFAULT 1,                                         -- User's level (default to level 1)
  hp INT DEFAULT 100,                                        -- User's health points (default to 100)
  wp INT DEFAULT 0,                                          -- Weapon points (default to 0)
  kp INT DEFAULT 0,                                          -- Karma points (default to 0)
  ranked BOOLEAN DEFAULT FALSE,                             -- Whether the user is ranked
  nextXp INT DEFAULT 100,                                    -- XP required for the next level (default to 100)
  lastXp INT DEFAULT 0,                                      -- Last XP update
  totalXp INT DEFAULT 0,                                     -- Total XP earned
  passwordChangedAt TIMESTAMP,                              -- Timestamp of the last password change
  passwordResetToken VARCHAR(255),                          -- Token for password reset
  passwordResetExpiresAt TIMESTAMP                          -- Expiry time for the password reset token
);

CREATE TABLE task_base (
  taskId CHAR(36) PRIMARY KEY DEFAULT (UUID()),             -- UUID as primary key
  taskName VARCHAR(255) NOT NULL,                           -- Name of the task
  isCompleted BOOLEAN NOT NULL DEFAULT 0,                   -- Task completion status
  createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,            -- Task creation timestamp
  taskCategory VARCHAR(255),                                -- Category of task
  taskRepeatsOn JSON,                                        -- Information about repeating task
  relatedUserId CHAR(36),                                    -- UUID of the related user
  FOREIGN KEY (relatedUserId) REFERENCES user_base(userId)    -- Foreign key referencing UserBase
);

CREATE TABLE task_log (
  logId CHAR(36) PRIMARY KEY DEFAULT (UUID()),
  taskId CHAR(36),
  relatedUserId CHAR(36),
  completedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (taskId) REFERENCES task_base(taskId),
  FOREIGN KEY (relatedUserId) REFERENCES user_base(userId)
);

CREATE TABLE task_schedule (
    scheduleId CHAR(36) PRIMARY KEY,
    relatedTaskId CHAR(36) NOT NULL,
    relatedUserId CHAR(36) NOT NULL,
    scheduledOn DATE NOT NULL,
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(taskId, scheduledOn),  -- Prevents duplicate entries for the same day
    FOREIGN KEY (relatedTaskId) REFERENCES task_base(taskId) ON DELETE CASCADE
);


