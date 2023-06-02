import React, { useState, useEffect } from "react";
import { Box } from '@mui/material'
import ProjectDescription from './showProjectDescription'
import { mockDataProjects } from "../../../data/mockProject";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../components/firebaseConfig";

const ShowDescription = () => {

    const { id } = useParams();
    const [projectDescription, setProjectDescription] = useState(null)

    useEffect(() => {
        const getProjectById = async () => {
            console.log("project curid = " + id)
            const projectRef = doc(db, 'projects', id)
            const projectSnap = await getDoc(projectRef)

            if (projectSnap.exists()) {
                setProjectDescription(projectSnap.data())
                console.log("author id " + projectDescription.authorId)
            }
            else console.log("Project not found")
        }
        return () => {
            getProjectById()
        }
    }, [])
    
    return (
        <>
        {ProjectDescription && console.log("author id " + projectDescription.authorId) (
            <ProjectDescription projectInfo={projectDescription} otherUserProjects={mockDataProjects} />
        )}
        </>
    )
}

export default ShowDescription