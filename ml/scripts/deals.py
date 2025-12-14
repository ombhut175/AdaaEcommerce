from utils.data_loader import get_all_products


def get_deals_of_the_month():
    all_products = get_all_products()
    deals = sorted(all_products, key=lambda p: p.get("discountPercent", 0), reverse=True)
    return deals[:10]  # Top 10 deals based on discount