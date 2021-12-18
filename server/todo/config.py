from typing import Type, Union

from pydantic import Field
from pydantic_universal_settings import (
    BaseSettings,
    CLIWatchMixin,
    EnvFileMixin,
    add_settings,
    generate_all_settings,
    get_settings_proxy,
)


@add_settings
class ServerSettings(BaseSettings):
    """
    Server configuration

    The configuration of server connection, debug mode and proxy
    """

    app_name: str = Field("Todo App", description="App name displayed in docs.")
    debug: bool = Field(True, description="Enable debug mode and hot reload.")

    host: str = Field("127.0.0.1", description="Bind socket to this host.")
    port: int = Field(8000, description="Bind socket to this port.")
    workers: int = Field(1, description="Uvicorn workers count.")

    root_path: str = Field("", description="ASGI root path (for proxy usage)")
    forwarded_allow_ips: str = Field(
        "127.0.0.1",
        description="Comma separated list of IPs to trust with proxy headers. "
        "A wildcard '*' means always trust.",
    )


@add_settings
class DatabaseSettings(BaseSettings):
    """
    Database configuration

    The configuration of PostgreSQL and Redis
    """

    # sqlite config
    db_filename: str = Field("db.sqlite3", description="Filename of the SQLite DB.")
    db_echo: bool = True


GeneratedSettings: Type[
    Union[
        ServerSettings,
        DatabaseSettings,
    ]
] = generate_all_settings(mixins=[EnvFileMixin, CLIWatchMixin])


class AllSettings(GeneratedSettings):  # type: ignore
    """
    Define the settings (config) of the website.

    The selected value is determined as follows (in descending order of priority):
    1. The command line arguments, e.g., '--db-host' is mapped to 'db_host'
    2. Environment variables, e.g., '$DB_HOST' is mapped to 'db_host'
    3. Variables loaded from a dotenv (.env) file, e.g., 'DB_HOST' is mapped to 'db_host'
    4. The default field values for the Settings model
    """


settings: AllSettings = get_settings_proxy()
