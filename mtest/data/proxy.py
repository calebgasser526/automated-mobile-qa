from . import databases
from datetime import datetime
import json


def create_tables():
    create_request_table()
    create_headers_table()
    create_content_table()

def create_request_table():
    databases["proxy_db"].execute('''CREATE TABLE IF NOT EXISTS REQUEST
         (id INTEGER PRIMARY KEY AUTOINCREMENT,
         run_timestamp   INTEGER,
         run_id          TEXT,
         req_timestamp   TEXT,
         host            TEXT,
         port            TEXT,
         req_method      TEXT,
         scheme          TEXT,
         req_path        TEXT,
         http_version    TEXT,
         trailers        TEXT,
         timestamp_start TEXT,
         timestamp_end   TEXT);''')


def create_headers_table():
    databases["proxy_db"].execute('''CREATE TABLE IF NOT EXISTS HEADERS
         (id INTEGER PRIMARY KEY AUTOINCREMENT,
         request_id     INTEGER NOT NULL,
         header_type     TEXT,
         header_value      TEXT,
         FOREIGN KEY(request_id) REFERENCES request(id));''')


def create_content_table():
    databases["proxy_db"].execute('''CREATE TABLE IF NOT EXISTS CONTENT
         (id INTEGER PRIMARY KEY AUTOINCREMENT,
         request_id     INTEGER NOT NULL,
         row_num         TEXT,
         content_type        TEXT,
         content_value      TEXT,
         FOREIGN KEY(request_id) REFERENCES request(id));''')

def insert_request_table(ctx, request, run_timestamp, run_id):
    query = f'''
    INSERT INTO REQUEST (req_timestamp, run_timestamp, run_id, host, port, req_method, scheme,
    req_path, http_version, trailers,
    timestamp_start, timestamp_end)
    VALUES (
    '{str(datetime.now())}',
    '{str(run_timestamp)}',
    '{int(run_id)}',
    '{str(request.host)}',
    '{str(request.port)}',
    '{str(request.method)}',
    '{str(request.scheme)}',
    '{str(request.path)}',
    '{str(request.http_version)}',
    '{str(request.trailers)}',
    '{str(request.timestamp_start)}',
    '{str(request.timestamp_end)}');'''

    databases["proxy_db"].execute(query)
    databases["proxy_db"].commit()
    last_id = databases["proxy_db"].execute('SELECT last_insert_rowid()').fetchall()[0][0]

    for key in request.headers:
        temp_query = f'''
        INSERT INTO HEADERS (request_id, header_type, header_value)
        VALUES({last_id}, '{str(key)}', '{str(request.headers[key])}')
        '''
        databases["proxy_db"].execute(temp_query)

    databases["proxy_db"].commit()

    content_string = request.content.decode('utf-8')
    if content_string:
        content = json.loads(content_string)
        ctx.log("Content ---")
        ctx.log(content)
        for index, row in enumerate(content):
            for key in row:
                temp_query = f'''
                  INSERT INTO CONTENT (request_id, row_num, content_type, content_value)
                  VALUES({last_id}, '{str(index)}', '{str(key)}', '{str(row[key])}')
                  '''
                ctx.log("Query ---")
                ctx.log(temp_query)
                databases["proxy_db"].execute(temp_query)
    databases["proxy_db"].commit()
