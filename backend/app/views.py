from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime
from hashlib import sha256
from binascii import hexlify
from bitcoin.signmessage import BitcoinMessage, VerifyMessage
from app.business_layer import generate_url

# mocked 
SALT = 'bitcoin to the moon!'

@api_view(["POST"])
def bitcoin_message_verify(request):
    """
    runs bitcoin signature verification to verify message and user signature

    :params:
        address: specific base58-encoded pubkey hash 
        msg: the challenge message the user signed
        sig: the user's signature from their Trezor keys
    
    NOTE: VerifyMessage only works for legacy accounts
    """

    # extract bitcoin-related fields from request
    address = request.data["address"]
    msg = BitcoinMessage(request.data["message"])
    sig = request.data["signature"]

    
    if VerifyMessage(address, msg, sig):
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def generate_challenge_message(request):
    """generate challenge message for user's trezor to sign"""

    # challenge message is sha256 of current timestamp plus mocked salt
    now = datetime.now().strftime('%D %T') + SALT
    _hash = hexlify(sha256(bytes(now, 'utf8')).digest()).decode()

    # create entry in GeneratedURL
    url = generate_url(_hash)

    return Response(status=status.HTTP_200_OK, data={"message": _hash, "url" : url.path})
