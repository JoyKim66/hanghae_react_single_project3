import React  from "react";

import styled from "styled-components";
import writebtn from "./writebtn.png"
import {Post} from "./Write";

const Main = () => {

    return (
        <div>
            <div>메인페이지</div>
              <Post />
            <AddButton>
                <Img src={writebtn} />    
            </AddButton>

        </div>
        
    )
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
  top: 75%;
`;
