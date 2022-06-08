import * as React from 'react';
import styled from "styled-components";

import {auth,db,storage} from "./shared/firebase";
import {collection, addDoc, getDocs, where, query} from "firebase/firestore";
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

import {useDispatch} from "react-redux";
import { createPost } from "./redux/modules/post";
import {useNavigate} from "react-router-dom";




const Write = () => {
    const navigate = useNavigate();

    const file_link_ref = React.useRef(null);
    let file_link = "";
    const text_ref = React.useRef(null);
    const dispatch = useDispatch();

    let today = new Date(); 
    let time = {
      year: today.getFullYear(),  
      month: today.getMonth() + 1, 
      date: today.getDate(), 
      hours: today.getHours(), 
      minutes: today.getMinutes(), 
    };
    let timestring = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;

    console.log(auth.currentUser); //user 아이디 가져올때 쓸것

    const uploadFB = async(e) => {
        console.log(e.target.files);
        const uploaded_file = await uploadBytes(
            ref(storage,`images/${e.target.files[0].name}`),
            e.target.files[0]
        );
        console.log('uploaed_file: ',uploaded_file);

        const file_url = await getDownloadURL(uploaded_file.ref);
        console.log('file_url: ',file_url);
        file_link = file_url; //file_url 전역으로 만들기

        
        const images_doc = await addDoc(collection(db,"images"),
        {
            image_url: file_link_ref.current?.url,
        }
        );
        console.log(images_doc.id);
    }

    const addPost = async(e) => {
        const user_docs = await getDocs(
        query(collection(db,"users"),
        where("user_id" , "==" , auth.currentUser.email)
        )
    )
    console.log(auth.currentUser.email); //user이메일가져올부분
    let user_name = ""
    user_docs.forEach((u)=>{
        user_name = u.data().name

    })
    console.log(user_name);//user name 가져올부분

    const user_data_obj = {
        user_email:auth.currentUser.email, 
        user_name:user_name ,
        text: text_ref.current?.value,
        img: file_link,
        time: timestring,
    }
    console.log("user_data_obj: ",user_data_obj)
    

    dispatch(createPost(user_data_obj));   
    navigate("/") 
}

    return (
        <div>
            <Box>
                게시글 작성
                <Box>
                    <hr></hr>
                    레이아웃 고르기<br/>
                    <input type="text" value="사진을 선택해주세요"/>
                    
                    <input type="file" onChange={uploadFB}/>
                </Box>
                <Box>
                    <hr></hr>
                    게시물 내용<br/>
                    <input ref={text_ref} style={{width:"80vw",height:"200px"}} type="text" />
                    <button onClick={addPost}>게시글작성</button>
                </Box>
            </Box>

        </div>

    )
}

export default Write;

const Box = styled.div`
    width: 100%;
    min-height: 30vh;
    background: #eee;
`;

