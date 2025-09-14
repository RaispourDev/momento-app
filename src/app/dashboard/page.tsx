"use client"

import { Fragment, useState } from "react";

const mockImage = [
    {
        id: 1,
        title: "photo1",
    },
     {
        id: 2,
        title: "photo2",
    },
     {
        id: 3,
        title: "photo3",
    },
];


function Dashboard() {
    const[image, setImage] = useState(mockImage);
    
    const handleDelete = (imageId: number) =>{
        if(confirm("delete?")){
            setImage(image.filter(img => img.id !== imageId))
        }
    }

    const downloadImage = (image: any)=>{
        console.log("file is on download:", image.title)
        alert(`downloading ${image.title}`)
    }
  return (
    <Fragment>
        <header  className="max-w-screen max-h-2/12 text-6xl p-4 flex items-center justify-center">
        <div>MomentO</div>
        </header>
    <div className="bg-amber-800 overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 p-8">
        {image.map((image)=>(
            <div key={image.id} className="bg-white">
                <h3 className="bg-red-500 m-4">{image.title}</h3>
                <button className="bg-green-600 text-yellow-600" onClick={()=>handleDelete(image.id)}>delete</button>
                <button className="bg-red-600 text-yellow-600" onClick={()=>downloadImage(image.id)}>download</button>
            </div>
        ))}
    </div>
    </Fragment>
  )
}

export default Dashboard