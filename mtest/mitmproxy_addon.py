import time
import os
import json
import re
from unicodedata import normalize
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

def info(message):
    ctx.log.info(f"[II][{time.ctime()}] {message}")

def warn(message):
    ctx.log.warn(f"[WW][{time.ctime()}] {message}")

def error(message):
    ctx.log.error(f"[EE][{time.ctime()}] {message}")

class DataCapture:
    def __init__(self):
        pass

    def request(self, flow):
        headers = convert_headers(flow.request.headers.fields)
        trailers = convert_headers(flow.request.trailers)
        test_id = postgresql.get_test_id()
        content = {}
        if flow.request.get_text() is not None:
            try:
                content = json.loads(flow.request.content)
            except:
                try:
                    content = str(flow.request.content).encode('ascii', 'ignore').decode()
                except:
                    warn("Unable to decode content")
                    if(hasattr(flow.request, "url")):
                        warn(f"URL: {flow.request.url}")
                    else:
                        warn("No url.")
                    content = {"error":"Unable to decode content"}
        else:
            content = {"error": "No content"}

        payload = {
                "test_id": str(test_id),
                "timestamp": int(time.time()),
                "url": str(flow.request.url).encode("ascii", "ignore").decode(),
                "host": str(flow.request.host).encode("ascii", "ignore").decode(),
                "port": str(flow.request.port).encode("ascii", "ignore").decode(),
                "method": str(flow.request.method).encode("ascii", "ignore").decode(),
                "scheme": str(flow.request.scheme).encode("ascii", "ignore").decode(),
                "authority": str(flow.request.authority).encode("ascii", "ignore").decode(),
                "path": str(flow.request.path).encode("ascii", "ignore").decode(),
                "http_version": str(flow.request.http_version).encode("ascii", "ignore").decode(),
                "headers": str(headers).encode("ascii", "ignore").decode(),
                "content": content,
                "trailers": str(trailers).encode("ascii", "ignore").decode(),
                "timestamp_start": str(flow.request.timestamp_start).encode("ascii", "ignore").decode(),
                "timestamp_end": str(flow.request.timestamp_end).encode("ascii", "ignore").decode()
                }
        try:
            postgresql.insert_to_table("proxy_request", payload)
        except:
            warn(f"Database Error: Unable to insert to table for {flow.request.url}")
            warn(payload)

    def response(self, flow):
        headers = convert_headers(flow.response.headers.fields)
        trailers = convert_headers(flow.response.trailers)
        test_id = postgresql.get_test_id()
        content = {}
        if flow.response.get_text() is not None:
            try:
                content = json.loads(flow.response.content)
            except:
                try:
                    content = str(flow.response.content).encode('ascii', 'ignore').decode()
                except:
                    if(hasattr(flow.response, "url")):
                        warn(f"URL: {flow.response.url}")
                    else:
                        warn("No url.")
                    content = {"error": "Cannot decode content"}

        else:
            content = {"error": "No content"}

        payload = {
                "test_id": str(test_id),
                "timestamp": int(time.time()),
                "http_version": str(flow.response.http_version).encode("ascii", "ignore").decode(),
                "status_code": str(flow.response.status_code).encode("ascii", "ignore").decode(),
                "reason": str(flow.response.reason).encode("ascii", "ignore").decode(),
                "headers": str(headers).encode("ascii", "ignore").decode(),
                "content": content,
                "trailers": str(trailers).encode("ascii", "ignore").decode(),
                "timestamp_start": str(flow.response.timestamp_start).encode("ascii", "ignore").decode(),
                "timestamp_end": str(flow.response.timestamp_end).encode("ascii", "ignore").decode()
                }
        try:
            postgresql.insert_to_table("proxy_response", payload)
        except:
            warn(f"Database Error: Unable to insert to table for {flow.request.url}")




addons = [
    DataCapture()
]
