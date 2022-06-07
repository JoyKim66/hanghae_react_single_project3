import React from "react";
import styled from "styled-components";

import {auth,db,storage} from "./shared/firebase";
import {collection, addDoc, getDocs, where, query} from "firebase/firestore";
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"



const Write = () => {

    const file_link_ref = React.useRef(null);
    const text_ref = React.useRef(null);
    const uploadFB = async(e) => {
        console.log(e.target.files);
        const uploaded_file = await uploadBytes(
            ref(storage,`images/${e.target.files[0].name}`),
            e.target.files[0]
        );
        console.log('uploaed_file: ',uploaded_file);

        const file_url = await getDownloadURL(uploaded_file.ref);
        console.log('file_url: ',file_url);
        file_link_ref.current = {url: file_url};
        console.log(file_link_ref)
        
        const images_doc = await addDoc(collection(db,"images"),
        {
            image_url: file_link_ref.current?.url,
        }
        );
        console.log(images_doc.id);
    }

    const addPost = () => {

        console.log(text_ref.current.value)
    }


    return (
        <div>
            <Box>게시글 작성</Box>
            <Box>레이아웃 고르기
                <input type="file" onChange={uploadFB}/>
            </Box>
            <Box>
                게시물 내용<br/>
                <input ref={text_ref} style={{width:"80vw",height:"200px"}} type="text" />
            </Box>
            <Box>
                <button onClick={addPost}>게시글작성</button>
            </Box>
        </div>
        
    )
}

 const post = () =>{

 }

export default Write;

const Box = styled.div`
    width: 100%;
    min-height: 30vh;
    background: #eee;
`;