import random
import string

def password_gen(panjang=8):
    karakter = string.ascii_letters + string.digits + string.punctuation
    return "".join(random.choice(karakter) for _ in range(panjang))


