import time
from mtest.data import couchdb


def test_create_create_table():
    database_name = "my_test_db"
    payload = {
            "run_id": 1,
            "timestamp": int(time.time()),
            "host": "0.0.0.0",
            "port": "2342",
            "method": "PUT",
            "scheme": "???",
            "path": "/v1/import",
            "http_version": "???",
            "trailers": "???",
            "timestamp_start": "????",
            "timestamp_end": "???"
            }
    couchdb.authenticate()
    couchdb.create_database(database_name)

    couchdb.send_data(database_name, payload)
