# Simple Todo

A simple Todo project.

Built with React.js + FastAPI.

Use Typescript.

## Goal

This little toy project is for beginners at JOJ to get familiar with our tech stack, and gain some basic knowledge about web development.

Your main goal is to write a version of your own Todo app with [React.js](https://reactjs.org/) and [FastAPI](https://fastapi.tiangolo.com/).

These are some suggested libraries. You can find basic feature list of a Todo app at the end of this doc. You are also encouraged to add your own fearures (Juan).

### Frontend

* React.js
* [React Router](https://reactrouter.com/)
  * Required. Allow you to route inside an SPA (Single Page Application).
  * Used in JOJ2.0.
  * But not in this toy example. You shall try to split the app into pages and use react-router.
* [Ant Design](https://ant.design/index-cn)
  * Optional. You can also choose Bootstrap.css/Material UI/Bulma/Semantic UI.
  * Used in JOJ2.0
* [Mobx](https://mobx.js.org/README.html) and [Mobx React](https://github.com/mobxjs/mobx-react)
  * Optional. A state management library. Not so handy for a small project.
  * Not used in JOJ2.0
* [Umi.js](https://umijs.org/zh-CN)
  * A framework to build frontend quickly. If you are familiar with React.js, you can try this.
  * Used in JOJ2.0

For more detailed knowledge and learning path, please refer to our [docs](https://joint-online-judge.github.io/cattle/).

### Backend

* [Poetry](https://python-poetry.org/)
  * A python package and dependency manager (better and easier then `pip`) .
  * Used in JOJ2.0
* [FastAPI](https://fastapi.tiangolo.com/)
  * High performance, easy to learn, fast to code, ready for production.
  * Used in JOJ2.0
* [SQLModel](https://sqlmodel.tiangolo.com/)
  * SQLModel is based on [Pydantic](https://pydantic-docs.helpmanual.io/) and [SQLAlchemy](https://www.sqlalchemy.org/).
  * Pydantic: Data validation and settings management using python type annotations.
  * SQLAlchemy: Python Object Relational Mapper (ORM).
  * In the todo app, we use SQLite for simplicity (no need to install extra service).
  * Used in JOJ2.0 (PostgreSQL instead of SQLite)
* [Docker](https://docs.docker.com/get-started/overview/)
  * Optional. Used for deployment.

For more detailed knowledge and learning path, please refer to our [docs](https://joint-online-judge.github.io/horse/).


## Requirement

* python >= 3.7 (poetry >= 1.0)
* node.js >= 12.0

### Python Installation

https://realpython.com/installing-python/#how-to-install-on-ubuntu-and-linux-mint

### Poetry Installation

#### Linux / macOS

```powershell
curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python -
```

If the terminal cannot find `poetry`, please close the terminal window and try again, or source your terminal profile.

You may also check your environment variable, and add the following statement in your terminal profile:

```bash
export PATH="$HOME/.poetry/bin:$PATH"
```

#### Windows Powershell

```powershell
(Invoke-WebRequest -Uri https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py -UseBasicParsing).Content | python -
```

### Node.js Installation

#### Linux / macOS

You can use package managers to install node.js, but we recommend to use [nvm](https://nodejs.org/en/download/) for easier version management.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

Add the following lines to `.bashrc`, `.zshrc` according to the shell you use:
```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Then use `source` to reload your shell, or restart your shell, and enter
```bash
nvm install lts
```

#### Windows

You can download the installers on https://nodejs.org/en/download/. You can also try package managers such as [chocolatey](https://chocolatey.org/). `nvm` is not supported on Windows.



## Development

You can try to launch and play with this project to get a rough idea of a Todo app, and how frontend communicate with the backend.


### Start the backend

```bash
cd backend
poetry install               # a virtual environment will be created automatically
poetry run python -m todo serve --debug # run __main__.py in the module "todo" in debug mode (enable auto reloading), using the poetry environment
# Or you can run `poetry shell && python -m todo serve --debug`, which may run cmd in windows
```

### Test the backend

```bash
cd backend
poetry run pytest
```


### Start the frontend
```bash
cd frontend
yarn install
yarn start
```

## 已经实现的功能

### 增加一个待办事项

在顶部输入待办事项后按下回车或点击按钮，快速创建事项。

### 删除一个待办事项

所有事项（未完成，已完成，过期）均可删除（未完成任务在菜单中删除）

### 标记一个待办事项为已完成

标记为已完成后会归入已完成

### 编辑一个待办事项的具体内容

设置标题、内容、优先级、到期时间。

### 列出所有待办事项

查看不同状态的待办事项：未完成、已完成、过期。

### *待办事项设置优先级

内置4级优先级，不同优先级有不同颜色代表。菜单中可快捷提高/降低优先级。

### *待办事项按照优先级、日期排序

待办事项可以根据优先级、日期排序。


### *其他

* 待办事项可以设置优先级
* 待办事项可以设置 expire date (前后端均有校验)
* 支持按照不同的方式排序，如优先级，expire date
* API 带有测试用例
* 前端使用 TypeScript
