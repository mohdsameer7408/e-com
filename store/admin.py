from django.contrib import admin
from .models import *


class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'email')


class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'digital')


class ShippingAddressAdmin(admin.ModelAdmin):
    list_display = ('customer', 'address', 'city', 'zip_code')


admin.site.register(Customer, CustomerAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress, ShippingAddressAdmin)
