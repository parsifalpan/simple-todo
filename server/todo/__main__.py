from pathlib import Path
from typing import Any, List, Optional

import json
import click
import uvicorn
from pydantic_universal_settings import cli, init_settings

from todo.config import AllSettings


@click.group(invoke_without_command=True)
@click.help_option("--help", "-h")
@click.pass_context
def cli_group(ctx: Any) -> Any:
    if ctx.invoked_subcommand is None:
        ctx.invoke(serve)


@cli.command()
def serve() -> None:  # pragma: no cover
    settings = init_settings(AllSettings)
    reload_dirs: Optional[List[str]] = None
    if settings.debug:
        reload_dirs = ["todo"]
    uvicorn.run(
        "todo.app:app",
        host=settings.host,
        port=settings.port,
        reload=settings.debug,
        forwarded_allow_ips=settings.forwarded_allow_ips,
        reload_dirs=reload_dirs,
        workers=settings.workers,
    )


@click.command("openapi")
@click.option("-o", "--output", type=click.Path(), required=False, default=None)
def openapi(output: Optional[str]) -> None:
    from todo.app import app

    openapi_json = json.dumps(app.openapi(), indent=2)
    if output is None:
        print(openapi_json)
    else:
        with Path(output).open("w") as f:
            f.write(openapi_json)


if __name__ == "__main__":
    cli_group.add_command(serve)
    cli_group.add_command(openapi)
    cli_group()
