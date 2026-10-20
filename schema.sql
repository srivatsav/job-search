DROP TABLE IF EXISTS jobs;
CREATE TABLE jobs (
  id TEXT PRIMARY KEY,
  title TEXT,
  company TEXT,
  location TEXT,
  posted_at TEXT,
  description TEXT,
  url TEXT
);
INSERT INTO jobs (id, title, company, location, posted_at, description, url) VALUES
('1', 'Staff Software Engineer', 'Google', 'Hyderabad, India', '2026-05-01', 'Build large scale backend systems and distributed platforms.', 'https://careers.google.com'),
('2', 'Senior Backend Engineer', 'Warner Bros. Discovery', 'Hyderabad, India', '2026-05-02', 'Work on GenAI and streaming backend services.', 'https://wbd.com'),
('3', 'Principal Distributed Systems Engineer', 'Phenom', 'Hyderabad, India', '2026-05-03', 'Architect low-code data integrations platform and data pipelines.', 'https://phenom.com');
