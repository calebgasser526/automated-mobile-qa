import psycopg2
import os
import platform
from psycopg2.extras import Json

host = "localhost"
if platform.system() == "Linux":
    host = "postgres"


def set_test_id(platform, test_id):
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
    cursor = connection.cursor()
    create_table = """CREATE TABLE IF NOT EXISTS test_id (
        id serial NOT NULL primary key,
        platform TEXT NOT NULL,
        test_id TEXT NOT NULL,
        timestamp timestamp default current_timestamp
    );
    """
    insert_data = f"""INSERT INTO test_id (platform, test_id)
    VALUES('{platform}', '{test_id}');
    """
    cursor.execute(create_table)
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

def insert_to_table(table_name, info):
    connection = psycopg2.connect(dbname=os.environ['POSTGRES_DB'], user=os.environ['POSTGRES_USER'], password=os.environ['POSTGRES_PASSWORD'], host=host)
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
    cursor.close()
    connection.close()
