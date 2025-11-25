CREATE TABLE IF NOT EXISTS parking_slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slot_number INTEGER UNIQUE,
    status TEXT DEFAULT 'Available',
    license_plate TEXT
);

-- Insert 8 slots (1–8)
INSERT OR IGNORE INTO parking_slots (slot_number, status)
VALUES
(1, 'Available'),
(2, 'Available'),
(3, 'Available'),
(4, 'Available'),
(5, 'Available'),
(6, 'Available'),
(7, 'Available'),
(8, 'Available');