from pydantic_settings import BaseSettings, SettingsConfigDict
import os

env = os.getenv("APP_ENV","development")
env_file = f".env.{env}"

class Settings(BaseSettings):
    app_env: str
    debug: bool
    host: str
    port: int
    reload: bool
    database_url: str
    frontend_url: str

    model_config = SettingsConfigDict(env_file=env_file, env_file_encoding='utf-8')


settings = Settings()