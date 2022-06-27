import time
import uuid
import json
from bson import json_util
from mitmproxy import ctx
from mtest.data import mongodb
from mtest.data import postgresql


class DataCapture:
    def __init__(self):
        self.run_id = uuid.uuid4()

    def request(self, flow):

        payload = {
                "run_id": str(self.run_id),
                "timestamp": int(time.time()),
                "host": flow.request.host,
                "port": flow.request.port,
                "method": flow.request.method,
                "scheme": flow.request.scheme,
                "authority": flow.request.authority,
                "path": flow.request.path,
                "http_version": flow.request.http_version,
                "headers": flow.request.headers,
                "content": flow.request.content.decode("utf-8"),
                "trailers": flow.request.trailers,
                "timestamp_start": flow.request.timestamp_start,
                "timestamp_end": flow.request.timestamp_end
                }
        mongodb.insert_to_database("mtest", "proxy_request", payload)
        postgresql.insert_to_table("proxy_request", payload)

    def response(self, flow):
        payload = {
                "run_id": str(self.run_id),
                "timestamp": int(time.time()),
                "http_version": flow.response.http_version,
                "status_code": flow.response.status_code,
                "reason": flow.response.reason,
                "headers": flow.response.headers,
                "content": flow.response.content.decode("utf-8"),
                "trailers": flow.response.trailers,
                "timestamp_start": flow.response.timestamp_start,
                "timestamp_end": flow.response.timestamp_end
                }
        mongodb.insert_to_database("mtest", "proxy_response", payload)
        postgresql.insert_to_table("proxy_response", payload)


addons = [
    DataCapture()
]
