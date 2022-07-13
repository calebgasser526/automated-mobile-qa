import time
import os
import json
import re
from mitmproxy import ctx, http
from data import postgresql

def convert_headers(headers):
    output = {}
    if headers:
        for item in headers:
            if item[0] and item[1]:
                try:
                    output[item[0].decode()] = item[1].decode()
                except:
                    output[str(item[0])] = str(item[1])
    return output

def convert_content(content):
    if isinstance(content, str):
        try:
            content = json.loads(content)
        except TypeError as e:
            ctx.log(e)
    return content

class DataCapture:
    def __init__(self):
        pass

    def request(self, flow):
        headers = convert_headers(flow.request.headers.fields)
        trailers = convert_headers(flow.request.trailers)
        if flow.request.get_text() is not None:
            try:
                content = json.loads(flow.request.get_text())
            except:
                content = flow.request.get_text().decode('unicode_escape')
        else:
            content = {}
        test_id = postgresql.get_test_id()

        payload = {
                "test_id": str(test_id),
                "timestamp": int(time.time()),
                "url": flow.request.url,
                "host": flow.request.host,
                "port": flow.request.port,
                "method": flow.request.method,
                "scheme": flow.request.scheme,
                "authority": flow.request.authority,
                "path": flow.request.path,
                "http_version": flow.request.http_version,
                "headers": headers,
                "content": content,
                "trailers": trailers,
                "timestamp_start": flow.request.timestamp_start,
                "timestamp_end": flow.request.timestamp_end
                }
        postgresql.insert_to_table("proxy_request", payload)

    def response(self, flow):
        headers = convert_headers(flow.response.headers.fields)
        trailers = convert_headers(flow.response.trailers)
        if flow.response.get_text() is not None:
            try:
                content = json.loads(flow.request.get_text())
            except:
                content = flow.response.get_text().decode('unicode_escape')
        else:
            content = {}
        test_id = postgresql.get_test_id()

        payload = {
                "test_id": str(test_id),
                "timestamp": int(time.time()),
                "http_version": flow.response.http_version,
                "status_code": flow.response.status_code,
                "reason": flow.response.reason,
                "headers": headers,
                "content": content,
                "trailers": trailers,
                "timestamp_start": flow.response.timestamp_start,
                "timestamp_end": flow.response.timestamp_end
                }
        postgresql.insert_to_table("proxy_response", payload)


addons = [
    DataCapture()
]
