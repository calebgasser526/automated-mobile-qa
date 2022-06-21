import sqlite3

databases = {
    "proxy_db": sqlite3.connect('data/proxy.db'),
    "tests_db": sqlite3.connect('data/tests.db')
}
