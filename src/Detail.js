import * as React from 'react';
import styled from "styled-components";
import {useDispatch,useSelector} from "react-redux";
import { useNavigate, useParams } from 'react-router-dom';
import { postDelete } from './redux/modules/post';

import Avatar from '@mui/material/Avatar';

const Detail = () => {
    const post_list = useSelector(state=>state.post.list);
    const post_index = useParams().idx;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(post_list);

    const deletePost = () => { 
        dispatch(postDelete(post_list,post_index));
        navigate("/");
    }

    return (
        <>
        <Box>
            <div>
                {post_list[post_index]?.time}<br/>
            </div>
            <div>
                <Avatar alt="bboshi" src="./avatar.jpg" />
                {post_list[post_index]?.user_name}<br/>
            </div>
            <div>
                <button onClick={()=>{
                    navigate("/write/"+ post_index )
                }}>수정</button>
                <button onClick={deletePost}>삭제</button>
            </div>
        </Box>
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
    min-height: 30vh;
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
`;
const TextBox2 = styled.div`
    width: 100%;
    min-height: 30vh;
    display:flex;
    align-items: center;
    justify-content: center;
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

