  //bhaskar thakulla
    //thakullabhasakr456@gmail.com


import {useContext, useRef} from 'react'
import {GlobalContext} from "../context/context"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Button } from '@/components/ui/button'

  import Board from './Board/Board'

const Home = () => {
    const userData = useContext(GlobalContext)
  

    const columnRef = useRef<HTMLInputElement>(null);
  

  
    console.log(userData?.userData)


    const AddNewColumn = ()=>{

        if(columnRef.current && columnRef.current?.value.length ==0){
            alert('give a title')
            return
        }

        if(columnRef.current){

            const checkSameName = userData?.userData.some((ele)=> ele.title == (columnRef?.current?.value) )
            
            if(checkSameName == true){

                alert('multiple column has same name. Please use other names')
                columnRef.current.value= ''

                return 
            }


            
            const temp = { title: columnRef.current?.value, data: []}

            userData?.setUserData(prev => [...prev, temp])
        }

        userData?.setMakeNewColumn(false);
    }

  

  return (
    <div className=' w-full h-screen'>

        
        <Dialog open={userData ? userData.makeNewColumn : undefined} onOpenChange={()=>userData?.setMakeNewColumn(!userData.makeNewColumn)}>
            <DialogTrigger >
                
                    <Button variant="outline" className='bg-slate-200'>make new column</Button></DialogTrigger>
              
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create A New Column!</DialogTitle>
                <DialogDescription>

                    <div className="grid gap-4 py-4 ">

                        <div className="grid grid-cols-4 items-center gap-4">
                        
                            <Input ref={columnRef} placeholder='enter column name' className="col-span-3" />

                        </div>

                   
                    </div>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>

                <Button type="submit" onClick={()=>{userData?.setMakeNewColumn(false)}}>Close</Button>
                <Button type="submit" onClick={AddNewColumn}>Save</Button>

            </DialogFooter>

            </DialogContent>
        </Dialog>
          
        
       {(userData?.userData && userData.userData.length >0)  ? <Board input={userData?.userData}  setInput={userData.setUserData}/> : <div/>}

        
    </div>
  )
}

export default Home