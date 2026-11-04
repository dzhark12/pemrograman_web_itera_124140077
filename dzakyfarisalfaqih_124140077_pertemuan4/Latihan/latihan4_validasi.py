def validasi_password(password):
    if len(password) >= 8 and any(char.isdigit() for char in password):
        return "Password valid"
    else:
        return "Password tidak valid"


password1 = "password123"
password2 = "pass"
password3 = "password"
password4 = "12345678"
password5 = "passwordbaruwoi1"

print(validasi_password(password1))
print(validasi_password(password2))
print(validasi_password(password3))
print(validasi_password(password4))
print(validasi_password(password5))