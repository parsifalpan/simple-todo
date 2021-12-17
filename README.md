# Simple Todo

A simple Todo project.

Built with React.js + Django(3.0).

Use Typescript.

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

## 实现的功能

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

