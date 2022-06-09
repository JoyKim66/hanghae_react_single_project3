import * as React from 'react';
import './App.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

import { auth } from './shared/firebase';


import styled from "styled-components";
import writebtn from "./writebtn.png"
import { loadPostFB } from './redux/modules/post';

const Main = () => {
    const navigate = useNavigate();
    const post_list = useSelector((state) => state.post.list)
    console.log(post_list);
    const dispatch = useDispatch();

    React.useEffect(()=> {
      dispatch(loadPostFB());
    },[]);
     
     return (
        <Container sx={{ width: 1000, height: 1000 }}>
          {post_list.map((item,idx) => (
            <ImageListItem key={idx} onClick={()=>{
                navigate("/detail/" + idx)
            }}>
              <img
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.text}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.text}
                subtitle={<span>by: {item.user_name}</span>}
                position="below"
              />
            </ImageListItem>
          ))}
          {auth.currentUser?
          <AddButton>
            <Img src={writebtn} onClick={()=>{
                navigate("/write")
            }}/>    
          </AddButton>
          :null}
        </Container>

        
      );
 }


export default Main;


const AddButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const Img = styled.img`
  max-width: 60px;
  min-height: 60px;
  position: fixed;
  top: 85%;
  left: 90%;
`;
const Container = styled(ImageList)`
  width: 80%;
  height: auto;
  margin:auto;
  overflow-y: visible !important;
  }
`;