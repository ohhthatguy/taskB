
export type userDataType = {
    
    title: string,
    data: {id:number, task: string}[]
}

export type GlobalContextType = {
    userData: userDataType[],
    setUserData: React.Dispatch<React.SetStateAction<userDataType[]>>,
    makeNewColumn: Boolean,
    setMakeNewColumn: React.Dispatch<React.SetStateAction<Boolean>>
}