from fastapi import APIRouter

from scripts.deals import get_deals_of_the_month

router = APIRouter()

@router.get("/deals")
def deals():
    deals = get_deals_of_the_month()
    return {"deals": deals}
