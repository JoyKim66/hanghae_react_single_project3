import * as React from 'react';
import styled from "styled-components";
import {useDispatch,useSelector} from "react-redux";
import { useParams } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const Detail = () => {
    const post_list = useSelector(state=>state.post.list);
    const post_index = useParams().idx;
    console.log(post_list);

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
                <button>수정</button>
                <button>삭제</button>
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

