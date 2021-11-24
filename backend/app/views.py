from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from datetime import datetime
from hashlib import sha256
from binascii import hexlify

from bitcoin.signmessage import BitcoinMessage, VerifyMessage

SALT = 'bitcoin to the moon!'

@api_view(["POST"])
def bitcoin_message_verify(request):
    """
    Run's python-bitcoinlib to verify user message and signature from Trezor

    NOTE: request should include the following:
        address: specific base58-encoded pubkey hash 
        msg: the generated message the user signed
        sig: the resulting signature
    """
    address = request.data["address"]
    msg = BitcoinMessage(request.data["message"])
    sig = request.data["signature"]

    if VerifyMessage(address, msg, sig):
        return Response(status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["GET"])
def generate_challenge_message(request):
    """
    generate challenge message for user's trezor to sign
    """
    now = datetime.now().strftime('%D %T') + SALT
    _hash = hexlify(sha256(bytes(now, 'utf8')).digest()).decode()
    print(_hash)
    return Response(status=status.HTTP_200_OK, data={"message": _hash})
