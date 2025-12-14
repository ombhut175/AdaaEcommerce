from fastapi import APIRouter

from scripts.recommendation import recommend_products

router = APIRouter()

@router.get("/recommend/{user_id}")
def recommend(user_id: str):
    recommendations = recommend_products(user_id)
    return {"recommendations": recommendations}

