import * as React from 'react';
import styled from "styled-components";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { deletePostFB, postDelete } from './redux/modules/post';
import {auth} from "./shared/firebase";
import "./App.css"


import Avatar from '@mui/material/Avatar';

const Detail = () => {
    const post_list = useSelector(state=>state.post.list);
    const post_index = useParams().idx;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(post_list[post_index]);
    console.log(post_list[post_index].id);
    const post_id = post_list[post_index].id

    const deletePost = () => { 
        dispatch(deletePostFB(post_list,post_id));
        navigate("/");
    }

    return (
        <>
        <Box>
            <NameBox>
                <Avatar alt="bboshi" src="./avatar.jpg" />
                {post_list[post_index]?.user_name}<br/>
            </NameBox>
            <div>
                {post_list[post_index]?.time}<br/>
            </div>
        </Box>
            {post_list[post_index].user_email === auth.currentUser?.email?
                <ButtonBox>
                    <Button className="custom-btn btn-5" onClick={() => {
                        navigate("/write/"+ post_index )
                    }}>수정</Button>
                    <Button className="custom-btn btn-5" onClick={deletePost}>삭제</Button>
                </ButtonBox>
            : null}
        
        {(post_list[post_index].layout_text === 'left') ? 
        <Container>
            <TextBox>
                <Text>{post_list[post_index]?.text}</Text>
            </TextBox>
            <ImgBox>
                <Img src={post_list[post_index]?.img}/>           
            </ImgBox>
        </Container>
            : (post_list[post_index].layout_text === 'right') ?
        <Container>
            <ImgBox>
                    <Img src={post_list[post_index]?.img}/>
            </ImgBox>
            <TextBox>
                <Text>{post_list[post_index]?.text}</Text>
            </TextBox>
        </Container>
            :
        <Container2>
            <TextBox2>
                <Text>{post_list[post_index]?.text}</Text>
            </TextBox2>
            <ImgBox2>
                    <Img src={post_list[post_index]?.img}/>
            </ImgBox2>
        </Container2>
}


    </>
    )   
}

export default Detail;


const Box = styled.div`
    width: 100%;
    min-height: 10vh;
    display: flex;
    justify-content: space-between;
`;
const NameBox = styled.div`
    margin: 1vh 1vw;
`;
const Button = styled.button`
    margin:10px
`
const ButtonBox = styled.div`
    display: flex;
    justify-content: flex-end;
`;
const Container = styled.div`
    display:flex;
`;
const Container2 = styled.div`
    display:flex;
    flex-direction: column;
`;
const TextBox = styled.div`
    width: 50%;
    min-height: 30vh;
    display:flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
    
`;
const TextBox2 = styled.div`
    width: 100%;
    min-height: 30vh;
    display:flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #eee;
`;
const ImgBox = styled.div`
    width: 50%;
    min-height: 30vh;
    display:flex;
    align-items: center;
    justify-content: center;
`;
const ImgBox2 = styled.div`
    width: 100%;
    min-height: 30vh;
    display:flex;
    align-items: center;
    justify-content: center;
`;
const Img = styled.img`
    max-width: 100%;
    height: auto;
`;
const Text = styled.div`
    width: 80%;
    height: auto;
    word-break: break-all;
    display: flex;
    justify-content: center;
    align-items: center;
`;

