from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from bitcoin.signmessage import BitcoinMessage, VerifyMessage

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
