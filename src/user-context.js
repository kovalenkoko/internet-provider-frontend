import React from "react"

export const UserContext = React.createContext({
    data: null,
    toggleData: (data) => {this.data = data},
});
