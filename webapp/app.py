import sysmon
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

# systemctl stop raspbyweb
# systemctl start raspbyweb

monitor = sysmon.Monitor()

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/info")
async def info():
    return monitor.info


@app.get('/favicon.ico')
def favicon():
    return FileResponse('./static/images/favicon.ico')
