suhuCelcius = float(input("Masukkan suhu dalam Celcius: "))
suhuFahrenheit = (9/5) * suhuCelcius + 32
suhuKelvin = suhuCelcius + 273.15

print(
    f"Suhu dalam Celcius: {suhuCelcius:.2f}°C\n"
    f"Suhu dalam Fahrenheit: {suhuFahrenheit:.2f}°F\n"
    f"Suhu dalam Kelvin: {suhuKelvin:.2f}K"
)