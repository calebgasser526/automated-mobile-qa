import psycopg2
import os
import platform
import pandas as pd
import json
from psycopg2.extras import Json

host = "localhost"
if platform.system() == "Linux":
    host = "postgres"

connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)


def convert_list(value):
    e = []
    for val in value:
        if type(val) is list:
            e += convert_list(val)
        elif type(val) is tuple:
            e.append({val[0]: val[1]})
        elif isinstance(val, (bytes, bytearray)):
            e.append(val.decode("utf-8"))
        else:
            e.append(val)
    return e


def convert_dict(d, e={}):
    for key, value in d.items():
        if type(value) is dict:
            e[key] = convert_dict(value, {})
        elif type(value) is type:
            e[key] = convert_dict(vars(value), {})
        elif type(value) is list:
            e[key] = convert_list(value)
        elif isinstance(value, (bytes, bytearray)):
            e[key] = value.decode("utf-8")
        elif isinstance(value, str):
            e[key] = value
        else:
            e[key] = value
    return e


def handler(value):
    if isinstance(value, (bytes, bytearray)):
        return value.decode("utf-8")
    elif isinstance(value, str):
        return str(value)
    else:
        return value

def insert_to_table(table_name, info):
    #info_convert = convert_dict(info)
    #info = info.to_json(orient='records', default_handler=handler)
    cursor = connection.cursor()
    create_table = f"""CREATE TABLE IF NOT EXISTS {table_name} (
        id serial NOT NULL primary key,
        info json NOT NULL,
        timestamp timestamp default current_timestamp
    );
    """
    insert_data = f"""INSERT INTO {table_name} (info)
    VALUES({Json(info)});
    """
    cursor.execute(create_table)
    cursor.execute(insert_data)
    connection.commit()


def query(query_string):
    cursor = connection.cursor()
    cursor.execute(query_string)
    results = cursor.fetchall()
    connection.rollback()
    return results
