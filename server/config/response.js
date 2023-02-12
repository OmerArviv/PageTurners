const response = {
    "status": {
        "200": "OK !",
        "500": "Something has happened"
    },
    "auth": {
        "loginError": "User not found.",
        "authFailed": "Authentication failed.",
        "invalidToken": "Invalid token",
        "invalidRole": "Invalid role"
    },
    "user": {
        "queryError": "Error pulling users.",
        "creationError": "Failed to create new user.",
        "deleteError": "Error deleting user."
    },
    "order": {
        "queryError": "Error pulling orders.",
        "creationError": "Failed to create new order.",
        "deleteError": "Error deleting order."
    },
    "book": {
        "queryError": "Error pulling books.",
        "creationError": "Failed to create new book.",
        "deleteError": "Error deleting book."
    }
}

module.exports = response