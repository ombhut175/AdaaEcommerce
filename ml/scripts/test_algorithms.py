import sys
import os


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from scripts.recommendation import recommend_products
from scripts.trending import get_trending_products
from scripts.deals import get_deals_of_the_month



# Test Recommendations
def test_recommendation(user_id):
    print(f"Testing Recommendations for User ID: {user_id}")
    recommendations = recommend_products(user_id)
    print("Recommended Products:", recommendations)

# Test Trending Products
def test_trending():
    print("Testing Trending Products")
    trending = get_trending_products()
    print("Trending Products:", trending)

# Test Deals of the Month
def test_deals():
    print("Testing Deals of the Month")
    deals = get_deals_of_the_month()
    print("Deals of the Month:", deals)

if __name__ == "__main__":
    user_id = "6782acdb04fd7d79e0000c3d"  # Replace with an actual user ID from your database
    test_recommendation(user_id)
    test_trending()
    test_deals()
