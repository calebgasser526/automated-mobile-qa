import time
import uuid
import json
from mitmproxy import ctx
from data import postgresql

def convert_headers(headers):
    output = {}
    if headers:
        for item in headers:
            if item[0] and item[1]:
                output[item[0].decode()] = item[1].decode()
    return output


class DataCapture:
    def __init__(self):
        self.run_id = uuid.uuid4()

    def request(self, flow):
        ctx.log("=====COntent=====")
        ctx.log(flow.request.get_content(strict=False))
        content = flow.request.get_content(strict=False)

        if content:
            if isinstance(content, (bytes, bytearray)):
                content = content.decode()
        else:
            content = ""

        headers = convert_headers(flow.request.headers.fields)
        trailers = convert_headers(flow.request.trailers)

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
                "headers": headers,
                "content": content,
                "trailers": trailers,
                "timestamp_start": flow.request.timestamp_start,
                "timestamp_end": flow.request.timestamp_end
                }
        postgresql.insert_to_table("proxy_request", payload)

    def response(self, flow):
        ctx.log("=====COntent=====")
        ctx.log(flow.request.get_content(strict=False))
        content = flow.response.decode()
        headers = convert_headers(flow.response.headers.fields)
        trailers = convert_headers(flow.response.trailers)

        payload = {
                "run_id": str(self.run_id),
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
