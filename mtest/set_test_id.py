import os
import uuid
from data import postgresql

postgresql.set_test_id(str(os.environ["TEST_PLATFORM"]), str(os.environ["TEST_ID"]))
