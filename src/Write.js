import * as React from 'react';
import styled from "styled-components";

import {auth,db,storage} from "./shared/firebase";
import {collection, addDoc, getDocs, where, query} from "firebase/firestore";
import {ref, uploadBytes,getDownloadURL} from "firebase/storage"

import {useDispatch, useSelector} from "react-redux";
import { createPost,createPostFB,postDelete, updatePost, updatePostFB } from "./redux/modules/post";
import {useNavigate, useParams} from "react-router-dom";




const Write = () => {
    const navigate = useNavigate();
    const write_idx = useParams().idx;
    const id_post_list = useSelector((state)=>state.post.list);
    console.log('id_post_list',id_post_list)
    // console.log(write_idx);

    const file_link_ref = React.useRef(null);
    let file_link = "";
    let layout_text = "";
    let user_name = ""
    const text_ref = React.useRef(null);
    const dispatch = useDispatch();
    const radio_ref = React.useRef(null);

    let today = new Date(); 
    let time = {
      year: today.getFullYear(),  
      month: today.getMonth() + 1, 
      date: today.getDate(), 
      hours: today.getHours(), 
      minutes: today.getMinutes(), 
    };
    let timestring = `${time.year}/${time.month}/${time.date} ${time.hours}:${time.minutes}`;

    console.log('로그인확인용',auth.currentUser); //user 아이디 가져올때 쓸것

   
    

    const uploadFB = async(e) => {
        // console.log(e.target.files);
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
        console.log('images_doc_id',images_doc.id);
    }

    const radioClicked = (e) => {
    //   console.log('event: ', e.target.id);
      layout_text = e.target.id
    }

    const addPost = async(e) => {
        const user_docs = await getDocs(
        query(collection(db,"users"),
        where("user_id" , "==" , auth.currentUser.email)
        )
        )
        // console.log(auth.currentUser.email); //user이메일가져올부분
        
        user_docs.forEach((u)=>{
            user_name = u.data().name

        })
        // console.log(user_name);//user name 가져올부분

        const user_data_obj = {
            user_email:auth.currentUser.email, 
            user_name:user_name ,
            text: text_ref.current?.value,
            img: file_link,
            time: timestring,
            layout_text: layout_text,
        }

        // console.log("user_data_obj: ",user_data_obj)
        
        dispatch(createPostFB(user_data_obj));   
        // navigate("/") ;
    }
    const editPost = () => {
        const user_update_data_obj = {
            user_email:auth.currentUser.email, 
            user_name:user_name ,
            text: text_ref.current?.value,
            img: file_link,
            time: timestring,
            layout_text: layout_text,
            idx: write_idx,
        }
        const post_id = id_post_list[write_idx].id
        
        dispatch(updatePostFB(user_update_data_obj,post_id));
        navigate("/");

    }
    
    return (
        <div>
            <Box>
                <Box>
                    <hr/>
                    레이아웃 고르기<br/>
                    <input type="text" value="사진을 선택해주세요"/>
                    <input type="file" onChange={uploadFB}/>
                    <div>
                        <input type="radio" id="left"
                        name="layout_text" value="1" 
                        ref = {radio_ref} onClick={radioClicked} />
                        <label for="1">오른쪽에 이미지 왼쪽에 텍스트</label>
                    </div>
                    <div>
                        <input type="radio" id="right"
                        name="layout_text" value="2"
                        ref = {radio_ref} onClick={radioClicked}/>
                        <label for="2">왼쪽에 이미지 오른쪽에 텍스트</label>
                    </div>
                    <div>
                        <input type="radio" id="up"
                        name="layout_text" value="3"
                        ref = {radio_ref} onClick={radioClicked}/>
                        <label for="3">상단에 텍스트 하단에 이미지</label>
                    </div>
                     
                </Box>
                <Box>
                    <hr></hr>
                    게시물 내용<br/>
                    <input ref={text_ref} style={{width:"80vw",height:"200px"}} type="text" />
                    <button onClick={addPost}>작성</button>
                    <button onClick={editPost}>수정</button>
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

