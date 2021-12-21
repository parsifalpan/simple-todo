from typing import Any

from todo import models, schemas
from todo.app import app

# TODO: write the api endpoint here


@app.get("/example")
async def example_api_endpoint() -> Any:
    return {"data": "example api endpoint"}
