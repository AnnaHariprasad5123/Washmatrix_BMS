import logging
import os 
from datetime import datetime

LOG_DIR = "app/logs"
os.makedirs(LOG_DIR, exist_ok=True)

logger = logging.getLogger("book_api_logger")

logger.propagate = False

class TraceIDFilter(logging.Filter):
    def filter(self, record):
        if not hasattr(record, 'trace_id'):
            record.trace_id = 'N/A'
        return True

class CustomFormatter(logging.Formatter):
    def format(self, record):
        if hasattr(record, 'trace_id') and record.trace_id != 'N/A':
            self._style._fmt = '[%(asctime)s] [%(levelname)s] [trace_id=%(trace_id)s] %(message)s'
        else:
            self._style._fmt = '[%(asctime)s] [%(levelname)s] %(message)s'
        return super().format(record)


logger.addFilter(TraceIDFilter())

if not logger.handlers:
    logger.setLevel(logging.INFO)
    
    log_filename = datetime.now().strftime("book_api_%Y%m%d_%H%M%S.log")
    log_filepath = os.path.join(LOG_DIR, log_filename)
    
    formatter = CustomFormatter(datefmt="%Y-%m-%d %H:%M:%S")

    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)

    file_handler = logging.FileHandler(log_filepath)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(formatter)
    logger.addHandler(file_handler)
    
    logger.info("Logger initialized successfully")