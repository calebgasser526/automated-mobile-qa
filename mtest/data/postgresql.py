import psycopg2
import os
import platform
import json
from psycopg2.extras import Json

host = "localhost"
if platform.system() == "Linux":
    host = "postgres"


def set_test_id(platform, test_id):
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
    cursor = connection.cursor()
    insert_data = f"""INSERT INTO test_id (platform, test_id)
    VALUES('{platform}', '{test_id}');
    """
    cursor.execute(insert_data)
    connection.commit()
    cursor.close()
    connection.close()


def get_test_id():
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
    cursor = connection.cursor()
    query_string = """SELECT test_id, timestamp
        FROM test_id
        ORDER BY timestamp DESC
        LIMIT 1;
    """
    try:
        cursor.execute(query_string)
        results = cursor.fetchone()[0]
    except psycopg2.errors.InFailedSqlTransaction as e:
        print(f"Error:\n{e}")
    cursor.close()
    connection.close()
    return results

def get_latest_test_data(node_id):
    test_id = get_test_id()
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
    cursor = connection.cursor()
    query_string = f"""SELECT pr.info -> 'content' ->> 'batch' as batched_data
        FROM proxy_request pr
        JOIN test_results tr on tr.info ->> 'test_id' = pr.info ->> 'test_id'
        JOIN test_id ti on ti.test_id = pr.info ->> 'test_id'
        WHERE pr.info -> 'content' -> 'batch' IS NOT NULL
        AND pr.info ->> 'test_id' LIKE '{test_id}'
        AND tr.info ->> 'node_id' LIKE '%::{node_id}'
    """
    try:
        cursor.execute(query_string)
        data = cursor.fetchall()
    except psycopg2.errors.InFailedSqlTransaction as e:
        print(f"Error:\n{e}")

    cursor.close()
    connection.close()
    return data

def get_latest_test_data_properties(node_id):
    test_id = get_test_id()
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
    cursor = connection.cursor()
    query_string = f"""SELECT (elem ->> 'properties') as properties
        FROM proxy_request pr
        JOIN test_results tr on tr.info ->> 'test_id' = pr.info ->> 'test_id'
        JOIN test_id ti on ti.test_id = pr.info ->> 'test_id'
        CROSS JOIN json_array_elements(CAST(pr.info -> 'content' ->> 'batch' AS json)) elem
        WHERE pr.info -> 'content' -> 'batch' IS NOT NULL
        AND elem -> 'properties' IS NOT NULL
        AND pr.info ->> 'test_id' LIKE '{test_id}'
        AND tr.info ->> 'node_id' LIKE '%{node_id}'
    """
    try:
        cursor.execute(query_string)
        data = cursor.fetchall()
    except psycopg2.errors.InFailedSqlTransaction as e:
        print(f"Error:\n{e}")

    cursor.close()
    connection.close()
    final_data = []
    for item in data:
        final_data.append(json.loads(item[0]))
    return final_data

def insert_to_table(table_name, info):
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
    cursor = connection.cursor()
    insert_data = f"""INSERT INTO {table_name} (info)
    VALUES({Json(info)});
    """
    cursor.execute(insert_data)
    connection.commit()
    cursor.close()
    connection.close()
