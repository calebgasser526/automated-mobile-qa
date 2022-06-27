import psycopg2
import os
import json
from psycopg2.extras import Json

connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host="postgres")

def convert(d, out={}):
    for k, v in d.items():
        if isinstance(v, dict):
            convert(v, out)
        else:
            if isinstance(v, str):
                out[k] = v
            elif isinstance(v, (bytes, bytearray)):
                out[k] = v.decode()
    return out

def insert_to_table(table_name, info):
    info = convert(info)
    cursor = connection.cursor()
    create_table = f"""CREATE TABLE IF NOT EXISTS {table_name} (
        id serial NOT NULL primary key,
        info json NOT NULL,
        timestamp timestamp default current_timestamp
    );
    """
    insert_data = f"""INSERT INTO {table_name} (info)
    VALUES('{Json(info)}');
    """
    print(insert_data)
    cursor.execute(create_table)
    cursor.execute(insert_data)
    connection.commit()


def query(query_string):
    cursor = connection.cursor()
    cursor.execute(query_string)
    results = cursor.fetchall()
    connection.rollback()
    return results
