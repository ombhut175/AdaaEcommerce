from utils.data_loader import get_all_products


def get_trending_products():
    # Assuming get_all_products() returns a list of product dictionaries
    all_products = get_all_products()  # Fetch the products

    # Check if reviews are in correct format
    for product in all_products:
        if isinstance(product.get('reviews'), list):
            # Safely handle reviews if it's a list
            total_sales = sum(r.get('sales', 0) for r in product['reviews'])
        else:
            # If reviews is not a list, set sales to 0
            total_sales = 0
        product['total_sales'] = total_sales  # Add sales to the product

    # Sort by total_sales in descending order
    trending = sorted(all_products, key=lambda p: p.get('total_sales', 0), reverse=True)

    return trending

