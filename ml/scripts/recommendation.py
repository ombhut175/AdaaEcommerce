import random

from utils.data_loader import get_user_activity, get_all_products


def recommend_products(user_id):
    user_data = get_user_activity(user_id)
    all_products = get_all_products()

    if not user_data:  # No user activity, return random products
        return random.sample(all_products, min(10, len(all_products)))

    viewed_products = {p["productId"] for p in user_data.get("viewedProducts", [])}
    searched_products = {p["productId"] for p in user_data.get("searchedProducts", [])}
    purchased_products = set(user_data.get("purchasedProducts", []))

    # Prioritize products the user searched, viewed, and similar products
    recommended = [p for p in all_products if p["_id"] in (searched_products | viewed_products | purchased_products)]

    # Fill with random products if needed
    while len(recommended) < 10:
        random_product = random.choice(all_products)
        if random_product["_id"] not in recommended:
            recommended.append(random_product)

    return recommended[:10]
