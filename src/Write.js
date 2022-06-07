import React from "react";
import styled from "styled-components";


const Write = () => {
    return (
        <div>
            <Box>게시글 작성</Box>
            <Box>레이아웃 고르기</Box>
            <Box>
                게시물 내용<br/>
                <input style={{width:"80vw",height:"200px"}} type="text" />
            </Box>
            <Box>
                <button>게시글작성</button>
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