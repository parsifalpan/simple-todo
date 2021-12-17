# Simple Todo

A simple Todo project.

Built with React.js + Django(3.0).

Use Typescript.

## Goal

This little toy project is for beginners at JOJ to get familiar with our tech stack, and gain some basic knowledge about web development. 

Your main goal is to write a version of your own Todo app with [React.js](https://reactjs.org/) and [FastAPI](https://fastapi.tiangolo.com/).

### Frontend

* React.js
* [Ant Design](https://ant.design/index-cn)
  * Optional. You can also choose Bootstrap.css/Material UI/Bulma/Semantic UI.
  * Used in JOJ2.0
* [Mobx](https://mobx.js.org/README.html) and [Mobx React](https://github.com/mobxjs/mobx-react)
  * Optinal. A state management library. Not so handy for a small project.
  * Not used in JOJ2.0
* [React Router](https://reactrouter.com/)
  * Optional. Allow you to route inside an SPA (Single Page Application).
  * Not used in JOJ2.0
* [Umi.js](https://umijs.org/zh-CN)
  * A framework to build frontend quickly. If you are familiar with React.js, you can try this.
  * Used in JOJ2.0

For more detailed knowledge and learning path, please refer to our [docs](https://joint-online-judge.github.io/cattle/).

### Backend

* FastAPI

## Requirement

* python >= 3.6
* node.js >= 12.0

## Development

### Start the backend

```bash
python3 -m venv ./venv  # create virtual environment
source ./venv/bin/activate  # activate virtual environment

cd server
pip3 install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Start the frontend
```bash
cd frontend
npm install
npm start
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

