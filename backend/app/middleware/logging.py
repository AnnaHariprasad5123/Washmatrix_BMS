import uuid
import time
import logging
from fastapi import  Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.config.logger import logger


class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        trace_id = request.headers.get("X-Trace-ID", str(uuid.uuid4()))
        request.state.trace_id = trace_id

        start_time = time.time()

        try:
            response = await call_next(request)
        except Exception as e:
            process_time = (time.time() - start_time) * 1000
            logger.error(
                f"{request.method} {request.url.path} - 500 - {process_time:.2f}ms - IP: {request.client.host} - EXCEPTION: {e}",
                extra={"trace_id": trace_id}
            )
            raise

        process_time = (time.time() - start_time) * 1000
        status_code = response.status_code

        log_func = logger.info
        if 400 <= status_code < 500:
            log_func = logger.warning
        elif status_code >= 500:
            log_func = logger.error

        log_func(
            f"{request.method} {request.url.path} - {status_code} - {process_time:.2f}ms - IP: {request.client.host}",
            extra={"trace_id": trace_id}
        )

        response.headers["X-Trace-ID"] = trace_id
        return response