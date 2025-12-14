from fastapi import FastAPI
from routes.recommendation import router as recommend_router
from routes.trending import router as trending_router
from routes.deals import router as deals_router

app = FastAPI()

app.include_router(recommend_router, prefix="/api")
app.include_router(trending_router, prefix="/api")
app.include_router(deals_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
