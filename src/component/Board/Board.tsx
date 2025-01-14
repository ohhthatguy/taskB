import {useState, useRef} from 'react'
import { userDataType } from '@/type/types'
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
// import { Button } from '@/components/ui/button'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const Board = ({input, setInput}: {input: userDataType[], setInput:React.Dispatch<React.SetStateAction<userDataType[]>>}) => {

    const [newTask, setNewTask] = useState(false)
    const [selectedTitle, setSelectedTitle] = useState({
        title: '',
        index: 0
    })
    const [taskValue, setTaskValue] = useState('');
    
   
   
    const showNewTaskDialoge = (index:number, title:string)=>{

        // titleTemp = title;
        setSelectedTitle({title: title, index: index })
        setNewTask(prev=> !prev)
   
    }
    // console.log(selectedTitle)

    const AddNewTask = ()=>{
        if(taskValue.length ==0){
            alert('give some task')
            return
        }
        
        
        const temp =input.find((e)=> e.title == selectedTitle.title)
        if(temp){
            temp.data.push({id: Math.floor(Math.random()*1000), task: taskValue})
        }
       

        setNewTask(false)

        



    }

    const removeColumn = (title:string)=>{
        const tempArr = [...input]

            const index = tempArr.findIndex((e)=> (e.title == title))
           
            tempArr.splice(index,1)

    
        setInput(tempArr)
    }


const handleDND = (res:any)=>{
    console.log(res)

    const {destination, source} = res;

    if(!destination) return;

    if(destination.droppableId === source.droppableId && destination.index === source.index) return;

    const tempArr = [...input]



    const sourceIndex= tempArr.findIndex((e)=> e.title === source.droppableId)
    const destinationIndex = tempArr.findIndex((e)=> e.title === destination.droppableId)
  

    const newSourceItems = [...tempArr[sourceIndex].data];
    const newDestItems = source.droppableId !== destination.droppableId ? [...tempArr[destinationIndex].data] : newSourceItems;

    const [deletedItem] = newSourceItems.splice(source.index,  1)
    console.log(deletedItem)
    newDestItems.splice(destination.index,0,deletedItem)

    tempArr[sourceIndex] = {...tempArr[sourceIndex], data:newSourceItems}
    tempArr[destinationIndex] = {...tempArr[destinationIndex], data:newDestItems}


    setInput(tempArr)

  

    

}

console.log(input)

  return (
    
    <div className='BoardClass border-2 border-green-800 w-full h-[41rem] flex bg-slate-600'>
        <DragDropContext onDragEnd={handleDND}>
        {
            input.map((e, indexTitle)=>(
                <Droppable droppableId={e.title} >
                    {(provided)=>(
                        
                        <div key={indexTitle} {...provided.droppableProps} ref={provided.innerRef} className='border-2 border-black w-96 h-[41rem] bg-orange-400'>

                        <div className='h-10 bg-blue-700 text-white text-2xl font-bold flex justify-around items-center'>

                            {e.title}

                            <div className='flex gap-4'>
                               
                                <Button onClick={()=> showNewTaskDialoge(indexTitle, e.title)}>+</Button>
                                <Button onClick={()=> removeColumn(e.title)}>X</Button>

                               

                            </div>

                        </div>

                        <div className='placeTaskHere p-2'>
                            {
                                e.data.length >0 ? e.data.map((ele, indexTask)=>(
                                    <Draggable draggableId={`${ele.id}q`} key={ele.id}  index={indexTask}>

                                      {(provided)=>(
                                          <div key={indexTask} ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}  className='border-2 text-xl bg-white shadow-xl rounded p-2 '>
                                            
                                          {ele.task}
                                      


                                      </div>
                                      )}

                                    </Draggable>)) :
                                    <div>
                                        enter data
                                     </div>
                            }
                            
                        </div>


                    </div>
                    )}
                </Droppable>
            ))
        }
        </DragDropContext>

    <Dialog open={newTask} onOpenChange={()=>setNewTask(prev=> !prev)}>
            {/* <DialogTrigger>make new column</DialogTrigger> */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>`Create A New task For {selectedTitle.title} column!`</DialogTitle>
                <DialogDescription>

                    <div className="grid gap-4 py-4 border-2  border-red-700">

                        <div className="grid grid-cols-4 items-center gap-4">

                            <Input value={taskValue} onChange={(e)=> setTaskValue(e.target.value)} placeholder='enter a task'  className="col-span-3" />

                        </div>
                   
                    </div>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>

                <Button type="submit" onClick={()=>setNewTask(false)} >Cancel</Button>
                <Button type="submit" onClick={AddNewTask}>Add</Button>

            </DialogFooter>

            </DialogContent>
        </Dialog>

    </div>
    
  )
}

export default Board