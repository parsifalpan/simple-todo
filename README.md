# Simple Todo

A more advanced version of Simple Todo.

Built with React.js + Django.

Use Typescript.

If you are ambitious, you can learn simple auth system and Google OAuth from this project.

## Requirement

* python >= 3.7 (poetry >= 1.0)
* node.js >= 12.0
* yarn


## Development

You can try to launch and play with this project to get a rough idea of a Todo app, and how frontend communicate with the backend.


### Start the backend (django)

```bash
python3 -m venv ./venv       # create virtual environment
source ./venv/bin/activate   # activate virtual environment

cd server
pip3 install -r requirements.txt
python manage.py migrate
python manage.py runserver
```


### Start the frontend
```bash
cd frontend
yarn install
yarn start
```

## Start Playing

Access http://localhost:3000 in your browser.

It's normal to see errors about Google OAuth, and you cannot sign in with Google because the client ID is not valid.

You can start by register at http://localhost:3000/register and then experience this little app.
