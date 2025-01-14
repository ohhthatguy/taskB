import { createContext, useState, ReactNode} from "react"
import { userDataType,GlobalContextType } from "../type/types";

export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({children}:{children:ReactNode})=>{

    // const userDataTemplate = [{
    //     id: '',
    //     title: '',
    //     data: []
    // }]

    const [userData, setUserData] = useState<userDataType[]>([])
    const [makeNewColumn, setMakeNewColumn] = useState<boolean>(true);


    return (<GlobalContext.Provider value={{userData, setUserData, makeNewColumn,setMakeNewColumn}}>

        {children}

    </GlobalContext.Provider>)


}
