from bitcoin.signmessage import BitcoinMessage, VerifyMessage

def verify_user_signature(request):
    """
    Run's python-bitcoinlib to verify user message and signature from Trezor

    NOTE: request should include the following:
        address: specific base58-encoded pubkey hash 
        msg: the generated message the user signed
        sig: the resulting signature
    """
    address = request["address"]
    msg = BitcoinMessage(request["message"])
    sig = request["signature"]

    return VerifyMessage(address, msg, sig)
    