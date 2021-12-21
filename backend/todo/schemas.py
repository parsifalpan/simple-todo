from datetime import datetime
from enum import IntEnum
from typing import Optional

from pydantic import BaseModel
from sqlmodel import Field, SQLModel


class TodoStatus(IntEnum):
    UNDONE = 0
    DONE = 1


class TodoPriority(IntEnum):
    URGENT = 0
    MEDIUM = 1
    NORMAL = 2
    CASUAL = 3


class TodoBase(SQLModel):
    title: str = Field("", index=False, nullable=True)
    content: str = Field("", index=False, nullable=True)
    status: int = Field(
        TodoStatus.UNDONE,
        index=False,
        nullable=False,
        sa_column_kwargs={"server_default": str(TodoStatus.UNDONE.value)},
    )
    priority: int = Field(
        TodoPriority.CASUAL,
        index=False,
        nullable=False,
        sa_column_kwargs={"server_default": str(TodoPriority.CASUAL.value)},
    )
    expire_date: datetime = Field(index=False, nullable=False)


class TodoCreate(TodoBase):
    pass


class TodoEdit(BaseModel):
    title: Optional[str]
    content: Optional[str]
    status: Optional[int]
    priority: Optional[int]
    expire_date: Optional[datetime]
