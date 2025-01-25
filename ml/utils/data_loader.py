from utils.db import get_db

def get_user_activity(user_id):
    db = get_db()
    user_activity = db.useractivities.find_one({"userId": user_id})
    return user_activity


def get_all_products():
    db = get_db()
    products = list(db.products.find({}))  # Assuming 'Products' is your collection name
    return products
