suhu_celcius = float(input("Masukkan suhu dalam Celcius: "))
suhu_fahrenheit = (9/5) * suhu_celcius + 32
suhu_kelvin = suhu_celcius + 273.15

print(
    f"Suhu dalam Celcius: {suhu_celcius:.2f}°C\n"
    f"Suhu dalam Fahrenheit: {suhu_fahrenheit:.2f}°F\n"
    f"Suhu dalam Kelvin: {suhu_kelvin:.2f}K"
)