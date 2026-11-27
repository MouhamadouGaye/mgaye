# # """Backend optionnel : sauvegarde des contacts, newsletter et compteur de lectures du blog."""
# # import os
# # from contextlib import asynccontextmanager
# # from datetime import datetime, timezone

# # from fastapi import FastAPI
# # from fastapi.middleware.cors import CORSMiddleware
# # from pydantic import BaseModel, EmailStr, Field
# # from sqlalchemy import DateTime, Integer, String, Text, create_engine, select
# # from sqlalchemy.dialects.postgresql import insert
# # from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

# # DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://portfolio:portfolio@localhost:5432/portfolio")
# # engine = create_engine(DATABASE_URL, pool_pre_ping=True)


# # class Base(DeclarativeBase):
# #     pass


# # def now():
# #     return datetime.now(timezone.utc)


# # class Contact(Base):
# #     __tablename__ = "contacts"
# #     id: Mapped[str] = mapped_column(String(40), primary_key=True)
# #     name: Mapped[str] = mapped_column(String(120))
# #     email: Mapped[str] = mapped_column(String(200))
# #     company: Mapped[str] = mapped_column(String(160), default="")
# #     message: Mapped[str] = mapped_column(Text)
# #     created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


# # class Subscriber(Base):
# #     __tablename__ = "subscribers"
# #     email: Mapped[str] = mapped_column(String(200), primary_key=True)
# #     created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


# # class PostView(Base):
# #     __tablename__ = "post_views"
# #     slug: Mapped[str] = mapped_column(String(160), primary_key=True)
# #     views: Mapped[int] = mapped_column(Integer, default=0)


# # @asynccontextmanager
# # async def lifespan(_: FastAPI):
# #     Base.metadata.create_all(engine)  # en production, utiliser Alembic
# #     yield


# # app = FastAPI(title="Portfolio API", lifespan=lifespan)
# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000,https://mouhamadougaye.com").split(","),
# #     allow_methods=["GET", "POST"],
# #     allow_headers=["*"],
# # )


# # class ContactIn(BaseModel):
# #     id: str
# #     name: str = Field(max_length=120)
# #     email: EmailStr
# #     company: str = Field(default="", max_length=160)
# #     message: str = Field(min_length=10, max_length=5000)


# # class NewsletterIn(BaseModel):
# #     email: EmailStr


# # @app.get("/health")
# # def health():
# #     return {"status": "ok"}


# # @app.post("/contacts", status_code=201)
# # def create_contact(c: ContactIn):
# #     with Session(engine) as db:
# #         db.merge(Contact(**c.model_dump()))
# #         db.commit()
# #     return {"ok": True}


# # @app.post("/newsletter", status_code=201)
# # def subscribe(n: NewsletterIn):
# #     with Session(engine) as db:
# #         db.execute(insert(Subscriber).values(email=n.email).on_conflict_do_nothing())
# #         db.commit()
# #     return {"ok": True}


# # @app.post("/posts/{slug}/view")
# # def add_view(slug: str):
# #     with Session(engine) as db:
# #         stmt = insert(PostView).values(slug=slug, views=1).on_conflict_do_update(
# #             index_elements=["slug"], set_={"views": PostView.views + 1}
# #         ).returning(PostView.views)
# #         views = db.execute(stmt).scalar_one()
# #         db.commit()
# #     return {"slug": slug, "views": views}


# # @app.get("/posts/{slug}/views")
# # def get_views(slug: str):
# #     with Session(engine) as db:
# #         row = db.execute(select(PostView).where(PostView.slug == slug)).scalar_one_or_none()
# #     return {"slug": slug, "views": row.views if row else 0}


# """Backend optionnel : sauvegarde des contacts, newsletter et compteur de lectures du blog."""
# import os
# from contextlib import asynccontextmanager
# from datetime import datetime, timezone
# import secrets


# from fastapi import FastAPI,     Depends,Header, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, EmailStr, Field, ConfigDict
# from sqlalchemy import DateTime, Integer, String, Text, create_engine, select
# from sqlalchemy.dialects.postgresql import insert
# from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column

# DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://gaye:Postgres.2424@localhost:5432/portfolio")
# engine = create_engine(DATABASE_URL, pool_pre_ping=True)


# API_SECRET = os.getenv("API_SECRET", "")


# def verify_api_key(
#     x_api_key: str = Header(default="")
# ):
#     if not API_SECRET:
#         raise HTTPException(
#             status_code=503,
#             detail="API authentication not configured"
#         )

#     if not secrets.compare_digest(
#         x_api_key,
#         API_SECRET
#     ):
#         raise HTTPException(
#             status_code=401,
#             detail="Unauthorized"
#         )

#     return True

# class Base(DeclarativeBase):
#     pass


# def now():
#     return datetime.now(timezone.utc)


# class Contact(Base):
#     __tablename__ = "contacts"
#     id: Mapped[str] = mapped_column(String(40), primary_key=True)
#     name: Mapped[str] = mapped_column(String(120))
#     email: Mapped[str] = mapped_column(String(200))
#     company: Mapped[str] = mapped_column(String(160), default="")
#     message: Mapped[str] = mapped_column(Text)
#     created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


# class Subscriber(Base):
#     __tablename__ = "subscribers"
#     email: Mapped[str] = mapped_column(String(200), primary_key=True)
#     created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=now)


# class PostView(Base):
#     __tablename__ = "post_views"
#     slug: Mapped[str] = mapped_column(String(160), primary_key=True)
#     views: Mapped[int] = mapped_column(Integer, default=0)


# @asynccontextmanager
# async def lifespan(_: FastAPI):
#     Base.metadata.create_all(engine)  # en production, utiliser Alembic
#     yield


# app = FastAPI(title="Portfolio API", lifespan=lifespan)
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000,https://mouhamadougaye.com").split(","),
#     allow_methods=["GET", "POST"],
#     allow_headers=["*"],
# )


# # class ContactIn(BaseModel):
# #     id: str
# #     name: str = Field(max_length=120)
# #     email: EmailStr
# #     company: str = Field(default="", max_length=160)
# #     message: str = Field(min_length=10, max_length=5000)

# class ContactIn(BaseModel):
#     model_config = ConfigDict(populate_by_name=True)

#     id: str
#     name: str
#     email: str
#     company: str = ""
#     message: str
#     created_at: datetime = Field(
#         validation_alias="createdAt"
#     )


# class NewsletterIn(BaseModel):
#     email: EmailStr


# @app.get("/health")
# def health():
#     return {"status": "ok"}


# # @app.post("/contacts", status_code=201)
# # def create_contact(c: ContactIn):
# #     with Session(engine) as db:
# #         db.merge(Contact(**c.model_dump()))
# #         db.commit()
# #     return {"ok": True}

# @app.post("/api/contacts", status_code=201)
# def create_contact(
#     c: ContactIn,
#     _: bool = Depends(verify_api_key)
# ):
#     with Session(engine) as db:
#         db.merge(Contact(**c.model_dump()))
#         db.commit()

#     return {"ok": True}


# @app.post("/newsletter", status_code=201)
# def subscribe(n: NewsletterIn):
#     with Session(engine) as db:
#         db.execute(insert(Subscriber).values(email=n.email).on_conflict_do_nothing())
#         db.commit()
#     return {"ok": True}


# @app.post("/posts/{slug}/view")
# def add_view(slug: str):
#     with Session(engine) as db:
#         stmt = insert(PostView).values(slug=slug, views=1).on_conflict_do_update(
#             index_elements=["slug"], set_={"views": PostView.views + 1}
#         ).returning(PostView.views)
#         views = db.execute(stmt).scalar_one()
#         db.commit()
#     return {"slug": slug, "views": views}


# @app.get("/posts/{slug}/views")
# def get_views(slug: str):
#     with Session(engine) as db:
#         row = db.execute(select(PostView).where(PostView.slug == slug)).scalar_one_or_none()
#     return {"slug": slug, "views": row.views if row else 0}




"""API du portfolio : contacts, newsletter et compteurs de lectures."""

import os
import secrets
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from sqlalchemy import DateTime, Integer, String, Text, create_engine, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column


DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL n'est pas configurée.")

API_SECRET = os.getenv("API_SECRET", "")

engine = create_engine(DATABASE_URL, pool_pre_ping=True)


def now() -> datetime:
    return datetime.now(timezone.utc)


def verify_api_key(x_api_key: str = Header(default="")):
    if not API_SECRET:
        raise HTTPException(
            status_code=503,
            detail="API authentication is not configured",
        )

    if not secrets.compare_digest(x_api_key, API_SECRET):
        raise HTTPException(status_code=401, detail="Unauthorized")

    return True


class Base(DeclarativeBase):
    pass


class Contact(Base):
    __tablename__ = "contacts"

    id: Mapped[str] = mapped_column(String(40), primary_key=True)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(200))
    company: Mapped[str] = mapped_column(String(160), default="")
    message: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=now
    )


class Subscriber(Base):
    __tablename__ = "subscribers"

    email: Mapped[str] = mapped_column(String(200), primary_key=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=now
    )


class PostView(Base):
    __tablename__ = "post_views"

    slug: Mapped[str] = mapped_column(String(160), primary_key=True)
    views: Mapped[int] = mapped_column(Integer, default=0)


class ContactIn(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        extra="forbid",
    )

    id: str = Field(min_length=1, max_length=40)
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: str = Field(default="", max_length=160)
    message: str = Field(min_length=10, max_length=5000)
    created_at: datetime = Field(
        default_factory=now,
        validation_alias="createdAt",
    )


class NewsletterIn(BaseModel):
    email: EmailStr


@asynccontextmanager
async def lifespan(_: FastAPI):
    Base.metadata.create_all(engine)
    yield


app = FastAPI(title="Portfolio API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip()
        for origin in os.getenv(
            "CORS_ORIGINS",
            "http://localhost:3000,https://mouhamadougaye.com",
        ).split(",")
        if origin.strip()
    ],
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "X-API-Key"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/contacts", status_code=201)
def create_contact(
    contact: ContactIn,
    _: bool = Depends(verify_api_key),
):
    with Session(engine) as db:
        db.merge(Contact(**contact.model_dump()))
        db.commit()

    return {"ok": True}


@app.post("/newsletter", status_code=201)
def subscribe(newsletter: NewsletterIn):
    with Session(engine) as db:
        db.execute(
            insert(Subscriber)
            .values(email=str(newsletter.email))
            .on_conflict_do_nothing()
        )
        db.commit()

    return {"ok": True}


@app.post("/posts/{slug}/view")
def add_view(slug: str):
    with Session(engine) as db:
        stmt = (
            insert(PostView)
            .values(slug=slug, views=1)
            .on_conflict_do_update(
                index_elements=["slug"],
                set_={"views": PostView.views + 1},
            )
            .returning(PostView.views)
        )
        views = db.execute(stmt).scalar_one()
        db.commit()

    return {"slug": slug, "views": views}


@app.get("/posts/{slug}/views")
def get_views(slug: str):
    with Session(engine) as db:
        row = db.execute(
            select(PostView).where(PostView.slug == slug)
        ).scalar_one_or_none()

    return {"slug": slug, "views": row.views if row else 0}
