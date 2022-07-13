CREATE TABLE IF NOT EXISTS test_id (
  id serial NOT NULL primary key,
  platform TEXT NOT NULL,
  test_id TEXT NOT NULL,
  timestamp timestamp default current_timestamp
);

CREATE TABLE IF NOT EXISTS proxy_request (
  id serial NOT NULL primary key,
  info json NOT NULL,
  timestamp timestamp default current_timestamp
);

CREATE TABLE IF NOT EXISTS proxy_response (
  id serial NOT NULL primary key,
  info json NOT NULL,
  timestamp timestamp default current_timestamp
);

CREATE TABLE IF NOT EXISTS test_results (
  id serial NOT NULL primary key,
  info json NOT NULL,
  timestamp timestamp default current_timestamp
);
