from fastapi import APIRouter

from scripts.trending import get_trending_products

router = APIRouter()

@router.get("/trending")
def trending():
    trending_products = get_trending_products()
    return {"trending": trending_products}
