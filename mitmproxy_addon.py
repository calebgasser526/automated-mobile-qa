import time
import uuid
from mitmproxy import ctx
from mtest.data import mongodb

class DataCapture:
    def __init__(self):
        self.run_id = uuid.uuid4()

    def request(self, flow):
        payload = {
                "run_id": self.run_id,
                "timestamp": int(time.time()),
                "host": flow.request.host,
                "port": flow.request.port,
                "method": flow.request.method,
                "scheme": flow.request.scheme,
                "path": flow.request.path,
                "http_version": flow.request.http_version,
                "trailers": flow.request.trailers,
                "timestamp_start": flow.request.timestamp_start,
                "timestamp_end": flow.request.timestamp_end
                }
        mongodb.insert_to_database("mtest", "proxy_network_data", payload)


addons = [
    DataCapture()
]
