import { Section } from "@prisma/client";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";

interface SectionListProps {
  items: Section[];
  onReorder :(updateData:{id:string; position:number}[])=>void;
  onEdit:(id:string)=>void;

}
const SectionList = ({ items,onReorder,onEdit }: SectionListProps) => {

    const [isMounted,setIsMounted]=useState(false)
    const [sections,setSections]=useState(items)

    useEffect(()=>{
        setIsMounted(true)
    },[])

    useEffect(()=>{
        setSections(items)
    },[items])

    const onDragEnd=(result:DropResult)=>{
        if(!result.destination) return;

        const items =Array.from(sections);
        const [reorderedItem]=items.splice(result.source.index,1);
        items.splice(result.destination.index, 0, reorderedItem);
        
        const startIndex=Math.min(result.source.index, result.destination.index)
        const endIndex=Math.max(result.source.index,result.destination.index)

        const updatedSections =items.splice(startIndex, endIndex + 1)

        setSections(items)

        const bulkUpdateData =updatedSections.map((section,index)=>({
            id:section.id,
            position:items.findIndex((item)=>item.id===section.id),
        }))

        onReorder(bulkUpdateData)
    }

    if(!isMounted) return null;

  return (
        <DragDropContext  onDragEnd={onDragEnd}>
            <Droppable droppableId="sections">
                {(provided)=>(
                  <div {...provided.droppableProps} className={`${sections.length > 0 ? "my-10": "mt-7"} flex flex-col gap-5`}>
                      {sections.map((section,index)=>{
                        <Draggable key={section.id} draggableId={section.id} index={index}>
                          
                        </Draggable>
                      })}
                  </div>
                )}
            </Droppable>
        </DragDropContext>
  );
};

export default SectionList;
