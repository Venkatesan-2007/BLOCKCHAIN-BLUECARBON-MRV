"""
Blockchain Integration Module (Hyperledger Fabric Placeholder)
--------------------------------------------------------------
Right now this file uses an in-memory registry.
Later you can replace the `write_to_blockchain` and `get_registry`
functions with actual Hyperledger Fabric SDK calls.
"""

from datetime import datetime

# In-memory blockchain registry (acts like a ledger for now)
blockchain_registry = []

def write_to_blockchain(project_id: int, project_name: str, owner_id: int):
    """
    Store project verification details into the blockchain ledger.
    Later, replace this with Hyperledger Fabric transaction invocation.
    """
    record = {
        "project_id": project_id,
        "project_name": project_name,
        "owner_id": owner_id,
        "timestamp": datetime.utcnow().isoformat(),
        "status": "Verified"
    }
    blockchain_registry.append(record)
    return record

def get_registry():
    """
    Return all verified projects written to the blockchain ledger.
    """
    return {"registry": blockchain_registry}
