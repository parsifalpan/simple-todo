from typing import Optional
from sqlmodel import Field
from datetime import datetime
from sqlalchemy.sql.functions import now
from sqlmodel import SQLModel

from todo.schemas import TodoBase


class IDMixin(SQLModel):
    """
    id is in a separate mixin because we want id to be the first column.
    According to Python MRO, the class in the right will be inherited first
    """

    id: Optional[int] = Field(default=None, primary_key=True)


class Todo(TodoBase, IDMixin, table=True):
    created_at: Optional[datetime] = Field(
        None, index=False, sa_column_kwargs={"server_default": now()}
    )
