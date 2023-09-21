from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

app = FastAPI()

answer='TRAIN'

@app.get('/answer')
def get_answer():
    return answer

app.mount('/', StaticFiles(directory="static", html=True), name="static")

