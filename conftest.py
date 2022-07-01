# content of conftest.py
import os
import subprocess
import pytest
import uuid
from mtest.data import postgresql


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    # execute all other hooks to obtain the report object
    outcome = yield
    result = outcome.get_result()
    report = {
            "test_id": postgresql.get_test_id(),
            "node_id": result.nodeid,
            "key_words": result.keywords,
            "outcome": result.outcome,
            "user_properties": result.user_properties,
            "sections": result.sections,
            "duration": result.duration,
            "caplog": result.caplog,
            "capstderr": result.capstderr,
            "capstdout": result.capstdout,
            "failed": result.failed,
            "fspath": result.fspath,
            "passed": result.passed,
            "skipped": result.skipped
            }
    if result.when == "call":
        postgresql.insert_to_table("test_results", report)
