from verify import verify_user_signature
import pickle as p

with open("generated_qr.p", "rb") as fi:
    request = p.load(fi)

print(verify_user_signature(request))
