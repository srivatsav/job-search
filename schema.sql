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
('3', 'Principal Distributed Systems Engineer', 'Phenom', 'Hyderabad, India', '2026-05-03', 'Architect low-code data integrations platform and data pipelines.', 'https://phenom.com'),
('4', 'Staff Infrastructure Engineer', 'Microsoft', 'Hyderabad, India', '2026-05-04', 'Drive distributed storage and cloud infrastructure initiatives.', 'https://careers.microsoft.com'),
('5', 'Principal Software Architect', 'ServiceNow', 'Hyderabad, India', '2026-05-05', 'Design enterprise scale workflow engines and cloud platforms.', 'https://careers.servicenow.com'),
('6', 'Staff Backend Engineer, AI', 'OpenAI', 'Remote', '2026-05-06', 'Build high throughput inference APIs and model serving infrastructure.', 'https://openai.com/careers'),
('7', 'Principal Engineer, Distributed Systems', 'Datadog', 'Remote', '2026-05-07', 'Scale telemetry ingestion pipelines handling millions of events per second.', 'https://datadoghq.com/careers'),
('8', 'Staff Software Engineer, Core', 'Stripe', 'Remote', '2026-05-08', 'Design resilient financial infrastructure and payment routing engines.', 'https://stripe.com/jobs'),
('9', 'Principal Architect, Cloud Native', 'Red Hat', 'Hyderabad, India', '2026-05-09', 'Lead architecture for Kubernetes operator ecosystems and Linux infrastructure.', 'https://redhat.com/jobs'),
('10', 'Staff Distributed Systems Engineer', 'Cloudflare', 'Remote', '2026-05-10', 'Build edge computing runtimes and global distributed storage layers.', 'https://cloudflare.com/careers');