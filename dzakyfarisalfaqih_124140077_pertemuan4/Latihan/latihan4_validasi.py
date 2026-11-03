def validasipassword(password):
    if len(password) >= 8 and any(char.isdigit() for char in password):
        return "Password valid"
    else:
        return "Password tidak valid"


password1 = "password123"
password2 = "pass"
password3 = "password"
password4 = "12345678"
password5 = "passwordbaruwoi1"

print(validasipassword(password1))
print(validasipassword(password2))
print(validasipassword(password3))
print(validasipassword(password4))
print(validasipassword(password5))