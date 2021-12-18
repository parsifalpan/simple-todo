from fastapi import Depends, FastAPI, Request
from fastapi.responses import RedirectResponse
from pydantic_universal_settings import init_settings
from starlette.datastructures import URL

from todo.config import AllSettings
from todo.db import db_session_dependency, ensure_db

settings = init_settings(AllSettings)
app = FastAPI(
    title=settings.app_name,
    docs_url="/api/v1/docs",
    redoc_url="/api/v1/redoc",
    dependencies=[Depends(db_session_dependency)],
)


@app.on_event("startup")
async def startup_event() -> None:
    await ensure_db()


def get_base_url(request: Request, prefix: str = "") -> URL:
    url = f"{request.url.scheme}://{request.url.netloc}/{settings.root_path}{prefix}"
    return URL(url)


# we temporarily redirect "/" and "/api" to "/api/v1" for debugging
@app.get("/api", include_in_schema=False)
@app.get("/", include_in_schema=False)
async def redirect_to_docs(request: Request) -> RedirectResponse:  # pragma: no cover
    base_url = get_base_url(request)
    redirect_url = app.url_path_for("swagger_ui_html").make_absolute_url(base_url)
    return RedirectResponse(redirect_url + "?docExpansion=none")


import todo.apis
