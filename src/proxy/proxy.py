"""
Basic skeleton of a mitmproxy addon.

Run as follows: mitmproxy -s proxy.py
"""
from mitmproxy import ctx


class Counter:
    def __init__(self):
        pass

    def request(self, flow):
        ctx.log("Host: " + flow.request.host)
        ctx.log("Port: " + str(flow.request.port))
        ctx.log("Method: " + str(flow.request.method))
        ctx.log("Scheme: " + str(flow.request.scheme))
        ctx.log("Path: " + str(flow.request.path))
        ctx.log("Http Version: " + str(flow.request.http_version))
        ctx.log("Headers: " + str(flow.request.headers))
        ctx.log("Content:  " + str(flow.request.content))
        ctx.log("Trailers: " + str(flow.request.trailers))
        ctx.log("Timestamp start: " + str(flow.request.timestamp_start))
        ctx.log("Timestamp end: " + str(flow.request.timestamp_end))
        ctx.log("Timestamp end: " + str(flow.request.timestamp_end))


addons = [
    Counter()
]
